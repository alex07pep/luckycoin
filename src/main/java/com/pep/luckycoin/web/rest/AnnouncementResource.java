package com.pep.luckycoin.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.pep.luckycoin.domain.Announcement;
import com.pep.luckycoin.domain.enumeration.Status;
import com.pep.luckycoin.service.AnnouncementService;
import com.pep.luckycoin.service.UserService;
import com.pep.luckycoin.service.util.RandomUtil;
import com.pep.luckycoin.web.rest.errors.BadRequestAlertException;
import com.pep.luckycoin.web.rest.util.HeaderUtil;
import com.pep.luckycoin.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Announcement.
 */
@RestController
@RequestMapping("/api")
public class AnnouncementResource {

    private final Logger log = LoggerFactory.getLogger(AnnouncementResource.class);

    private static final String ENTITY_NAME = "announcement";

    private final AnnouncementService announcementService;

    @Autowired
    private UserService userService;

    public AnnouncementResource(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    /**
     * POST  /announcements : Create a new announcement.
     *
     * @param announcement the announcement to create
     * @return the ResponseEntity with status 201 (Created) and with body the new announcement, or with status 400 (Bad Request) if the announcement has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/announcements")
    @Timed
    public ResponseEntity<Announcement> createAnnouncement(@Valid @RequestBody Announcement announcement) throws URISyntaxException {
        log.debug("REST request to save Announcement : {}", announcement);
        if (announcement.getId() != null) {
            throw new BadRequestAlertException("A new announcement cannot already have an ID", ENTITY_NAME, "idexists");
        }

        announcement.setOwner(userService.getUserWithAuthorities().get());
        announcement.setWinner(null);
        announcement.setAddedDate(LocalDate.now());
        announcement.setFinishDate(LocalDate.now().plusMonths(2));
        announcement.setStatus(Status.OPEN);
        announcement.setTicketValue(10);
        announcement.setTicketsNumber(RandomUtil.calculateNumberOfTickets(announcement.getPrice(), announcement.getTicketValue()));
        announcement.setTicketsSold(Long.valueOf(0));

        if(announcement.getMinimPrice() == null || announcement.getMinimPrice() == 0 || announcement.getMinimPrice() > announcement.getPrice()) {
            announcement.setMinimPrice(announcement.getPrice());
        }

        Announcement result = announcementService.save(announcement);
        return ResponseEntity.created(new URI("/api/announcements/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /announcements : Updates an existing announcement.
     *
     * @param announcement the announcement to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated announcement,
     * or with status 400 (Bad Request) if the announcement is not valid,
     * or with status 500 (Internal Server Error) if the announcement couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/announcements")
    @Timed
    public ResponseEntity<Announcement> updateAnnouncement(@Valid @RequestBody Announcement announcement) throws URISyntaxException {
        log.debug("REST request to update Announcement : {}", announcement);
        if (announcement.getId() == null) {
            return createAnnouncement(announcement);
        }
        Announcement result = announcementService.save(announcement);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, announcement.getId().toString()))
            .body(result);
    }

    /**
     * announcementsDecline : Decline the product.
     *
     * @return the ResponseEntity with status 200 (OK) and with body the declined announcement,
     * or with status 400 (Bad Request) if the announcement is not valid,
     * or with status 500 (Internal Server Error) if the announcement couldn't be declined
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @GetMapping("/announcementsDecline/{id}")
    @Timed
    public ResponseEntity<Announcement> declineAnnouncement(@PathVariable Long id) {
        log.debug("REST request to get Announcement : {}", id);
        announcementService.returnCreditForAnnouncement(announcementService.findOne(id));
        Announcement announcement = announcementService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(announcement));
    }

    /**
     * announcementsAccept : Accept the product.
     *
     * @return the ResponseEntity with status 200 (OK) and with body the accepted announcement,
     * or with status 400 (Bad Request) if the announcement is not valid,
     * or with status 500 (Internal Server Error) if the announcement couldn't be accepted
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @GetMapping("/announcementsAccept/{id}")
    @Timed
    public ResponseEntity<Announcement> acceptAnnouncement(@PathVariable Long id) {
        log.debug("REST request to get Announcement : {}", id);
        announcementService.payOwnerForAnnouncement(announcementService.findOne(id));
        Announcement announcement = announcementService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(announcement));
    }

    /**
     * GET  /announcements : get all the announcements.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of announcements in body
     */
    @GetMapping("/announcements")
    @Timed
    public ResponseEntity<List<Announcement>> getAllAnnouncements(Pageable pageable) {
        log.debug("REST request to get a page of Announcements");
        Page<Announcement> page = announcementService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/announcements");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /announcements/:id : get the "id" announcement.
     *
     * @param id the id of the announcement to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the announcement, or with status 404 (Not Found)
     */
    @GetMapping("/announcements/{id}")
    @Timed
    public ResponseEntity<Announcement> getAnnouncement(@PathVariable Long id) {
        log.debug("REST request to get Announcement : {}", id);
        Announcement announcement = announcementService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(announcement));
    }

    /**
     * DELETE  /announcements/:id : delete the "id" announcement.
     *
     * @param id the id of the announcement to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/announcements/{id}")
    @Timed
    public ResponseEntity<Void> deleteAnnouncement(@PathVariable Long id) {
        log.debug("REST request to delete Announcement : {}", id);
        announcementService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/announcements?query=:query : search for the announcement corresponding
     * to the query.
     *
     * @param query the query of the announcement search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/announcements")
    @Timed
    public ResponseEntity<List<Announcement>> searchAnnouncements(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Announcements for query {}", query);
        Page<Announcement> page = announcementService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/announcements");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
