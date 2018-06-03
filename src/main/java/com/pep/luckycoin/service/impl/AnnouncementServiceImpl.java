package com.pep.luckycoin.service.impl;

import com.pep.luckycoin.service.AnnouncementService;
import com.pep.luckycoin.domain.Announcement;
import com.pep.luckycoin.repository.AnnouncementRepository;
import com.pep.luckycoin.repository.search.AnnouncementSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


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
}
