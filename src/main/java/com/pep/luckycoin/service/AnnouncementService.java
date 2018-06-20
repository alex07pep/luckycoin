package com.pep.luckycoin.service;

import com.pep.luckycoin.domain.Announcement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;

/**
 * Service Interface for managing Announcement.
 */
public interface AnnouncementService {

    /**
     * Save a announcement.
     *
     * @param announcement the entity to save
     * @return the persisted entity
     */
    Announcement save(Announcement announcement);

    /**
     * Get all the announcements.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Announcement> findAll(Pageable pageable);

    /**
     * Get the "id" announcement.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Announcement findOne(Long id);

    /**
     * Delete the "id" announcement.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the announcement corresponding to the query.
     *
     * @param query the query of the search
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Announcement> search(String query, Pageable pageable);

    /**
     *  Find all announcements that expire today and change status for everyone
     *  - to COSED if min price is no reached
     *  - or to FINISED is min price is reached
     *
     */
    void resolveExpiredAnnouncements();

    /**
     * Return the credit for all tickets from an announcement given as param to buyers
     *
     * @param announcement to return credit for
     */
    void returnCreditForAnnouncement(Announcement announcement);

    /**
     * Set a random winner for announcement given as param
     * Set status to Finished for announcement
     *
     * @param announcement to set winner to
     */
    void setWinnerForAnnouncement(Announcement announcement);

    /**
     * Every day at 15:00 check expired Announcements
     * Using cron expression
     */
    void scheduleEverydayCheckForExpiredAnnouncements();
}
