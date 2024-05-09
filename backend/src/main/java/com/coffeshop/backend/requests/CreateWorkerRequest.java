package com.coffeshop.backend.requests;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;

@Data
public class CreateWorkerRequest {
    public String firstName;
    public String surname;
    public String insuranceId;
    public String insuranceDate;
    public String workContractId;
    public String workContractDate;
}
