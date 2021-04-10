package fr.polytech.info4.web.rest;

import fr.polytech.info4.MyblogApp;
import fr.polytech.info4.domain.Commerce;
import fr.polytech.info4.repository.CommerceRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.polytech.info4.domain.enumeration.TypeCommerce;
/**
 * Integration tests for the {@link CommerceResource} REST controller.
 */
@SpringBootTest(classes = MyblogApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class CommerceResourceIT {

    private static final String DEFAULT_ADRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADRESS = "BBBBBBBBBB";

    private static final Integer DEFAULT_NOTATION_COMMERCE = 1;
    private static final Integer UPDATED_NOTATION_COMMERCE = 2;

    private static final TypeCommerce DEFAULT_TYPE = TypeCommerce.Tacos;
    private static final TypeCommerce UPDATED_TYPE = TypeCommerce.Pizzeria;

    @Autowired
    private CommerceRepository commerceRepository;

    @Mock
    private CommerceRepository commerceRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCommerceMockMvc;

    private Commerce commerce;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Commerce createEntity(EntityManager em) {
        Commerce commerce = new Commerce()
            .adress(DEFAULT_ADRESS)
            .notationCommerce(DEFAULT_NOTATION_COMMERCE)
            .type(DEFAULT_TYPE);
        return commerce;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Commerce createUpdatedEntity(EntityManager em) {
        Commerce commerce = new Commerce()
            .adress(UPDATED_ADRESS)
            .notationCommerce(UPDATED_NOTATION_COMMERCE)
            .type(UPDATED_TYPE);
        return commerce;
    }

    @BeforeEach
    public void initTest() {
        commerce = createEntity(em);
    }

    @Test
    @Transactional
    public void createCommerce() throws Exception {
        int databaseSizeBeforeCreate = commerceRepository.findAll().size();
        // Create the Commerce
        restCommerceMockMvc.perform(post("/api/commerce")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commerce)))
            .andExpect(status().isCreated());

        // Validate the Commerce in the database
        List<Commerce> commerceList = commerceRepository.findAll();
        assertThat(commerceList).hasSize(databaseSizeBeforeCreate + 1);
        Commerce testCommerce = commerceList.get(commerceList.size() - 1);
        assertThat(testCommerce.getAdress()).isEqualTo(DEFAULT_ADRESS);
        assertThat(testCommerce.getNotationCommerce()).isEqualTo(DEFAULT_NOTATION_COMMERCE);
        assertThat(testCommerce.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createCommerceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = commerceRepository.findAll().size();

        // Create the Commerce with an existing ID
        commerce.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommerceMockMvc.perform(post("/api/commerce")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commerce)))
            .andExpect(status().isBadRequest());

        // Validate the Commerce in the database
        List<Commerce> commerceList = commerceRepository.findAll();
        assertThat(commerceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCommerce() throws Exception {
        // Initialize the database
        commerceRepository.saveAndFlush(commerce);

        // Get all the commerceList
        restCommerceMockMvc.perform(get("/api/commerce?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(commerce.getId().intValue())))
            .andExpect(jsonPath("$.[*].adress").value(hasItem(DEFAULT_ADRESS)))
            .andExpect(jsonPath("$.[*].notationCommerce").value(hasItem(DEFAULT_NOTATION_COMMERCE)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllCommerceWithEagerRelationshipsIsEnabled() throws Exception {
        when(commerceRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restCommerceMockMvc.perform(get("/api/commerce?eagerload=true"))
            .andExpect(status().isOk());

        verify(commerceRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllCommerceWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(commerceRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restCommerceMockMvc.perform(get("/api/commerce?eagerload=true"))
            .andExpect(status().isOk());

        verify(commerceRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getCommerce() throws Exception {
        // Initialize the database
        commerceRepository.saveAndFlush(commerce);

        // Get the commerce
        restCommerceMockMvc.perform(get("/api/commerce/{id}", commerce.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(commerce.getId().intValue()))
            .andExpect(jsonPath("$.adress").value(DEFAULT_ADRESS))
            .andExpect(jsonPath("$.notationCommerce").value(DEFAULT_NOTATION_COMMERCE))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCommerce() throws Exception {
        // Get the commerce
        restCommerceMockMvc.perform(get("/api/commerce/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCommerce() throws Exception {
        // Initialize the database
        commerceRepository.saveAndFlush(commerce);

        int databaseSizeBeforeUpdate = commerceRepository.findAll().size();

        // Update the commerce
        Commerce updatedCommerce = commerceRepository.findById(commerce.getId()).get();
        // Disconnect from session so that the updates on updatedCommerce are not directly saved in db
        em.detach(updatedCommerce);
        updatedCommerce
            .adress(UPDATED_ADRESS)
            .notationCommerce(UPDATED_NOTATION_COMMERCE)
            .type(UPDATED_TYPE);

        restCommerceMockMvc.perform(put("/api/commerce")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCommerce)))
            .andExpect(status().isOk());

        // Validate the Commerce in the database
        List<Commerce> commerceList = commerceRepository.findAll();
        assertThat(commerceList).hasSize(databaseSizeBeforeUpdate);
        Commerce testCommerce = commerceList.get(commerceList.size() - 1);
        assertThat(testCommerce.getAdress()).isEqualTo(UPDATED_ADRESS);
        assertThat(testCommerce.getNotationCommerce()).isEqualTo(UPDATED_NOTATION_COMMERCE);
        assertThat(testCommerce.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingCommerce() throws Exception {
        int databaseSizeBeforeUpdate = commerceRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommerceMockMvc.perform(put("/api/commerce")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commerce)))
            .andExpect(status().isBadRequest());

        // Validate the Commerce in the database
        List<Commerce> commerceList = commerceRepository.findAll();
        assertThat(commerceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCommerce() throws Exception {
        // Initialize the database
        commerceRepository.saveAndFlush(commerce);

        int databaseSizeBeforeDelete = commerceRepository.findAll().size();

        // Delete the commerce
        restCommerceMockMvc.perform(delete("/api/commerce/{id}", commerce.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Commerce> commerceList = commerceRepository.findAll();
        assertThat(commerceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
