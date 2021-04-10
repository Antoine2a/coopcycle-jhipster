package fr.polytech.info4.repository;

import fr.polytech.info4.domain.Commerce;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Commerce entity.
 */
@Repository
public interface CommerceRepository extends JpaRepository<Commerce, Long> {

    @Query(value = "select distinct commerce from Commerce commerce left join fetch commerce.products",
        countQuery = "select count(distinct commerce) from Commerce commerce")
    Page<Commerce> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct commerce from Commerce commerce left join fetch commerce.products")
    List<Commerce> findAllWithEagerRelationships();

    @Query("select commerce from Commerce commerce left join fetch commerce.products where commerce.id =:id")
    Optional<Commerce> findOneWithEagerRelationships(@Param("id") Long id);
}
