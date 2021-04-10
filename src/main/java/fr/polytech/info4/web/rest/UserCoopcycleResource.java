package fr.polytech.info4.web.rest;

import fr.polytech.info4.domain.UserCoopcycle;
import fr.polytech.info4.repository.UserCoopcycleRepository;
import fr.polytech.info4.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link fr.polytech.info4.domain.UserCoopcycle}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class UserCoopcycleResource {

    private final Logger log = LoggerFactory.getLogger(UserCoopcycleResource.class);

    private static final String ENTITY_NAME = "userCoopcycle";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserCoopcycleRepository userCoopcycleRepository;

    public UserCoopcycleResource(UserCoopcycleRepository userCoopcycleRepository) {
        this.userCoopcycleRepository = userCoopcycleRepository;
    }

    /**
     * {@code POST  /user-coopcycles} : Create a new userCoopcycle.
     *
     * @param userCoopcycle the userCoopcycle to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userCoopcycle, or with status {@code 400 (Bad Request)} if the userCoopcycle has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-coopcycles")
    public ResponseEntity<UserCoopcycle> createUserCoopcycle(@Valid @RequestBody UserCoopcycle userCoopcycle) throws URISyntaxException {
        log.debug("REST request to save UserCoopcycle : {}", userCoopcycle);
        if (userCoopcycle.getId() != null) {
            throw new BadRequestAlertException("A new userCoopcycle cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserCoopcycle result = userCoopcycleRepository.save(userCoopcycle);
        return ResponseEntity.created(new URI("/api/user-coopcycles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-coopcycles} : Updates an existing userCoopcycle.
     *
     * @param userCoopcycle the userCoopcycle to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userCoopcycle,
     * or with status {@code 400 (Bad Request)} if the userCoopcycle is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userCoopcycle couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-coopcycles")
    public ResponseEntity<UserCoopcycle> updateUserCoopcycle(@Valid @RequestBody UserCoopcycle userCoopcycle) throws URISyntaxException {
        log.debug("REST request to update UserCoopcycle : {}", userCoopcycle);
        if (userCoopcycle.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserCoopcycle result = userCoopcycleRepository.save(userCoopcycle);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userCoopcycle.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /user-coopcycles} : get all the userCoopcycles.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userCoopcycles in body.
     */
    @GetMapping("/user-coopcycles")
    public List<UserCoopcycle> getAllUserCoopcycles(@RequestParam(required = false) String filter) {
        if ("courier-is-null".equals(filter)) {
            log.debug("REST request to get all UserCoopcycles where courier is null");
            return StreamSupport
                .stream(userCoopcycleRepository.findAll().spliterator(), false)
                .filter(userCoopcycle -> userCoopcycle.getCourier() == null)
                .collect(Collectors.toList());
        }
        if ("client-is-null".equals(filter)) {
            log.debug("REST request to get all UserCoopcycles where client is null");
            return StreamSupport
                .stream(userCoopcycleRepository.findAll().spliterator(), false)
                .filter(userCoopcycle -> userCoopcycle.getClient() == null)
                .collect(Collectors.toList());
        }
        if ("merchant-is-null".equals(filter)) {
            log.debug("REST request to get all UserCoopcycles where merchant is null");
            return StreamSupport
                .stream(userCoopcycleRepository.findAll().spliterator(), false)
                .filter(userCoopcycle -> userCoopcycle.getMerchant() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all UserCoopcycles");
        return userCoopcycleRepository.findAll();
    }

    /**
     * {@code GET  /user-coopcycles/:id} : get the "id" userCoopcycle.
     *
     * @param id the id of the userCoopcycle to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userCoopcycle, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-coopcycles/{id}")
    public ResponseEntity<UserCoopcycle> getUserCoopcycle(@PathVariable Long id) {
        log.debug("REST request to get UserCoopcycle : {}", id);
        Optional<UserCoopcycle> userCoopcycle = userCoopcycleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userCoopcycle);
    }

    /**
     * {@code DELETE  /user-coopcycles/:id} : delete the "id" userCoopcycle.
     *
     * @param id the id of the userCoopcycle to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-coopcycles/{id}")
    public ResponseEntity<Void> deleteUserCoopcycle(@PathVariable Long id) {
        log.debug("REST request to delete UserCoopcycle : {}", id);
        userCoopcycleRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
