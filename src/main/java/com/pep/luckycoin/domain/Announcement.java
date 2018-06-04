package com.pep.luckycoin.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.pep.luckycoin.domain.enumeration.AnnouncementCategory;

import com.pep.luckycoin.domain.enumeration.Location;

import com.pep.luckycoin.domain.enumeration.Status;

/**
 * Announcement entity.
 * @author PEP.
 */
@ApiModel(description = "Announcement entity. @author PEP.")
@Entity
@Table(name = "announcement")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "announcement")
public class Announcement implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private AnnouncementCategory category;

    @Column(name = "description")
    private String description;

    @Lob
    @Column(name = "photo_1")
    private byte[] photo1;

    @Column(name = "photo_1_content_type")
    private String photo1ContentType;

    @Lob
    @Column(name = "photo_2")
    private byte[] photo2;

    @Column(name = "photo_2_content_type")
    private String photo2ContentType;

    @Lob
    @Column(name = "photo_3")
    private byte[] photo3;

    @Column(name = "photo_3_content_type")
    private String photo3ContentType;

    @Lob
    @Column(name = "photo_4")
    private byte[] photo4;

    @Column(name = "photo_4_content_type")
    private String photo4ContentType;

    @Column(name = "added_date")
    private LocalDate addedDate;

    @Column(name = "finish_date")
    private LocalDate finishDate;

    @NotNull
    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "location", nullable = false)
    private Location location;

    @NotNull
    @Column(name = "price", nullable = false)
    private Long price;

    @Column(name = "minim_price")
    private Long minimPrice;

    @Column(name = "ticket_value")
    private Integer ticketValue;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Column(name = "tickets_number")
    private Long ticketsNumber;

    @Column(name = "tickets_sold")
    private Long ticketsSold;

    @ManyToOne
    private User owner;

    @ManyToOne
    private User winner;

    @OneToMany(mappedBy = "announcement")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Transaction> transactions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Announcement name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public AnnouncementCategory getCategory() {
        return category;
    }

    public Announcement category(AnnouncementCategory category) {
        this.category = category;
        return this;
    }

    public void setCategory(AnnouncementCategory category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public Announcement description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getPhoto1() {
        return photo1;
    }

    public Announcement photo1(byte[] photo1) {
        this.photo1 = photo1;
        return this;
    }

    public void setPhoto1(byte[] photo1) {
        this.photo1 = photo1;
    }

    public String getPhoto1ContentType() {
        return photo1ContentType;
    }

    public Announcement photo1ContentType(String photo1ContentType) {
        this.photo1ContentType = photo1ContentType;
        return this;
    }

    public void setPhoto1ContentType(String photo1ContentType) {
        this.photo1ContentType = photo1ContentType;
    }

    public byte[] getPhoto2() {
        return photo2;
    }

    public Announcement photo2(byte[] photo2) {
        this.photo2 = photo2;
        return this;
    }

    public void setPhoto2(byte[] photo2) {
        this.photo2 = photo2;
    }

    public String getPhoto2ContentType() {
        return photo2ContentType;
    }

    public Announcement photo2ContentType(String photo2ContentType) {
        this.photo2ContentType = photo2ContentType;
        return this;
    }

    public void setPhoto2ContentType(String photo2ContentType) {
        this.photo2ContentType = photo2ContentType;
    }

    public byte[] getPhoto3() {
        return photo3;
    }

    public Announcement photo3(byte[] photo3) {
        this.photo3 = photo3;
        return this;
    }

    public void setPhoto3(byte[] photo3) {
        this.photo3 = photo3;
    }

    public String getPhoto3ContentType() {
        return photo3ContentType;
    }

    public Announcement photo3ContentType(String photo3ContentType) {
        this.photo3ContentType = photo3ContentType;
        return this;
    }

    public void setPhoto3ContentType(String photo3ContentType) {
        this.photo3ContentType = photo3ContentType;
    }

    public byte[] getPhoto4() {
        return photo4;
    }

    public Announcement photo4(byte[] photo4) {
        this.photo4 = photo4;
        return this;
    }

    public void setPhoto4(byte[] photo4) {
        this.photo4 = photo4;
    }

    public String getPhoto4ContentType() {
        return photo4ContentType;
    }

    public Announcement photo4ContentType(String photo4ContentType) {
        this.photo4ContentType = photo4ContentType;
        return this;
    }

    public void setPhoto4ContentType(String photo4ContentType) {
        this.photo4ContentType = photo4ContentType;
    }

    public LocalDate getAddedDate() {
        return addedDate;
    }

    public Announcement addedDate(LocalDate addedDate) {
        this.addedDate = addedDate;
        return this;
    }

    public void setAddedDate(LocalDate addedDate) {
        this.addedDate = addedDate;
    }

    public LocalDate getFinishDate() {
        return finishDate;
    }

    public Announcement finishDate(LocalDate finishDate) {
        this.finishDate = finishDate;
        return this;
    }

    public void setFinishDate(LocalDate finishDate) {
        this.finishDate = finishDate;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Announcement phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Location getLocation() {
        return location;
    }

    public Announcement location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Long getPrice() {
        return price;
    }

    public Announcement price(Long price) {
        this.price = price;
        return this;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Long getMinimPrice() {
        return minimPrice;
    }

    public Announcement minimPrice(Long minimPrice) {
        this.minimPrice = minimPrice;
        return this;
    }

    public void setMinimPrice(Long minimPrice) {
        this.minimPrice = minimPrice;
    }

    public Integer getTicketValue() {
        return ticketValue;
    }

    public Announcement ticketValue(Integer ticketValue) {
        this.ticketValue = ticketValue;
        return this;
    }

    public void setTicketValue(Integer ticketValue) {
        this.ticketValue = ticketValue;
    }

    public Status getStatus() {
        return status;
    }

    public Announcement status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Long getTicketsNumber() {
        return ticketsNumber;
    }

    public Announcement ticketsNumber(Long ticketsNumber) {
        this.ticketsNumber = ticketsNumber;
        return this;
    }

    public void setTicketsNumber(Long ticketsNumber) {
        this.ticketsNumber = ticketsNumber;
    }

    public Long getTicketsSold() {
        return ticketsSold;
    }

    public Announcement ticketsSold(Long ticketsSold) {
        this.ticketsSold = ticketsSold;
        return this;
    }

    public void setTicketsSold(Long ticketsSold) {
        this.ticketsSold = ticketsSold;
    }

    public User getOwner() {
        return owner;
    }

    public Announcement owner(User user) {
        this.owner = user;
        return this;
    }

    public void setOwner(User user) {
        this.owner = user;
    }

    public User getWinner() {
        return winner;
    }

    public Announcement winner(User user) {
        this.winner = user;
        return this;
    }

    public void setWinner(User user) {
        this.winner = user;
    }

    public Set<Transaction> getTransactions() {
        return transactions;
    }

    public Announcement transactions(Set<Transaction> transactions) {
        this.transactions = transactions;
        return this;
    }

    public Announcement addTransactions(Transaction transaction) {
        this.transactions.add(transaction);
        transaction.setAnnouncement(this);
        return this;
    }

    public Announcement removeTransactions(Transaction transaction) {
        this.transactions.remove(transaction);
        transaction.setAnnouncement(null);
        return this;
    }

    public void setTransactions(Set<Transaction> transactions) {
        this.transactions = transactions;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Announcement announcement = (Announcement) o;
        if (announcement.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), announcement.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Announcement{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", category='" + getCategory() + "'" +
            ", description='" + getDescription() + "'" +
            ", photo1='" + getPhoto1() + "'" +
            ", photo1ContentType='" + getPhoto1ContentType() + "'" +
            ", photo2='" + getPhoto2() + "'" +
            ", photo2ContentType='" + getPhoto2ContentType() + "'" +
            ", photo3='" + getPhoto3() + "'" +
            ", photo3ContentType='" + getPhoto3ContentType() + "'" +
            ", photo4='" + getPhoto4() + "'" +
            ", photo4ContentType='" + getPhoto4ContentType() + "'" +
            ", addedDate='" + getAddedDate() + "'" +
            ", finishDate='" + getFinishDate() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", location='" + getLocation() + "'" +
            ", price=" + getPrice() +
            ", minimPrice=" + getMinimPrice() +
            ", ticketValue=" + getTicketValue() +
            ", status='" + getStatus() + "'" +
            ", ticketsNumber=" + getTicketsNumber() +
            ", ticketsSold=" + getTicketsSold() +
            "}";
    }
}
