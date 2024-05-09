package com.coffeshop.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name="t_product")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductEntity {

    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    private BigDecimal price;

    @ElementCollection
    private List<String> ingredients;

    private String additionalInformation;
    @Lob
    private byte[] image;
}
