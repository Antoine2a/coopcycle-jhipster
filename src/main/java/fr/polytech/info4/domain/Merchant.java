package fr.polytech.info4.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Merchant.
 */
@Entity
@Table(name = "merchant")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Merchant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private UserCoopcycle userCoopcycle;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserCoopcycle getUserCoopcycle() {
        return userCoopcycle;
    }

    public Merchant userCoopcycle(UserCoopcycle userCoopcycle) {
        this.userCoopcycle = userCoopcycle;
        return this;
    }

    public void setUserCoopcycle(UserCoopcycle userCoopcycle) {
        this.userCoopcycle = userCoopcycle;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Merchant)) {
            return false;
        }
        return id != null && id.equals(((Merchant) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Merchant{" +
            "id=" + getId() +
            "}";
    }
}
