package com.pep.luckycoin.service;

import com.pep.luckycoin.domain.Announcement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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
}
