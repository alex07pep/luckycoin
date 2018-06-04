package com.pep.luckycoin.web.rest;

import com.pep.luckycoin.LuckycoinApp;

import com.pep.luckycoin.domain.Announcement;
import com.pep.luckycoin.repository.AnnouncementRepository;
import com.pep.luckycoin.service.AnnouncementService;
import com.pep.luckycoin.repository.search.AnnouncementSearchRepository;
import com.pep.luckycoin.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.pep.luckycoin.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.pep.luckycoin.domain.enumeration.AnnouncementCategory;
import com.pep.luckycoin.domain.enumeration.Location;
import com.pep.luckycoin.domain.enumeration.Status;
/**
 * Test class for the AnnouncementResource REST controller.
 *
 * @see AnnouncementResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LuckycoinApp.class)
public class AnnouncementResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final AnnouncementCategory DEFAULT_CATEGORY = AnnouncementCategory.PHONES;
    private static final AnnouncementCategory UPDATED_CATEGORY = AnnouncementCategory.AUTO;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_PHOTO_1 = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PHOTO_1 = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_PHOTO_1_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PHOTO_1_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_PHOTO_2 = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PHOTO_2 = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_PHOTO_2_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PHOTO_2_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_PHOTO_3 = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PHOTO_3 = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_PHOTO_3_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PHOTO_3_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_PHOTO_4 = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PHOTO_4 = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_PHOTO_4_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PHOTO_4_CONTENT_TYPE = "image/png";

    private static final LocalDate DEFAULT_ADDED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_ADDED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FINISH_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FINISH_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    private static final Location DEFAULT_LOCATION = Location.BUCURESTI;
    private static final Location UPDATED_LOCATION = Location.ALBA;

    private static final Long DEFAULT_PRICE = 1L;
    private static final Long UPDATED_PRICE = 2L;

    private static final Long DEFAULT_MINIM_PRICE = 1L;
    private static final Long UPDATED_MINIM_PRICE = 2L;

    private static final Integer DEFAULT_TICKET_VALUE = 1;
    private static final Integer UPDATED_TICKET_VALUE = 2;

    private static final Status DEFAULT_STATUS = Status.OPEN;
    private static final Status UPDATED_STATUS = Status.CLOSED;

    private static final Long DEFAULT_TICKETS_NUMBER = 1L;
    private static final Long UPDATED_TICKETS_NUMBER = 2L;

    private static final Long DEFAULT_TICKETS_SOLD = 1L;
    private static final Long UPDATED_TICKETS_SOLD = 2L;

    @Autowired
    private AnnouncementRepository announcementRepository;

    @Autowired
    private AnnouncementService announcementService;

    @Autowired
    private AnnouncementSearchRepository announcementSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAnnouncementMockMvc;

    private Announcement announcement;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AnnouncementResource announcementResource = new AnnouncementResource(announcementService);
        this.restAnnouncementMockMvc = MockMvcBuilders.standaloneSetup(announcementResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Announcement createEntity(EntityManager em) {
        Announcement announcement = new Announcement()
            .name(DEFAULT_NAME)
            .category(DEFAULT_CATEGORY)
            .description(DEFAULT_DESCRIPTION)
            .photo1(DEFAULT_PHOTO_1)
            .photo1ContentType(DEFAULT_PHOTO_1_CONTENT_TYPE)
            .photo2(DEFAULT_PHOTO_2)
            .photo2ContentType(DEFAULT_PHOTO_2_CONTENT_TYPE)
            .photo3(DEFAULT_PHOTO_3)
            .photo3ContentType(DEFAULT_PHOTO_3_CONTENT_TYPE)
            .photo4(DEFAULT_PHOTO_4)
            .photo4ContentType(DEFAULT_PHOTO_4_CONTENT_TYPE)
            .addedDate(DEFAULT_ADDED_DATE)
            .finishDate(DEFAULT_FINISH_DATE)
            .phoneNumber(DEFAULT_PHONE_NUMBER)
            .location(DEFAULT_LOCATION)
            .price(DEFAULT_PRICE)
            .minimPrice(DEFAULT_MINIM_PRICE)
            .ticketValue(DEFAULT_TICKET_VALUE)
            .status(DEFAULT_STATUS)
            .ticketsNumber(DEFAULT_TICKETS_NUMBER)
            .ticketsSold(DEFAULT_TICKETS_SOLD);
        return announcement;
    }

    @Before
    public void initTest() {
        announcementSearchRepository.deleteAll();
        announcement = createEntity(em);
    }

    @Test
    @Transactional
    public void createAnnouncement() throws Exception {
        int databaseSizeBeforeCreate = announcementRepository.findAll().size();

        // Create the Announcement
        restAnnouncementMockMvc.perform(post("/api/announcements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(announcement)))
            .andExpect(status().isCreated());

        // Validate the Announcement in the database
        List<Announcement> announcementList = announcementRepository.findAll();
        assertThat(announcementList).hasSize(databaseSizeBeforeCreate + 1);
        Announcement testAnnouncement = announcementList.get(announcementList.size() - 1);
        assertThat(testAnnouncement.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testAnnouncement.getCategory()).isEqualTo(DEFAULT_CATEGORY);
        assertThat(testAnnouncement.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testAnnouncement.getPhoto1()).isEqualTo(DEFAULT_PHOTO_1);
        assertThat(testAnnouncement.getPhoto1ContentType()).isEqualTo(DEFAULT_PHOTO_1_CONTENT_TYPE);
        assertThat(testAnnouncement.getPhoto2()).isEqualTo(DEFAULT_PHOTO_2);
        assertThat(testAnnouncement.getPhoto2ContentType()).isEqualTo(DEFAULT_PHOTO_2_CONTENT_TYPE);
        assertThat(testAnnouncement.getPhoto3()).isEqualTo(DEFAULT_PHOTO_3);
        assertThat(testAnnouncement.getPhoto3ContentType()).isEqualTo(DEFAULT_PHOTO_3_CONTENT_TYPE);
        assertThat(testAnnouncement.getPhoto4()).isEqualTo(DEFAULT_PHOTO_4);
        assertThat(testAnnouncement.getPhoto4ContentType()).isEqualTo(DEFAULT_PHOTO_4_CONTENT_TYPE);
        assertThat(testAnnouncement.getAddedDate()).isEqualTo(DEFAULT_ADDED_DATE);
        assertThat(testAnnouncement.getFinishDate()).isEqualTo(DEFAULT_FINISH_DATE);
        assertThat(testAnnouncement.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
        assertThat(testAnnouncement.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testAnnouncement.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testAnnouncement.getMinimPrice()).isEqualTo(DEFAULT_MINIM_PRICE);
        assertThat(testAnnouncement.getTicketValue()).isEqualTo(DEFAULT_TICKET_VALUE);
        assertThat(testAnnouncement.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testAnnouncement.getTicketsNumber()).isEqualTo(DEFAULT_TICKETS_NUMBER);
        assertThat(testAnnouncement.getTicketsSold()).isEqualTo(DEFAULT_TICKETS_SOLD);

        // Validate the Announcement in Elasticsearch
        Announcement announcementEs = announcementSearchRepository.findOne(testAnnouncement.getId());
        assertThat(announcementEs).isEqualToIgnoringGivenFields(testAnnouncement);
    }

    @Test
    @Transactional
    public void createAnnouncementWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = announcementRepository.findAll().size();

        // Create the Announcement with an existing ID
        announcement.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAnnouncementMockMvc.perform(post("/api/announcements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(announcement)))
            .andExpect(status().isBadRequest());

        // Validate the Announcement in the database
        List<Announcement> announcementList = announcementRepository.findAll();
        assertThat(announcementList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = announcementRepository.findAll().size();
        // set the field null
        announcement.setName(null);

        // Create the Announcement, which fails.

        restAnnouncementMockMvc.perform(post("/api/announcements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(announcement)))
            .andExpect(status().isBadRequest());

        List<Announcement> announcementList = announcementRepository.findAll();
        assertThat(announcementList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCategoryIsRequired() throws Exception {
        int databaseSizeBeforeTest = announcementRepository.findAll().size();
        // set the field null
        announcement.setCategory(null);

        // Create the Announcement, which fails.

        restAnnouncementMockMvc.perform(post("/api/announcements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(announcement)))
            .andExpect(status().isBadRequest());

        List<Announcement> announcementList = announcementRepository.findAll();
        assertThat(announcementList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPhoneNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = announcementRepository.findAll().size();
        // set the field null
        announcement.setPhoneNumber(null);

        // Create the Announcement, which fails.

        restAnnouncementMockMvc.perform(post("/api/announcements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(announcement)))
            .andExpect(status().isBadRequest());

        List<Announcement> announcementList = announcementRepository.findAll();
        assertThat(announcementList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLocationIsRequired() throws Exception {
        int databaseSizeBeforeTest = announcementRepository.findAll().size();
        // set the field null
        announcement.setLocation(null);

        // Create the Announcement, which fails.

        restAnnouncementMockMvc.perform(post("/api/announcements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(announcement)))
            .andExpect(status().isBadRequest());

        List<Announcement> announcementList = announcementRepository.findAll();
        assertThat(announcementList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPriceIsRequired() throws Exception {
        int databaseSizeBeforeTest = announcementRepository.findAll().size();
        // set the field null
        announcement.setPrice(null);

        // Create the Announcement, which fails.

        restAnnouncementMockMvc.perform(post("/api/announcements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(announcement)))
            .andExpect(status().isBadRequest());

        List<Announcement> announcementList = announcementRepository.findAll();
        assertThat(announcementList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAnnouncements() throws Exception {
        // Initialize the database
        announcementRepository.saveAndFlush(announcement);

        // Get all the announcementList
        restAnnouncementMockMvc.perform(get("/api/announcements?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(announcement.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].photo1ContentType").value(hasItem(DEFAULT_PHOTO_1_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].photo1").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO_1))))
            .andExpect(jsonPath("$.[*].photo2ContentType").value(hasItem(DEFAULT_PHOTO_2_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].photo2").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO_2))))
            .andExpect(jsonPath("$.[*].photo3ContentType").value(hasItem(DEFAULT_PHOTO_3_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].photo3").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO_3))))
            .andExpect(jsonPath("$.[*].photo4ContentType").value(hasItem(DEFAULT_PHOTO_4_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].photo4").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO_4))))
            .andExpect(jsonPath("$.[*].addedDate").value(hasItem(DEFAULT_ADDED_DATE.toString())))
            .andExpect(jsonPath("$.[*].finishDate").value(hasItem(DEFAULT_FINISH_DATE.toString())))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].minimPrice").value(hasItem(DEFAULT_MINIM_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].ticketValue").value(hasItem(DEFAULT_TICKET_VALUE)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].ticketsNumber").value(hasItem(DEFAULT_TICKETS_NUMBER.intValue())))
            .andExpect(jsonPath("$.[*].ticketsSold").value(hasItem(DEFAULT_TICKETS_SOLD.intValue())));
    }

    @Test
    @Transactional
    public void getAnnouncement() throws Exception {
        // Initialize the database
        announcementRepository.saveAndFlush(announcement);

        // Get the announcement
        restAnnouncementMockMvc.perform(get("/api/announcements/{id}", announcement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(announcement.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.photo1ContentType").value(DEFAULT_PHOTO_1_CONTENT_TYPE))
            .andExpect(jsonPath("$.photo1").value(Base64Utils.encodeToString(DEFAULT_PHOTO_1)))
            .andExpect(jsonPath("$.photo2ContentType").value(DEFAULT_PHOTO_2_CONTENT_TYPE))
            .andExpect(jsonPath("$.photo2").value(Base64Utils.encodeToString(DEFAULT_PHOTO_2)))
            .andExpect(jsonPath("$.photo3ContentType").value(DEFAULT_PHOTO_3_CONTENT_TYPE))
            .andExpect(jsonPath("$.photo3").value(Base64Utils.encodeToString(DEFAULT_PHOTO_3)))
            .andExpect(jsonPath("$.photo4ContentType").value(DEFAULT_PHOTO_4_CONTENT_TYPE))
            .andExpect(jsonPath("$.photo4").value(Base64Utils.encodeToString(DEFAULT_PHOTO_4)))
            .andExpect(jsonPath("$.addedDate").value(DEFAULT_ADDED_DATE.toString()))
            .andExpect(jsonPath("$.finishDate").value(DEFAULT_FINISH_DATE.toString()))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER.toString()))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION.toString()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.intValue()))
            .andExpect(jsonPath("$.minimPrice").value(DEFAULT_MINIM_PRICE.intValue()))
            .andExpect(jsonPath("$.ticketValue").value(DEFAULT_TICKET_VALUE))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.ticketsNumber").value(DEFAULT_TICKETS_NUMBER.intValue()))
            .andExpect(jsonPath("$.ticketsSold").value(DEFAULT_TICKETS_SOLD.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAnnouncement() throws Exception {
        // Get the announcement
        restAnnouncementMockMvc.perform(get("/api/announcements/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAnnouncement() throws Exception {
        // Initialize the database
        announcementService.save(announcement);

        int databaseSizeBeforeUpdate = announcementRepository.findAll().size();

        // Update the announcement
        Announcement updatedAnnouncement = announcementRepository.findOne(announcement.getId());
        // Disconnect from session so that the updates on updatedAnnouncement are not directly saved in db
        em.detach(updatedAnnouncement);
        updatedAnnouncement
            .name(UPDATED_NAME)
            .category(UPDATED_CATEGORY)
            .description(UPDATED_DESCRIPTION)
            .photo1(UPDATED_PHOTO_1)
            .photo1ContentType(UPDATED_PHOTO_1_CONTENT_TYPE)
            .photo2(UPDATED_PHOTO_2)
            .photo2ContentType(UPDATED_PHOTO_2_CONTENT_TYPE)
            .photo3(UPDATED_PHOTO_3)
            .photo3ContentType(UPDATED_PHOTO_3_CONTENT_TYPE)
            .photo4(UPDATED_PHOTO_4)
            .photo4ContentType(UPDATED_PHOTO_4_CONTENT_TYPE)
            .addedDate(UPDATED_ADDED_DATE)
            .finishDate(UPDATED_FINISH_DATE)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .location(UPDATED_LOCATION)
            .price(UPDATED_PRICE)
            .minimPrice(UPDATED_MINIM_PRICE)
            .ticketValue(UPDATED_TICKET_VALUE)
            .status(UPDATED_STATUS)
            .ticketsNumber(UPDATED_TICKETS_NUMBER)
            .ticketsSold(UPDATED_TICKETS_SOLD);

        restAnnouncementMockMvc.perform(put("/api/announcements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAnnouncement)))
            .andExpect(status().isOk());

        // Validate the Announcement in the database
        List<Announcement> announcementList = announcementRepository.findAll();
        assertThat(announcementList).hasSize(databaseSizeBeforeUpdate);
        Announcement testAnnouncement = announcementList.get(announcementList.size() - 1);
        assertThat(testAnnouncement.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testAnnouncement.getCategory()).isEqualTo(UPDATED_CATEGORY);
        assertThat(testAnnouncement.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testAnnouncement.getPhoto1()).isEqualTo(UPDATED_PHOTO_1);
        assertThat(testAnnouncement.getPhoto1ContentType()).isEqualTo(UPDATED_PHOTO_1_CONTENT_TYPE);
        assertThat(testAnnouncement.getPhoto2()).isEqualTo(UPDATED_PHOTO_2);
        assertThat(testAnnouncement.getPhoto2ContentType()).isEqualTo(UPDATED_PHOTO_2_CONTENT_TYPE);
        assertThat(testAnnouncement.getPhoto3()).isEqualTo(UPDATED_PHOTO_3);
        assertThat(testAnnouncement.getPhoto3ContentType()).isEqualTo(UPDATED_PHOTO_3_CONTENT_TYPE);
        assertThat(testAnnouncement.getPhoto4()).isEqualTo(UPDATED_PHOTO_4);
        assertThat(testAnnouncement.getPhoto4ContentType()).isEqualTo(UPDATED_PHOTO_4_CONTENT_TYPE);
        assertThat(testAnnouncement.getAddedDate()).isEqualTo(UPDATED_ADDED_DATE);
        assertThat(testAnnouncement.getFinishDate()).isEqualTo(UPDATED_FINISH_DATE);
        assertThat(testAnnouncement.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testAnnouncement.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testAnnouncement.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testAnnouncement.getMinimPrice()).isEqualTo(UPDATED_MINIM_PRICE);
        assertThat(testAnnouncement.getTicketValue()).isEqualTo(UPDATED_TICKET_VALUE);
        assertThat(testAnnouncement.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testAnnouncement.getTicketsNumber()).isEqualTo(UPDATED_TICKETS_NUMBER);
        assertThat(testAnnouncement.getTicketsSold()).isEqualTo(UPDATED_TICKETS_SOLD);

        // Validate the Announcement in Elasticsearch
        Announcement announcementEs = announcementSearchRepository.findOne(testAnnouncement.getId());
        assertThat(announcementEs).isEqualToIgnoringGivenFields(testAnnouncement);
    }

    @Test
    @Transactional
    public void updateNonExistingAnnouncement() throws Exception {
        int databaseSizeBeforeUpdate = announcementRepository.findAll().size();

        // Create the Announcement

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAnnouncementMockMvc.perform(put("/api/announcements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(announcement)))
            .andExpect(status().isCreated());

        // Validate the Announcement in the database
        List<Announcement> announcementList = announcementRepository.findAll();
        assertThat(announcementList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAnnouncement() throws Exception {
        // Initialize the database
        announcementService.save(announcement);

        int databaseSizeBeforeDelete = announcementRepository.findAll().size();

        // Get the announcement
        restAnnouncementMockMvc.perform(delete("/api/announcements/{id}", announcement.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean announcementExistsInEs = announcementSearchRepository.exists(announcement.getId());
        assertThat(announcementExistsInEs).isFalse();

        // Validate the database is empty
        List<Announcement> announcementList = announcementRepository.findAll();
        assertThat(announcementList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchAnnouncement() throws Exception {
        // Initialize the database
        announcementService.save(announcement);

        // Search the announcement
        restAnnouncementMockMvc.perform(get("/api/_search/announcements?query=id:" + announcement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(announcement.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].photo1ContentType").value(hasItem(DEFAULT_PHOTO_1_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].photo1").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO_1))))
            .andExpect(jsonPath("$.[*].photo2ContentType").value(hasItem(DEFAULT_PHOTO_2_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].photo2").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO_2))))
            .andExpect(jsonPath("$.[*].photo3ContentType").value(hasItem(DEFAULT_PHOTO_3_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].photo3").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO_3))))
            .andExpect(jsonPath("$.[*].photo4ContentType").value(hasItem(DEFAULT_PHOTO_4_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].photo4").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO_4))))
            .andExpect(jsonPath("$.[*].addedDate").value(hasItem(DEFAULT_ADDED_DATE.toString())))
            .andExpect(jsonPath("$.[*].finishDate").value(hasItem(DEFAULT_FINISH_DATE.toString())))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].minimPrice").value(hasItem(DEFAULT_MINIM_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].ticketValue").value(hasItem(DEFAULT_TICKET_VALUE)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].ticketsNumber").value(hasItem(DEFAULT_TICKETS_NUMBER.intValue())))
            .andExpect(jsonPath("$.[*].ticketsSold").value(hasItem(DEFAULT_TICKETS_SOLD.intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Announcement.class);
        Announcement announcement1 = new Announcement();
        announcement1.setId(1L);
        Announcement announcement2 = new Announcement();
        announcement2.setId(announcement1.getId());
        assertThat(announcement1).isEqualTo(announcement2);
        announcement2.setId(2L);
        assertThat(announcement1).isNotEqualTo(announcement2);
        announcement1.setId(null);
        assertThat(announcement1).isNotEqualTo(announcement2);
    }
}
