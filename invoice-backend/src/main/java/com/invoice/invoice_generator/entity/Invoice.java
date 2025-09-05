package com.invoice.invoice_generator.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "invoices")
@EntityListeners(AuditingEntityListener.class)
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String clerkId;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "name", column = @Column(name = "company_name")),
            @AttributeOverride(name = "phone", column = @Column(name = "company_phone")),
            @AttributeOverride(name = "address", column = @Column(name = "company_address"))
    })
    private Company company;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "name", column = @Column(name = "billing_name")),
            @AttributeOverride(name = "phone", column = @Column(name = "billing_phone")),
            @AttributeOverride(name = "address", column = @Column(name = "billing_address"))
    })
    private Billing billing;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "name", column = @Column(name = "shipping_name")),
            @AttributeOverride(name = "phone", column = @Column(name = "shipping_phone")),
            @AttributeOverride(name = "address", column = @Column(name = "shipping_address"))
    })
    private Shipping shipping;

    @Embedded
    private InvoiceDetails invoiceDetails;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "invoice_id")
    private List<Item> items;

    private String notes;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String logo;

    private double tax;

    // Auditing fields with annotations
    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime lastUpdatedAt;

    @CreatedBy
    private String createdBy;

    @LastModifiedBy
    private String lastModifiedBy;

    private String thumbnailUrl;
    private String template;
    private String title;

    @Embeddable
    @Data
    public static class Company {
        private String name;
        private String phone;
        private String address;
    }

    @Embeddable
    @Data
    public static class Billing {
        private String name;
        private String phone;
        private String address;
    }

    @Embeddable
    @Data
    public static class Shipping {
        private String name;
        private String phone;
        private String address;
    }

    @Embeddable
    @Data
    public static class InvoiceDetails {
        private String number;
        private String date;
        private String dueDate;
    }

    @Entity
    @Table(name = "invoice_items")
    @Data
    public static class Item {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String name;
        private int qty;
        private double amount;
        private String description;
    }
}
