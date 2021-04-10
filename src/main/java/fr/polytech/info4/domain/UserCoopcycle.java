package fr.polytech.info4.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A UserCoopcycle.
 */
@Entity
@Table(name = "user_coopcycle")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class UserCoopcycle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "surname", nullable = false)
    private String surname;

    @NotNull
    @Pattern(regexp = "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")
    @Column(name = "email", nullable = false)
    private String email;

    @Size(min = 10, max = 10)
    @Column(name = "phone", length = 10)
    private String phone;

    @OneToOne
    @JoinColumn(unique = true)
    private Commerce commerce;

    @OneToOne
    @JoinColumn(unique = true)
    private Cooperative cooperative;

    @OneToMany(mappedBy = "userCoopcycle")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Basket> baskets = new HashSet<>();

    @OneToOne(mappedBy = "userCoopcycle")
    @JsonIgnore
    private Courier courier;

    @OneToOne(mappedBy = "userCoopcycle")
    @JsonIgnore
    private Client client;

    @OneToOne(mappedBy = "userCoopcycle")
    @JsonIgnore
    private Merchant merchant;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public UserCoopcycle name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public UserCoopcycle surname(String surname) {
        this.surname = surname;
        return this;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public UserCoopcycle email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public UserCoopcycle phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Commerce getCommerce() {
        return commerce;
    }

    public UserCoopcycle commerce(Commerce commerce) {
        this.commerce = commerce;
        return this;
    }

    public void setCommerce(Commerce commerce) {
        this.commerce = commerce;
    }

    public Cooperative getCooperative() {
        return cooperative;
    }

    public UserCoopcycle cooperative(Cooperative cooperative) {
        this.cooperative = cooperative;
        return this;
    }

    public void setCooperative(Cooperative cooperative) {
        this.cooperative = cooperative;
    }

    public Set<Basket> getBaskets() {
        return baskets;
    }

    public UserCoopcycle baskets(Set<Basket> baskets) {
        this.baskets = baskets;
        return this;
    }

    public UserCoopcycle addBasket(Basket basket) {
        this.baskets.add(basket);
        basket.setUserCoopcycle(this);
        return this;
    }

    public UserCoopcycle removeBasket(Basket basket) {
        this.baskets.remove(basket);
        basket.setUserCoopcycle(null);
        return this;
    }

    public void setBaskets(Set<Basket> baskets) {
        this.baskets = baskets;
    }

    public Courier getCourier() {
        return courier;
    }

    public UserCoopcycle courier(Courier courier) {
        this.courier = courier;
        return this;
    }

    public void setCourier(Courier courier) {
        this.courier = courier;
    }

    public Client getClient() {
        return client;
    }

    public UserCoopcycle client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Merchant getMerchant() {
        return merchant;
    }

    public UserCoopcycle merchant(Merchant merchant) {
        this.merchant = merchant;
        return this;
    }

    public void setMerchant(Merchant merchant) {
        this.merchant = merchant;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserCoopcycle)) {
            return false;
        }
        return id != null && id.equals(((UserCoopcycle) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserCoopcycle{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", surname='" + getSurname() + "'" +
            ", email='" + getEmail() + "'" +
            ", phone='" + getPhone() + "'" +
            "}";
    }
}
