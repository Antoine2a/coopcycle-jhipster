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
 * A Product.
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "price", nullable = false)
    private Float price;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "product_basket",
               joinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "basket_id", referencedColumnName = "id"))
    private Set<Basket> baskets = new HashSet<>();

    @ManyToMany(mappedBy = "products")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Commerce> commerce = new HashSet<>();

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

    public Product name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Product description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Float getPrice() {
        return price;
    }

    public Product price(Float price) {
        this.price = price;
        return this;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Set<Basket> getBaskets() {
        return baskets;
    }

    public Product baskets(Set<Basket> baskets) {
        this.baskets = baskets;
        return this;
    }

    public Product addBasket(Basket basket) {
        this.baskets.add(basket);
        basket.getProducts().add(this);
        return this;
    }

    public Product removeBasket(Basket basket) {
        this.baskets.remove(basket);
        basket.getProducts().remove(this);
        return this;
    }

    public void setBaskets(Set<Basket> baskets) {
        this.baskets = baskets;
    }

    public Set<Commerce> getCommerce() {
        return commerce;
    }

    public Product commerce(Set<Commerce> commerce) {
        this.commerce = commerce;
        return this;
    }

    public Product addCommerce(Commerce commerce) {
        this.commerce.add(commerce);
        commerce.getProducts().add(this);
        return this;
    }

    public Product removeCommerce(Commerce commerce) {
        this.commerce.remove(commerce);
        commerce.getProducts().remove(this);
        return this;
    }

    public void setCommerce(Set<Commerce> commerce) {
        this.commerce = commerce;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", price=" + getPrice() +
            "}";
    }
}
