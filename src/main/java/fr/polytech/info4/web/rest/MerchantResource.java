package fr.polytech.info4.web.rest;

import fr.polytech.info4.domain.Merchant;
import fr.polytech.info4.repository.MerchantRepository;
import fr.polytech.info4.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link fr.polytech.info4.domain.Merchant}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MerchantResource {

    private final Logger log = LoggerFactory.getLogger(MerchantResource.class);

    private static final String ENTITY_NAME = "merchant";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MerchantRepository merchantRepository;

    public MerchantResource(MerchantRepository merchantRepository) {
        this.merchantRepository = merchantRepository;
    }

    /**
     * {@code POST  /merchants} : Create a new merchant.
     *
     * @param merchant the merchant to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new merchant, or with status {@code 400 (Bad Request)} if the merchant has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/merchants")
    public ResponseEntity<Merchant> createMerchant(@RequestBody Merchant merchant) throws URISyntaxException {
        log.debug("REST request to save Merchant : {}", merchant);
        if (merchant.getId() != null) {
            throw new BadRequestAlertException("A new merchant cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Merchant result = merchantRepository.save(merchant);
        return ResponseEntity.created(new URI("/api/merchants/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /merchants} : Updates an existing merchant.
     *
     * @param merchant the merchant to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated merchant,
     * or with status {@code 400 (Bad Request)} if the merchant is not valid,
     * or with status {@code 500 (Internal Server Error)} if the merchant couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/merchants")
    public ResponseEntity<Merchant> updateMerchant(@RequestBody Merchant merchant) throws URISyntaxException {
        log.debug("REST request to update Merchant : {}", merchant);
        if (merchant.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Merchant result = merchantRepository.save(merchant);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, merchant.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /merchants} : get all the merchants.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of merchants in body.
     */
    @GetMapping("/merchants")
    public List<Merchant> getAllMerchants() {
        log.debug("REST request to get all Merchants");
        return merchantRepository.findAll();
    }

    /**
     * {@code GET  /merchants/:id} : get the "id" merchant.
     *
     * @param id the id of the merchant to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the merchant, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/merchants/{id}")
    public ResponseEntity<Merchant> getMerchant(@PathVariable Long id) {
        log.debug("REST request to get Merchant : {}", id);
        Optional<Merchant> merchant = merchantRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(merchant);
    }

    /**
     * {@code DELETE  /merchants/:id} : delete the "id" merchant.
     *
     * @param id the id of the merchant to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/merchants/{id}")
    public ResponseEntity<Void> deleteMerchant(@PathVariable Long id) {
        log.debug("REST request to delete Merchant : {}", id);
        merchantRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
