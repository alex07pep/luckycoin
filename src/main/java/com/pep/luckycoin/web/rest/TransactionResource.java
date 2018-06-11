package com.pep.luckycoin.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.pep.luckycoin.domain.Credit;
import com.pep.luckycoin.domain.Transaction;
import com.pep.luckycoin.security.AuthoritiesConstants;
import com.pep.luckycoin.security.SecurityUtils;
import com.pep.luckycoin.service.AnnouncementService;
import com.pep.luckycoin.service.CreditService;
import com.pep.luckycoin.service.TransactionService;
import com.pep.luckycoin.service.UserService;
import com.pep.luckycoin.web.rest.errors.BadRequestAlertException;
import com.pep.luckycoin.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Transaction.
 */
@RestController
@RequestMapping("/api")
public class TransactionResource {

    private final Logger log = LoggerFactory.getLogger(TransactionResource.class);

    private static final String ENTITY_NAME = "transaction";

    private final TransactionService transactionService;

    @Autowired
    private AnnouncementService announcementService;

    @Autowired
    private UserService userService;

    @Autowired
    private CreditService creditService;

    public TransactionResource(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    /**
     * POST  /transactions : Create a new transaction.
     *
     * @param transaction the transaction to create
     * @return the ResponseEntity with status 201 (Created) and with body the new transaction, or with status 400 (Bad Request) if the transaction has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/transactions")
    @Timed
    public ResponseEntity<Transaction> createTransaction(@RequestBody Transaction transaction) throws URISyntaxException {
        log.debug("REST request to save Transaction : {}", transaction);
        if (transaction.getId() != null) {
            throw new BadRequestAlertException("A new transaction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Credit currentUserCredit = creditService.findByUserLogin(userService.getUserWithAuthorities().get().getLogin());
        if(currentUserCredit.getCreditValue() >= transaction.getAnnouncement().getTicketValue()) {
            transaction.setCompleted(false);
            transaction.setUser(userService.getUserWithAuthorities().get());
            Transaction result = transactionService.save(transaction);
            transaction.getAnnouncement().setTicketsSold(transaction.getAnnouncement().getTicketsSold() + 1);
            announcementService.save(transaction.getAnnouncement());
            currentUserCredit.setCreditValue(currentUserCredit.getCreditValue() - transaction.getAnnouncement().getTicketValue());
            creditService.save(currentUserCredit);
            //if all tickets are sold set winner
            if(transaction.getAnnouncement().getTicketsSold() >= transaction.getAnnouncement().getTicketsNumber()) {
                announcementService.setWinnerForAnnouncement(transaction.getAnnouncement());
            }
            return ResponseEntity.created(new URI("/api/transactions/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
                .body(result);
        } else {
            throw new BadRequestAlertException("", "creditMySuffix", "notEnoughCredit");
        }

    }

    /**
     * PUT  /transactions : Updates an existing transaction.
     *
     * @param transaction the transaction to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated transaction,
     * or with status 400 (Bad Request) if the transaction is not valid,
     * or with status 500 (Internal Server Error) if the transaction couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/transactions")
    @Timed
    public ResponseEntity<Transaction> updateTransaction(@RequestBody Transaction transaction) throws URISyntaxException {
        log.debug("REST request to update Transaction : {}", transaction);
        if (transaction.getId() == null) {
            return createTransaction(transaction);
        }
        Transaction result = transactionService.save(transaction);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, transaction.getId().toString()))
            .body(result);
    }

    /**
     * GET  /transactions : get all the transactions if you are admin or your transaction if you are just an user.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of transactions in body
     */
    @GetMapping("/transactions")
    @Timed
    public List<Transaction> getAllTransactions() {
        log.debug("REST request to get all Transactions");
        if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            return transactionService.findAll();
        } else {
            return transactionService.findByUserIsCurrentUser();
        }
    }

    /**
     * GET  /transactions/:id : get the "id" transaction.
     *
     * @param id the id of the transaction to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the transaction, or with status 404 (Not Found)
     */
    @GetMapping("/transactions/{id}")
    @Timed
    public ResponseEntity<Transaction> getTransaction(@PathVariable Long id) {
        log.debug("REST request to get Transaction : {}", id);
        Transaction transaction = transactionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(transaction));
    }

    /**
     * DELETE  /transactions/:id : delete the "id" transaction.
     *
     * @param id the id of the transaction to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/transactions/{id}")
    @Timed
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) {
        log.debug("REST request to delete Transaction : {}", id);
        transactionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/transactions?query=:query : search for the transaction corresponding
     * to the query.
     *
     * @param query the query of the transaction search
     * @return the result of the search
     */
    @GetMapping("/_search/transactions")
    @Timed
    public List<Transaction> searchTransactions(@RequestParam String query) {
        log.debug("REST request to search Transactions for query {}", query);
        return transactionService.search(query);
    }

}
