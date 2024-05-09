package com.coffeshop.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "t_worker")
public class WorkerEntity {
    @Id
    @GeneratedValue
    private Integer id;
    private String firstName;
    private String surname;
    private String insuranceId;
    private Date insuranceDate;
    private String workContractId;
    private Date workContractDate;

}
