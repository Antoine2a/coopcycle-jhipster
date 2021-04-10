package fr.polytech.info4.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Cooperative.
 */
@Entity
@Table(name = "cooperative")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Cooperative implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "adress")
    private String adress;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "cooperative_commerce",
               joinColumns = @JoinColumn(name = "cooperative_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "commerce_id", referencedColumnName = "id"))
    private Set<Commerce> commerce = new HashSet<>();

    @OneToOne(mappedBy = "cooperative")
    @JsonIgnore
    private UserCoopcycle userCoopcycle;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAdress() {
        return adress;
    }

    public Cooperative adress(String adress) {
        this.adress = adress;
        return this;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public Set<Commerce> getCommerce() {
        return commerce;
    }

    public Cooperative commerce(Set<Commerce> commerce) {
        this.commerce = commerce;
        return this;
    }

    public Cooperative addCommerce(Commerce commerce) {
        this.commerce.add(commerce);
        commerce.getCooperatives().add(this);
        return this;
    }

    public Cooperative removeCommerce(Commerce commerce) {
        this.commerce.remove(commerce);
        commerce.getCooperatives().remove(this);
        return this;
    }

    public void setCommerce(Set<Commerce> commerce) {
        this.commerce = commerce;
    }

    public UserCoopcycle getUserCoopcycle() {
        return userCoopcycle;
    }

    public Cooperative userCoopcycle(UserCoopcycle userCoopcycle) {
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
        if (!(o instanceof Cooperative)) {
            return false;
        }
        return id != null && id.equals(((Cooperative) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Cooperative{" +
            "id=" + getId() +
            ", adress='" + getAdress() + "'" +
            "}";
    }
}
