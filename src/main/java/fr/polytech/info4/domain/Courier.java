package fr.polytech.info4.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Courier.
 */
@Entity
@Table(name = "courier")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Courier implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "notation")
    private Integer notation;

    @Column(name = "latitude")
    private Float latitude;

    @Column(name = "longitude")
    private Float longitude;

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

    public Integer getNotation() {
        return notation;
    }

    public Courier notation(Integer notation) {
        this.notation = notation;
        return this;
    }

    public void setNotation(Integer notation) {
        this.notation = notation;
    }

    public Float getLatitude() {
        return latitude;
    }

    public Courier latitude(Float latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(Float latitude) {
        this.latitude = latitude;
    }

    public Float getLongitude() {
        return longitude;
    }

    public Courier longitude(Float longitude) {
        this.longitude = longitude;
        return this;
    }

    public void setLongitude(Float longitude) {
        this.longitude = longitude;
    }

    public UserCoopcycle getUserCoopcycle() {
        return userCoopcycle;
    }

    public Courier userCoopcycle(UserCoopcycle userCoopcycle) {
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
        if (!(o instanceof Courier)) {
            return false;
        }
        return id != null && id.equals(((Courier) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Courier{" +
            "id=" + getId() +
            ", notation=" + getNotation() +
            ", latitude=" + getLatitude() +
            ", longitude=" + getLongitude() +
            "}";
    }
}
