package com.easycoder.ems_backend.repository;

import com.easycoder.ems_backend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository; // Optional in newer Spring versions

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // Changed Integer -> Long to match your Entity Class
}