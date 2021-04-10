package fr.polytech.info4.web.rest;

import fr.polytech.info4.MyblogApp;
import fr.polytech.info4.domain.Merchant;
import fr.polytech.info4.repository.MerchantRepository;

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
 * Integration tests for the {@link MerchantResource} REST controller.
 */
@SpringBootTest(classes = MyblogApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class MerchantResourceIT {

    @Autowired
    private MerchantRepository merchantRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMerchantMockMvc;

    private Merchant merchant;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Merchant createEntity(EntityManager em) {
        Merchant merchant = new Merchant();
        return merchant;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Merchant createUpdatedEntity(EntityManager em) {
        Merchant merchant = new Merchant();
        return merchant;
    }

    @BeforeEach
    public void initTest() {
        merchant = createEntity(em);
    }

    @Test
    @Transactional
    public void createMerchant() throws Exception {
        int databaseSizeBeforeCreate = merchantRepository.findAll().size();
        // Create the Merchant
        restMerchantMockMvc.perform(post("/api/merchants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(merchant)))
            .andExpect(status().isCreated());

        // Validate the Merchant in the database
        List<Merchant> merchantList = merchantRepository.findAll();
        assertThat(merchantList).hasSize(databaseSizeBeforeCreate + 1);
        Merchant testMerchant = merchantList.get(merchantList.size() - 1);
    }

    @Test
    @Transactional
    public void createMerchantWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = merchantRepository.findAll().size();

        // Create the Merchant with an existing ID
        merchant.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMerchantMockMvc.perform(post("/api/merchants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(merchant)))
            .andExpect(status().isBadRequest());

        // Validate the Merchant in the database
        List<Merchant> merchantList = merchantRepository.findAll();
        assertThat(merchantList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMerchants() throws Exception {
        // Initialize the database
        merchantRepository.saveAndFlush(merchant);

        // Get all the merchantList
        restMerchantMockMvc.perform(get("/api/merchants?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(merchant.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getMerchant() throws Exception {
        // Initialize the database
        merchantRepository.saveAndFlush(merchant);

        // Get the merchant
        restMerchantMockMvc.perform(get("/api/merchants/{id}", merchant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(merchant.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingMerchant() throws Exception {
        // Get the merchant
        restMerchantMockMvc.perform(get("/api/merchants/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMerchant() throws Exception {
        // Initialize the database
        merchantRepository.saveAndFlush(merchant);

        int databaseSizeBeforeUpdate = merchantRepository.findAll().size();

        // Update the merchant
        Merchant updatedMerchant = merchantRepository.findById(merchant.getId()).get();
        // Disconnect from session so that the updates on updatedMerchant are not directly saved in db
        em.detach(updatedMerchant);

        restMerchantMockMvc.perform(put("/api/merchants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMerchant)))
            .andExpect(status().isOk());

        // Validate the Merchant in the database
        List<Merchant> merchantList = merchantRepository.findAll();
        assertThat(merchantList).hasSize(databaseSizeBeforeUpdate);
        Merchant testMerchant = merchantList.get(merchantList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingMerchant() throws Exception {
        int databaseSizeBeforeUpdate = merchantRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMerchantMockMvc.perform(put("/api/merchants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(merchant)))
            .andExpect(status().isBadRequest());

        // Validate the Merchant in the database
        List<Merchant> merchantList = merchantRepository.findAll();
        assertThat(merchantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMerchant() throws Exception {
        // Initialize the database
        merchantRepository.saveAndFlush(merchant);

        int databaseSizeBeforeDelete = merchantRepository.findAll().size();

        // Delete the merchant
        restMerchantMockMvc.perform(delete("/api/merchants/{id}", merchant.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Merchant> merchantList = merchantRepository.findAll();
        assertThat(merchantList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
