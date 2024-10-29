package com.project.v1.service.IMPL;

import com.project.v1.dto.GenderDTO;
import com.project.v1.entity.Gender;
import com.project.v1.exception.ResourceNotFoundException;
import com.project.v1.repository.GenderRepository;
import com.project.v1.service.GenderService;
import com.project.v1.util.mapper.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GenderServiceIMPL implements GenderService {

    private final GenderRepository genderRepository;
    private final ObjectMapper objectMapper;

    @Override
    public List<GenderDTO> getAll() {
        List<Gender> genders = genderRepository.findAll();
        if(!genders.isEmpty()){
            return objectMapper.genderListToDtoList(genders);
        }else{
            throw new ResourceNotFoundException("Genders Not Found!");
        }
    }
}
