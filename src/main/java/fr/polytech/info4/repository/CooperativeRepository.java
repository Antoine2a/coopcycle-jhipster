package fr.polytech.info4.repository;

import fr.polytech.info4.domain.Cooperative;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Cooperative entity.
 */
@Repository
public interface CooperativeRepository extends JpaRepository<Cooperative, Long> {

    @Query(value = "select distinct cooperative from Cooperative cooperative left join fetch cooperative.commerce",
        countQuery = "select count(distinct cooperative) from Cooperative cooperative")
    Page<Cooperative> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct cooperative from Cooperative cooperative left join fetch cooperative.commerce")
    List<Cooperative> findAllWithEagerRelationships();

    @Query("select cooperative from Cooperative cooperative left join fetch cooperative.commerce where cooperative.id =:id")
    Optional<Cooperative> findOneWithEagerRelationships(@Param("id") Long id);
}
