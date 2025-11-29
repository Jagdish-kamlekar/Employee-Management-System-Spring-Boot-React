package com.easycoder.ems_backend.service.impl;

import com.easycoder.ems_backend.dto.EmployeeDto;
import com.easycoder.ems_backend.entity.Employee;
import com.easycoder.ems_backend.exception.ResourceNotFoundException;
import com.easycoder.ems_backend.mapper.EmployeeMapper;
import com.easycoder.ems_backend.repository.EmployeeRepository;
import com.easycoder.ems_backend.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.stream.Collectors;

import java.util.List;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService
{
    private final EmployeeRepository employeeRepository;
    // We don't need to inject EmployeeMapper if its methods are static,
    // but having it as a static utility is fine.

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto)
    {
        // 1. Convert DTO to Entity
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto); // Ensure semicolon

        // 2. Save the Entity
        Employee savedEmployee = employeeRepository.save(employee); // Ensure semicolon

        // 3. Convert saved Entity back to DTO and return
        EmployeeDto savedEmployeeDto = EmployeeMapper.mapToEmployeeDto(savedEmployee); // Ensure semicolon

        return savedEmployeeDto; // Ensure semicolon
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId)
    {
        // FIX B: Use findById() instead of findAllById()
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee is not exist with given Id: " + employeeId));

        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees()
    {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map((employee) -> EmployeeMapper.mapToEmployeeDto(employee))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee)
    {
      Employee employee =  employeeRepository.findById(employeeId).orElseThrow(
                () -> new ResourceNotFoundException("Employee is not exists with given id: "+ employeeId)
        );

      employee.setFirstName(updatedEmployee.getFirstName());
      employee.setLastName(updatedEmployee.getLastName());
      employee.setEmail(updatedEmployee.getEmail());

      Employee updatedEmployeeObj = employeeRepository.save(employee);
      return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long employeeId)
    {
        Employee employee =  employeeRepository.findById(employeeId).orElseThrow(
                () -> new ResourceNotFoundException("Employee is not exists with given id: "+ employeeId)
        );

        employeeRepository.deleteById(employeeId);
    }
}
// Ensure there are only two final closing braces here.