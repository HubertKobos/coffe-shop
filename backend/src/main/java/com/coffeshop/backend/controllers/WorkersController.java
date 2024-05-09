package com.coffeshop.backend.controllers;

import com.coffeshop.backend.entities.UserEntity;
import com.coffeshop.backend.entities.WorkerEntity;
import com.coffeshop.backend.requests.CreateWorkerRequest;
import com.coffeshop.backend.services.WorkersService;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.text.ParseException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/worker")
@RequiredArgsConstructor
@Log
public class WorkersController {
    private final WorkersService workersService;

    @GetMapping
    public ResponseEntity<List<WorkerEntity>> getAllWorkers(){
        return ResponseEntity.ok(workersService.getAllWorkers());
    }

    @GetMapping("/{workerId}")
    public ResponseEntity<WorkerEntity> getWorkerById(@PathVariable("workerId") Integer workerId){
        return ResponseEntity.status(HttpStatus.OK).body(workersService.getWorkerById(workerId));
    }

    @PostMapping
    public ResponseEntity<WorkerEntity> createWorker(
            @RequestBody CreateWorkerRequest createWorkerRequest
    ) throws ParseException {

        return ResponseEntity.status(HttpStatus.CREATED).body(workersService.createWorker(createWorkerRequest));
    }

    @DeleteMapping("/{workerId}")
    public ResponseEntity deleteWorker(@PathVariable("workerId") Integer workerId){
        if(workersService.deleteWorker(workerId)){
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PatchMapping("/{workerId}/update")
    public ResponseEntity<WorkerEntity> updateWorker(@PathVariable("workerId") Integer workerId, @RequestBody CreateWorkerRequest createWorkerRequest) throws ParseException {
        log.info(createWorkerRequest.toString());
        return ResponseEntity.status(HttpStatus.OK).body(workersService.updateWorker(workerId, createWorkerRequest));
    }
}
