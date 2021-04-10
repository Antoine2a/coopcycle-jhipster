package fr.polytech.info4.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import fr.polytech.info4.domain.enumeration.TypeCommerce;

/**
 * A Commerce.
 */
@Entity
@Table(name = "commerce")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Commerce implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "adress")
    private String adress;

    @Column(name = "notation_commerce")
    private Integer notationCommerce;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private TypeCommerce type;

    @OneToMany(mappedBy = "commerce")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Basket> baskets = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "commerce_product",
               joinColumns = @JoinColumn(name = "commerce_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id"))
    private Set<Product> products = new HashSet<>();

    @OneToOne(mappedBy = "commerce")
    @JsonIgnore
    private UserCoopcycle userCoopcycle;

    @ManyToMany(mappedBy = "commerce")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Cooperative> cooperatives = new HashSet<>();

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

    public Commerce adress(String adress) {
        this.adress = adress;
        return this;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public Integer getNotationCommerce() {
        return notationCommerce;
    }

    public Commerce notationCommerce(Integer notationCommerce) {
        this.notationCommerce = notationCommerce;
        return this;
    }

    public void setNotationCommerce(Integer notationCommerce) {
        this.notationCommerce = notationCommerce;
    }

    public TypeCommerce getType() {
        return type;
    }

    public Commerce type(TypeCommerce type) {
        this.type = type;
        return this;
    }

    public void setType(TypeCommerce type) {
        this.type = type;
    }

    public Set<Basket> getBaskets() {
        return baskets;
    }

    public Commerce baskets(Set<Basket> baskets) {
        this.baskets = baskets;
        return this;
    }

    public Commerce addBasket(Basket basket) {
        this.baskets.add(basket);
        basket.setCommerce(this);
        return this;
    }

    public Commerce removeBasket(Basket basket) {
        this.baskets.remove(basket);
        basket.setCommerce(null);
        return this;
    }

    public void setBaskets(Set<Basket> baskets) {
        this.baskets = baskets;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public Commerce products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public Commerce addProduct(Product product) {
        this.products.add(product);
        product.getCommerce().add(this);
        return this;
    }

    public Commerce removeProduct(Product product) {
        this.products.remove(product);
        product.getCommerce().remove(this);
        return this;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    public UserCoopcycle getUserCoopcycle() {
        return userCoopcycle;
    }

    public Commerce userCoopcycle(UserCoopcycle userCoopcycle) {
        this.userCoopcycle = userCoopcycle;
        return this;
    }

    public void setUserCoopcycle(UserCoopcycle userCoopcycle) {
        this.userCoopcycle = userCoopcycle;
    }

    public Set<Cooperative> getCooperatives() {
        return cooperatives;
    }

    public Commerce cooperatives(Set<Cooperative> cooperatives) {
        this.cooperatives = cooperatives;
        return this;
    }

    public Commerce addCooperative(Cooperative cooperative) {
        this.cooperatives.add(cooperative);
        cooperative.getCommerce().add(this);
        return this;
    }

    public Commerce removeCooperative(Cooperative cooperative) {
        this.cooperatives.remove(cooperative);
        cooperative.getCommerce().remove(this);
        return this;
    }

    public void setCooperatives(Set<Cooperative> cooperatives) {
        this.cooperatives = cooperatives;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Commerce)) {
            return false;
        }
        return id != null && id.equals(((Commerce) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Commerce{" +
            "id=" + getId() +
            ", adress='" + getAdress() + "'" +
            ", notationCommerce=" + getNotationCommerce() +
            ", type='" + getType() + "'" +
            "}";
    }
}
