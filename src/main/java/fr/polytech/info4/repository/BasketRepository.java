package fr.polytech.info4.repository;

import fr.polytech.info4.domain.Basket;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Basket entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BasketRepository extends JpaRepository<Basket, Long> {
}
