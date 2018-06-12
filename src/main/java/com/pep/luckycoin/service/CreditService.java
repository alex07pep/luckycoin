package com.pep.luckycoin.service;

import com.pep.luckycoin.domain.Credit;
import com.pep.luckycoin.domain.User;

import java.util.List;

/**
 * Service Interface for managing Credit.
 */
public interface CreditService {

    /**
     * Save a credit.
     *
     * @param credit the entity to save
     * @return the persisted entity
     */
    Credit save(Credit credit);

    /**
     * Get all the credits.
     *
     * @return the list of entities
     */
    List<Credit> findAll();

    /**
     * Get the "id" credit.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Credit findOne(Long id);

    /**
     * Delete the "id" credit.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the credit corresponding to the query.
     *
     * @param query the query of the search
     *
     * @return the list of entities
     */
    List<Credit> search(String query);

    /**
     * Get one credit by User.
     *
     * @param userLogin the id of the entity
     * @return the entity
     */
    Credit findByUserLogin(String userLogin);

    /**
     * Initialize credit for given user as param
     *
     * @param user
     */
    void initializeCreditForUser (User user);
}
