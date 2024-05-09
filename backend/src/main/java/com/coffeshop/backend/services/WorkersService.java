package com.coffeshop.backend.services;

import com.coffeshop.backend.entities.UserEntity;
import com.coffeshop.backend.entities.WorkerEntity;
import com.coffeshop.backend.entities.enums.Role;
import com.coffeshop.backend.exceptions.userExceptions.UserNotExistsException;
import com.coffeshop.backend.repositories.UserRepository;
import com.coffeshop.backend.repositories.WorkerRepository;
import com.coffeshop.backend.requests.CreateWorkerRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.apache.catalina.User;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log
public class WorkersService {
    private final WorkerRepository workerRepository;

    public List<WorkerEntity> getAllWorkers(){
        return workerRepository.findAll();
    }
    public WorkerEntity getWorkerById(Integer workerId){
        Optional<WorkerEntity> worker = workerRepository.findById(workerId);
        if(!worker.isPresent()){
            throw new UserNotExistsException(String.format("User with id %d not exists", workerId), HttpStatus.NOT_FOUND);
        }else{
            return worker.get();
        }
    }

    public WorkerEntity createWorker(CreateWorkerRequest createWorkerRequest) throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("EE MMM dd yyyy", Locale.ENGLISH);

        Date insuranceDate = formatter.parse(createWorkerRequest.getInsuranceDate());
        Date workContractDate = formatter.parse(createWorkerRequest.getWorkContractDate());
        createWorkerRequest.setInsuranceDate(String.valueOf(insuranceDate));
        createWorkerRequest.setWorkContractDate(String.valueOf(workContractDate));

        WorkerEntity worker = WorkerEntity.builder()
                .surname(createWorkerRequest.getSurname())
                .firstName(createWorkerRequest.getFirstName())
                .insuranceId(createWorkerRequest.getInsuranceId())
                .workContractId(createWorkerRequest.getWorkContractId())
                .insuranceDate(insuranceDate)
                .workContractDate(workContractDate)
                .build();
        return workerRepository.save(worker);
    }

    public boolean deleteWorker(Integer workerId){
        Optional<WorkerEntity> worker = workerRepository.findById(workerId);
        if(!worker.isPresent()){
            throw new UserNotExistsException(String.format("User with id %d not found", workerId), HttpStatus.NOT_FOUND);
        }else{
            workerRepository.delete(worker.get());
            return true;
        }

    }

    public WorkerEntity updateWorker(Integer workerId, CreateWorkerRequest createWorkerRequest) throws ParseException {
        Optional<WorkerEntity> worker = workerRepository.findById(workerId);
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");


        if(!worker.isPresent()){
            throw new UserNotExistsException(String.format("User with id %d not found", workerId), HttpStatus.NOT_FOUND);
        }else{
            if(!worker.get().getSurname().equals(createWorkerRequest.getSurname())) worker.get().setSurname(createWorkerRequest.getSurname());
            if(!worker.get().getFirstName().equals(createWorkerRequest.getFirstName())) worker.get().setFirstName(createWorkerRequest.getFirstName());
            if(!worker.get().getInsuranceId().equals(createWorkerRequest.getInsuranceId())) worker.get().setInsuranceId(createWorkerRequest.getInsuranceId());
            if(!worker.get().getInsuranceDate().toString().equals(formatter.parse(createWorkerRequest.getInsuranceDate()).toString())) worker.get().setInsuranceDate(formatter.parse(createWorkerRequest.getInsuranceDate()));
            if(!worker.get().getWorkContractDate().toString().equals(formatter.parse(createWorkerRequest.getWorkContractDate()).toString())) worker.get().setWorkContractDate(formatter.parse(createWorkerRequest.getWorkContractDate()));
            if(!worker.get().getWorkContractId().equals(createWorkerRequest.getWorkContractId())) worker.get().setWorkContractId(createWorkerRequest.getWorkContractId());
        }
        WorkerEntity workerEntity = workerRepository.save(worker.get());
        return workerEntity;
    }
}
