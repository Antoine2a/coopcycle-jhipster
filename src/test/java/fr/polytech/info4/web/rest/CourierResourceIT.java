package fr.polytech.info4.web.rest;

import fr.polytech.info4.MyblogApp;
import fr.polytech.info4.domain.Courier;
import fr.polytech.info4.repository.CourierRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CourierResource} REST controller.
 */
@SpringBootTest(classes = MyblogApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CourierResourceIT {

    private static final Integer DEFAULT_NOTATION = 1;
    private static final Integer UPDATED_NOTATION = 2;

    private static final Float DEFAULT_LATITUDE = 1F;
    private static final Float UPDATED_LATITUDE = 2F;

    private static final Float DEFAULT_LONGITUDE = 1F;
    private static final Float UPDATED_LONGITUDE = 2F;

    @Autowired
    private CourierRepository courierRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCourierMockMvc;

    private Courier courier;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Courier createEntity(EntityManager em) {
        Courier courier = new Courier()
            .notation(DEFAULT_NOTATION)
            .latitude(DEFAULT_LATITUDE)
            .longitude(DEFAULT_LONGITUDE);
        return courier;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Courier createUpdatedEntity(EntityManager em) {
        Courier courier = new Courier()
            .notation(UPDATED_NOTATION)
            .latitude(UPDATED_LATITUDE)
            .longitude(UPDATED_LONGITUDE);
        return courier;
    }

    @BeforeEach
    public void initTest() {
        courier = createEntity(em);
    }

    @Test
    @Transactional
    public void createCourier() throws Exception {
        int databaseSizeBeforeCreate = courierRepository.findAll().size();
        // Create the Courier
        restCourierMockMvc.perform(post("/api/couriers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(courier)))
            .andExpect(status().isCreated());

        // Validate the Courier in the database
        List<Courier> courierList = courierRepository.findAll();
        assertThat(courierList).hasSize(databaseSizeBeforeCreate + 1);
        Courier testCourier = courierList.get(courierList.size() - 1);
        assertThat(testCourier.getNotation()).isEqualTo(DEFAULT_NOTATION);
        assertThat(testCourier.getLatitude()).isEqualTo(DEFAULT_LATITUDE);
        assertThat(testCourier.getLongitude()).isEqualTo(DEFAULT_LONGITUDE);
    }

    @Test
    @Transactional
    public void createCourierWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = courierRepository.findAll().size();

        // Create the Courier with an existing ID
        courier.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCourierMockMvc.perform(post("/api/couriers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(courier)))
            .andExpect(status().isBadRequest());

        // Validate the Courier in the database
        List<Courier> courierList = courierRepository.findAll();
        assertThat(courierList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCouriers() throws Exception {
        // Initialize the database
        courierRepository.saveAndFlush(courier);

        // Get all the courierList
        restCourierMockMvc.perform(get("/api/couriers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(courier.getId().intValue())))
            .andExpect(jsonPath("$.[*].notation").value(hasItem(DEFAULT_NOTATION)))
            .andExpect(jsonPath("$.[*].latitude").value(hasItem(DEFAULT_LATITUDE.doubleValue())))
            .andExpect(jsonPath("$.[*].longitude").value(hasItem(DEFAULT_LONGITUDE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getCourier() throws Exception {
        // Initialize the database
        courierRepository.saveAndFlush(courier);

        // Get the courier
        restCourierMockMvc.perform(get("/api/couriers/{id}", courier.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(courier.getId().intValue()))
            .andExpect(jsonPath("$.notation").value(DEFAULT_NOTATION))
            .andExpect(jsonPath("$.latitude").value(DEFAULT_LATITUDE.doubleValue()))
            .andExpect(jsonPath("$.longitude").value(DEFAULT_LONGITUDE.doubleValue()));
    }
    @Test
    @Transactional
    public void getNonExistingCourier() throws Exception {
        // Get the courier
        restCourierMockMvc.perform(get("/api/couriers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCourier() throws Exception {
        // Initialize the database
        courierRepository.saveAndFlush(courier);

        int databaseSizeBeforeUpdate = courierRepository.findAll().size();

        // Update the courier
        Courier updatedCourier = courierRepository.findById(courier.getId()).get();
        // Disconnect from session so that the updates on updatedCourier are not directly saved in db
        em.detach(updatedCourier);
        updatedCourier
            .notation(UPDATED_NOTATION)
            .latitude(UPDATED_LATITUDE)
            .longitude(UPDATED_LONGITUDE);

        restCourierMockMvc.perform(put("/api/couriers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCourier)))
            .andExpect(status().isOk());

        // Validate the Courier in the database
        List<Courier> courierList = courierRepository.findAll();
        assertThat(courierList).hasSize(databaseSizeBeforeUpdate);
        Courier testCourier = courierList.get(courierList.size() - 1);
        assertThat(testCourier.getNotation()).isEqualTo(UPDATED_NOTATION);
        assertThat(testCourier.getLatitude()).isEqualTo(UPDATED_LATITUDE);
        assertThat(testCourier.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
    }

    @Test
    @Transactional
    public void updateNonExistingCourier() throws Exception {
        int databaseSizeBeforeUpdate = courierRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCourierMockMvc.perform(put("/api/couriers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(courier)))
            .andExpect(status().isBadRequest());

        // Validate the Courier in the database
        List<Courier> courierList = courierRepository.findAll();
        assertThat(courierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCourier() throws Exception {
        // Initialize the database
        courierRepository.saveAndFlush(courier);

        int databaseSizeBeforeDelete = courierRepository.findAll().size();

        // Delete the courier
        restCourierMockMvc.perform(delete("/api/couriers/{id}", courier.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Courier> courierList = courierRepository.findAll();
        assertThat(courierList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
