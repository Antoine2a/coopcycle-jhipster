package fr.polytech.info4.web.rest;

import fr.polytech.info4.MyblogApp;
import fr.polytech.info4.domain.UserCoopcycle;
import fr.polytech.info4.repository.UserCoopcycleRepository;

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
 * Integration tests for the {@link UserCoopcycleResource} REST controller.
 */
@SpringBootTest(classes = MyblogApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class UserCoopcycleResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SURNAME = "AAAAAAAAAA";
    private static final String UPDATED_SURNAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "loUEq+@B.{a;C";
    private static final String UPDATED_EMAIL = "|h@N,;.y*D#5";

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    @Autowired
    private UserCoopcycleRepository userCoopcycleRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUserCoopcycleMockMvc;

    private UserCoopcycle userCoopcycle;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserCoopcycle createEntity(EntityManager em) {
        UserCoopcycle userCoopcycle = new UserCoopcycle()
            .name(DEFAULT_NAME)
            .surname(DEFAULT_SURNAME)
            .email(DEFAULT_EMAIL)
            .phone(DEFAULT_PHONE);
        return userCoopcycle;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserCoopcycle createUpdatedEntity(EntityManager em) {
        UserCoopcycle userCoopcycle = new UserCoopcycle()
            .name(UPDATED_NAME)
            .surname(UPDATED_SURNAME)
            .email(UPDATED_EMAIL)
            .phone(UPDATED_PHONE);
        return userCoopcycle;
    }

    @BeforeEach
    public void initTest() {
        userCoopcycle = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserCoopcycle() throws Exception {
        int databaseSizeBeforeCreate = userCoopcycleRepository.findAll().size();
        // Create the UserCoopcycle
        restUserCoopcycleMockMvc.perform(post("/api/user-coopcycles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userCoopcycle)))
            .andExpect(status().isCreated());

        // Validate the UserCoopcycle in the database
        List<UserCoopcycle> userCoopcycleList = userCoopcycleRepository.findAll();
        assertThat(userCoopcycleList).hasSize(databaseSizeBeforeCreate + 1);
        UserCoopcycle testUserCoopcycle = userCoopcycleList.get(userCoopcycleList.size() - 1);
        assertThat(testUserCoopcycle.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testUserCoopcycle.getSurname()).isEqualTo(DEFAULT_SURNAME);
        assertThat(testUserCoopcycle.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testUserCoopcycle.getPhone()).isEqualTo(DEFAULT_PHONE);
    }

    @Test
    @Transactional
    public void createUserCoopcycleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userCoopcycleRepository.findAll().size();

        // Create the UserCoopcycle with an existing ID
        userCoopcycle.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserCoopcycleMockMvc.perform(post("/api/user-coopcycles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userCoopcycle)))
            .andExpect(status().isBadRequest());

        // Validate the UserCoopcycle in the database
        List<UserCoopcycle> userCoopcycleList = userCoopcycleRepository.findAll();
        assertThat(userCoopcycleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = userCoopcycleRepository.findAll().size();
        // set the field null
        userCoopcycle.setName(null);

        // Create the UserCoopcycle, which fails.


        restUserCoopcycleMockMvc.perform(post("/api/user-coopcycles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userCoopcycle)))
            .andExpect(status().isBadRequest());

        List<UserCoopcycle> userCoopcycleList = userCoopcycleRepository.findAll();
        assertThat(userCoopcycleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSurnameIsRequired() throws Exception {
        int databaseSizeBeforeTest = userCoopcycleRepository.findAll().size();
        // set the field null
        userCoopcycle.setSurname(null);

        // Create the UserCoopcycle, which fails.


        restUserCoopcycleMockMvc.perform(post("/api/user-coopcycles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userCoopcycle)))
            .andExpect(status().isBadRequest());

        List<UserCoopcycle> userCoopcycleList = userCoopcycleRepository.findAll();
        assertThat(userCoopcycleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = userCoopcycleRepository.findAll().size();
        // set the field null
        userCoopcycle.setEmail(null);

        // Create the UserCoopcycle, which fails.


        restUserCoopcycleMockMvc.perform(post("/api/user-coopcycles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userCoopcycle)))
            .andExpect(status().isBadRequest());

        List<UserCoopcycle> userCoopcycleList = userCoopcycleRepository.findAll();
        assertThat(userCoopcycleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUserCoopcycles() throws Exception {
        // Initialize the database
        userCoopcycleRepository.saveAndFlush(userCoopcycle);

        // Get all the userCoopcycleList
        restUserCoopcycleMockMvc.perform(get("/api/user-coopcycles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userCoopcycle.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].surname").value(hasItem(DEFAULT_SURNAME)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE)));
    }
    
    @Test
    @Transactional
    public void getUserCoopcycle() throws Exception {
        // Initialize the database
        userCoopcycleRepository.saveAndFlush(userCoopcycle);

        // Get the userCoopcycle
        restUserCoopcycleMockMvc.perform(get("/api/user-coopcycles/{id}", userCoopcycle.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(userCoopcycle.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.surname").value(DEFAULT_SURNAME))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE));
    }
    @Test
    @Transactional
    public void getNonExistingUserCoopcycle() throws Exception {
        // Get the userCoopcycle
        restUserCoopcycleMockMvc.perform(get("/api/user-coopcycles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserCoopcycle() throws Exception {
        // Initialize the database
        userCoopcycleRepository.saveAndFlush(userCoopcycle);

        int databaseSizeBeforeUpdate = userCoopcycleRepository.findAll().size();

        // Update the userCoopcycle
        UserCoopcycle updatedUserCoopcycle = userCoopcycleRepository.findById(userCoopcycle.getId()).get();
        // Disconnect from session so that the updates on updatedUserCoopcycle are not directly saved in db
        em.detach(updatedUserCoopcycle);
        updatedUserCoopcycle
            .name(UPDATED_NAME)
            .surname(UPDATED_SURNAME)
            .email(UPDATED_EMAIL)
            .phone(UPDATED_PHONE);

        restUserCoopcycleMockMvc.perform(put("/api/user-coopcycles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserCoopcycle)))
            .andExpect(status().isOk());

        // Validate the UserCoopcycle in the database
        List<UserCoopcycle> userCoopcycleList = userCoopcycleRepository.findAll();
        assertThat(userCoopcycleList).hasSize(databaseSizeBeforeUpdate);
        UserCoopcycle testUserCoopcycle = userCoopcycleList.get(userCoopcycleList.size() - 1);
        assertThat(testUserCoopcycle.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testUserCoopcycle.getSurname()).isEqualTo(UPDATED_SURNAME);
        assertThat(testUserCoopcycle.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testUserCoopcycle.getPhone()).isEqualTo(UPDATED_PHONE);
    }

    @Test
    @Transactional
    public void updateNonExistingUserCoopcycle() throws Exception {
        int databaseSizeBeforeUpdate = userCoopcycleRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserCoopcycleMockMvc.perform(put("/api/user-coopcycles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userCoopcycle)))
            .andExpect(status().isBadRequest());

        // Validate the UserCoopcycle in the database
        List<UserCoopcycle> userCoopcycleList = userCoopcycleRepository.findAll();
        assertThat(userCoopcycleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserCoopcycle() throws Exception {
        // Initialize the database
        userCoopcycleRepository.saveAndFlush(userCoopcycle);

        int databaseSizeBeforeDelete = userCoopcycleRepository.findAll().size();

        // Delete the userCoopcycle
        restUserCoopcycleMockMvc.perform(delete("/api/user-coopcycles/{id}", userCoopcycle.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserCoopcycle> userCoopcycleList = userCoopcycleRepository.findAll();
        assertThat(userCoopcycleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
