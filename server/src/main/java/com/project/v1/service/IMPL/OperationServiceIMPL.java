package com.project.v1.service.IMPL;

import com.project.v1.dto.OperationDTO;
import com.project.v1.entity.Operation;
import com.project.v1.exception.ResourceNotFoundException;
import com.project.v1.repository.OperationRepository;
import com.project.v1.service.OperationService;
import com.project.v1.util.mapper.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OperationServiceIMPL implements OperationService {

    private final OperationRepository operationRepository;
    private final ObjectMapper objectMapper;

    @Override
    public List<OperationDTO> getAll() {
        List<Operation> operations = operationRepository.findAll();
        if(!operations.isEmpty()){
            return objectMapper.operationListToDtoList(operations);
        }else{
            throw new ResourceNotFoundException("No Operations Found!");
        }
    }
}
