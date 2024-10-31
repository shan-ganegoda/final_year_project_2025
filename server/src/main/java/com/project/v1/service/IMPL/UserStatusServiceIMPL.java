package com.project.v1.service.IMPL;

import com.project.v1.dto.UserStatusDTO;
import com.project.v1.entity.Userstatus;
import com.project.v1.exception.ResourceNotFoundException;
import com.project.v1.repository.UserStatusRepository;
import com.project.v1.service.UserStatusService;
import com.project.v1.util.mapper.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserStatusServiceIMPL implements UserStatusService {

    private final ObjectMapper objectMapper;
    private final UserStatusRepository userStatusRepository;

    @Override
    public List<UserStatusDTO> getAll() {
        List<Userstatus> userStatusList = userStatusRepository.findAll();
        if(!userStatusList.isEmpty()){
            return objectMapper.userStatusListToDtoList(userStatusList);
        }else{
            throw new ResourceNotFoundException("UserStatus Not Found!");
        }
    }
}
