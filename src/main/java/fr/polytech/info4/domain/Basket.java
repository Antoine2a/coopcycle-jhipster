package fr.polytech.info4.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Basket.
 */
@Entity
@Table(name = "basket")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Basket implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "totalprice")
    private Integer totalprice;

    @Column(name = "destination")
    private String destination;

    @OneToMany(mappedBy = "basket")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Course> courses = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "baskets", allowSetters = true)
    private UserCoopcycle userCoopcycle;

    @ManyToOne
    @JsonIgnoreProperties(value = "baskets", allowSetters = true)
    private Commerce commerce;

    @ManyToMany(mappedBy = "baskets")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Product> products = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTotalprice() {
        return totalprice;
    }

    public Basket totalprice(Integer totalprice) {
        this.totalprice = totalprice;
        return this;
    }

    public void setTotalprice(Integer totalprice) {
        this.totalprice = totalprice;
    }

    public String getDestination() {
        return destination;
    }

    public Basket destination(String destination) {
        this.destination = destination;
        return this;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Set<Course> getCourses() {
        return courses;
    }

    public Basket courses(Set<Course> courses) {
        this.courses = courses;
        return this;
    }

    public Basket addCourse(Course course) {
        this.courses.add(course);
        course.setBasket(this);
        return this;
    }

    public Basket removeCourse(Course course) {
        this.courses.remove(course);
        course.setBasket(null);
        return this;
    }

    public void setCourses(Set<Course> courses) {
        this.courses = courses;
    }

    public UserCoopcycle getUserCoopcycle() {
        return userCoopcycle;
    }

    public Basket userCoopcycle(UserCoopcycle userCoopcycle) {
        this.userCoopcycle = userCoopcycle;
        return this;
    }

    public void setUserCoopcycle(UserCoopcycle userCoopcycle) {
        this.userCoopcycle = userCoopcycle;
    }

    public Commerce getCommerce() {
        return commerce;
    }

    public Basket commerce(Commerce commerce) {
        this.commerce = commerce;
        return this;
    }

    public void setCommerce(Commerce commerce) {
        this.commerce = commerce;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public Basket products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public Basket addProduct(Product product) {
        this.products.add(product);
        product.getBaskets().add(this);
        return this;
    }

    public Basket removeProduct(Product product) {
        this.products.remove(product);
        product.getBaskets().remove(this);
        return this;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Basket)) {
            return false;
        }
        return id != null && id.equals(((Basket) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Basket{" +
            "id=" + getId() +
            ", totalprice=" + getTotalprice() +
            ", destination='" + getDestination() + "'" +
            "}";
    }
}
