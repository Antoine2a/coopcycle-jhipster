package fr.polytech.info4.repository;

import fr.polytech.info4.domain.UserCoopcycle;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the UserCoopcycle entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserCoopcycleRepository extends JpaRepository<UserCoopcycle, Long> {
}
