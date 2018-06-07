package com.pep.luckycoin.service.impl;

import com.pep.luckycoin.service.TransactionService;
import com.pep.luckycoin.domain.Transaction;
import com.pep.luckycoin.repository.TransactionRepository;
import com.pep.luckycoin.repository.search.TransactionSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Transaction.
 */
@Service
@Transactional
public class TransactionServiceImpl implements TransactionService {

    private final Logger log = LoggerFactory.getLogger(TransactionServiceImpl.class);

    private final TransactionRepository transactionRepository;

    private final TransactionSearchRepository transactionSearchRepository;

    public TransactionServiceImpl(TransactionRepository transactionRepository, TransactionSearchRepository transactionSearchRepository) {
        this.transactionRepository = transactionRepository;
        this.transactionSearchRepository = transactionSearchRepository;
    }

    /**
     * Save a transaction.
     *
     * @param transaction the entity to save
     * @return the persisted entity
     */
    @Override
    public Transaction save(Transaction transaction) {
        log.debug("Request to save Transaction : {}", transaction);
        Transaction result = transactionRepository.save(transaction);
        transactionSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the transactions.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Transaction> findAll() {
        log.debug("Request to get all Transactions");
        return transactionRepository.findAll();
    }

    /**
     * Get all the transactions where user is current user.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Transaction> findByUserIsCurrentUser() {
        log.debug("Request to get all Transactions for current user");
        return transactionRepository.findByUserIsCurrentUser();
    }

    /**
     * Get one transaction by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Transaction findOne(Long id) {
        log.debug("Request to get Transaction : {}", id);
        return transactionRepository.findOne(id);
    }

    /**
     * Delete the transaction by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Transaction : {}", id);
        transactionRepository.delete(id);
        transactionSearchRepository.delete(id);
    }

    /**
     * Search for the transaction corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Transaction> search(String query) {
        log.debug("Request to search Transactions for query {}", query);
        return StreamSupport
            .stream(transactionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
