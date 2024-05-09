package com.coffeshop.backend.requests;

import jakarta.annotation.Nullable;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.math.BigDecimal;
import java.util.List;

@Setter
@Getter
@Data
@Builder
public class CreateProductRequest {
    private String name;
    private BigDecimal price;
    private List<String> ingredients;
    private String additionalInformation;
    @Nullable
    private byte[] image;
}
