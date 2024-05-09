package com.coffeshop.backend.repositories;

import com.coffeshop.backend.entities.WorkerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkerRepository extends JpaRepository<WorkerEntity, Integer> {
}
