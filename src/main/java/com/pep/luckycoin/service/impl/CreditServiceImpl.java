package com.pep.luckycoin.service.impl;

import com.pep.luckycoin.service.CreditService;
import com.pep.luckycoin.domain.Credit;
import com.pep.luckycoin.repository.CreditRepository;
import com.pep.luckycoin.repository.search.CreditSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Credit.
 */
@Service
@Transactional
public class CreditServiceImpl implements CreditService {

    private final Logger log = LoggerFactory.getLogger(CreditServiceImpl.class);

    private final CreditRepository creditRepository;

    private final CreditSearchRepository creditSearchRepository;

    public CreditServiceImpl(CreditRepository creditRepository, CreditSearchRepository creditSearchRepository) {
        this.creditRepository = creditRepository;
        this.creditSearchRepository = creditSearchRepository;
    }

    /**
     * Save a credit.
     *
     * @param credit the entity to save
     * @return the persisted entity
     */
    @Override
    public Credit save(Credit credit) {
        log.debug("Request to save Credit : {}", credit);
        Credit result = creditRepository.save(credit);
        creditSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the credits.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Credit> findAll() {
        log.debug("Request to get all Credits");
        return creditRepository.findAll();
    }

    /**
     * Get one credit by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Credit findOne(Long id) {
        log.debug("Request to get Credit : {}", id);
        return creditRepository.findOne(id);
    }

    /**
     * Get one credit by User.
     *
     * @param userLogin the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Credit findByUserLogin(String userLogin) {
        log.debug("Request to get Credit by User: {}", userLogin);
        return creditRepository.findByUserLogin(userLogin);
    }

    /**
     * Delete the credit by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Credit : {}", id);
        creditRepository.delete(id);
        creditSearchRepository.delete(id);
    }

    /**
     * Search for the credit corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Credit> search(String query) {
        log.debug("Request to search Credits for query {}", query);
        return StreamSupport
            .stream(creditSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
