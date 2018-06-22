package com.pep.luckycoin.service.impl;

import com.pep.luckycoin.domain.Credit;
import com.pep.luckycoin.domain.Transaction;
import com.pep.luckycoin.repository.TransactionRepository;
import com.pep.luckycoin.service.AnnouncementService;
import com.pep.luckycoin.domain.Announcement;
import com.pep.luckycoin.repository.AnnouncementRepository;
import com.pep.luckycoin.repository.search.AnnouncementSearchRepository;
import com.pep.luckycoin.service.CreditService;
import com.pep.luckycoin.service.TransactionService;
import com.pep.luckycoin.service.util.RandomUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static com.pep.luckycoin.domain.enumeration.Status.CLOSED;
import static com.pep.luckycoin.domain.enumeration.Status.FINISED;
import static com.pep.luckycoin.domain.enumeration.Status.OPEN;
import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Announcement.
 */
@Service
@Transactional
public class AnnouncementServiceImpl implements AnnouncementService {

    private final Logger log = LoggerFactory.getLogger(AnnouncementServiceImpl.class);

    private final AnnouncementRepository announcementRepository;

    private final AnnouncementSearchRepository announcementSearchRepository;

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private CreditService creditService;

    public AnnouncementServiceImpl(AnnouncementRepository announcementRepository, AnnouncementSearchRepository announcementSearchRepository) {
        this.announcementRepository = announcementRepository;
        this.announcementSearchRepository = announcementSearchRepository;
    }

    /**
     * Save a announcement.
     *
     * @param announcement the entity to save
     * @return the persisted entity
     */
    @Override
    public Announcement save(Announcement announcement) {
        log.debug("Request to save Announcement : {}", announcement);
        Announcement result = announcementRepository.save(announcement);
        announcementSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the announcements.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Announcement> findAll(Pageable pageable) {
        log.debug("Request to get all Announcements");
        return announcementRepository.findAll(pageable);
    }

    /**
     * Get one announcement by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Announcement findOne(Long id) {
        log.debug("Request to get Announcement : {}", id);
        return announcementRepository.findOne(id);
    }

    /**
     * Delete the announcement by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Announcement : {}", id);
        announcementRepository.delete(id);
        announcementSearchRepository.delete(id);
    }

    /**
     * Search for the announcement corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Announcement> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Announcements for query {}", query);
        Page<Announcement> result = announcementSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }

    /**
     *  Find all announcements that expire today and change status for everyone
     *  - to COSED if min price is no reached
     *  - or to FINISED is min price is reached
     *
     */
    @Override
    public void resolveExpiredAnnouncements() {
        List<Announcement> announcementsToBeRTesolved = announcementRepository.findByFinishDate(LocalDate.now());
        for(Announcement singleAnnouncement: announcementsToBeRTesolved) {
            // if min price is not reached return money and set status to CLOSED
            if(singleAnnouncement.getTicketsSold()*singleAnnouncement.getTicketValue() < singleAnnouncement.getMinimPrice()) {
                returnCreditForAnnouncement(singleAnnouncement);
            } else {
                // if min price is reached choose a random winner and set status to FINISHED
                setWinnerForAnnouncement(singleAnnouncement);
            }
        }

    }

    /**
     * Return the credit for all tickets from an announcement given as param to buyers
     * Set status to CLOSED for announcement
     *
     * @param announcement to return credit for
     */
    @Override
    public void returnCreditForAnnouncement(Announcement announcement) {
        List<Transaction> transactionsTicketsList = transactionService.findByAnnouncement(announcement);
        for(Transaction transactionTicket: transactionsTicketsList) {
            // if transaction is not processed
            if(!transactionTicket.isCompleted()) {
                Credit userCreditToReturn = creditService.findByUserLogin(transactionTicket.getUser().getLogin());
                // return credit to it's buyer
                userCreditToReturn.setCreditValue(userCreditToReturn.getCreditValue() + announcement.getTicketValue());
                creditService.save(userCreditToReturn);
                //mark transaction as completed
                transactionTicket.setCompleted(true);
                transactionService.save(transactionTicket);
            }
        }
        announcement.setStatus(CLOSED);
    }

    /**
     * Set a random winner for announcement given as param
     * Set status to Finished for announcement
     *
     * @param announcement to set winner to
     */
    @Override
    public void setWinnerForAnnouncement(Announcement announcement) {
        List<Transaction> transactionsTicketsList = transactionService.findByAnnouncement(announcement);
        announcement.setWinner(transactionsTicketsList.get(RandomUtil.generateRandomWinner(transactionsTicketsList.size())).getUser());
        announcement.setStatus(FINISED);
        save(announcement);
    }

    /**
     * Every day at 15:00 check expired Announcements
     * This is scheduled to get fired everyday, at 03:00 (pm).
     * Using cron expression
     */
    @Override
    @Scheduled(cron = "0 0 15 * * ?")
    public void scheduleEverydayCheckForExpiredAnnouncements() {

        long now = System.currentTimeMillis() / 1000;
        System.out.println(
            "schedule tasks using cron jobs - " + now);
        log.info("Cron Task :: Execution Time - {}", LocalDateTime.now());
        resolveExpiredAnnouncements();
    }

    //TODO from FINISHED to CLOSED before returnCredit() or to COMPLETED and payOwnerForProduct();
}
