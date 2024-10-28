package com.project.v1.service.IMPL;

import com.project.v1.dto.PrivilegeDTO;
import com.project.v1.entity.Privilege;
import com.project.v1.exception.ResourceAlreadyExistException;
import com.project.v1.exception.ResourceNotFoundException;
import com.project.v1.repository.PrivilegeRepository;
import com.project.v1.service.PrivilegeService;
import com.project.v1.util.mapper.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class PrivilegeServiceIMPL implements PrivilegeService {

    private final PrivilegeRepository privilegeRepository;
    private final ObjectMapper objectMapper;


    @Override
    public List<PrivilegeDTO> getAll(HashMap<String, String> params) {
        List<Privilege> privileges = privilegeRepository.findAll();
        if(!privileges.isEmpty()){
            List<PrivilegeDTO> dtos = objectMapper.privilegeListToDtoList(privileges);
            if(params.isEmpty()){
                return dtos;
            }else{

                String roleid = params.get("roleid");
                String moduleid = params.get("moduleid");
                String operationid = params.get("operationid");

                Stream<PrivilegeDTO> stream = dtos.stream();

                if(roleid != null ) stream = stream.filter(p -> p.getRole().getId() == Integer.parseInt(roleid));
                if(moduleid != null ) stream = stream.filter(p -> p.getModule().getId() == Integer.parseInt(moduleid));
                if(operationid != null ) stream = stream.filter(p -> p.getOperation().getId() == Integer.parseInt(operationid));

                return stream.collect(Collectors.toList());
            }
        }else{
            throw new ResourceNotFoundException("Privilege Not Found!");
        }
    }

    @Override
    public PrivilegeDTO save(PrivilegeDTO privilegeDTO) {

        if(privilegeRepository.existsByRoleAndModuleAndOperation(privilegeDTO.getRole(),privilegeDTO.getModule(),privilegeDTO.getOperation())){
            throw new ResourceAlreadyExistException("Privilege Already Exists!");
        }

        Privilege privilege = objectMapper.privilegeDtoToPrivilege(privilegeDTO);
        privilegeRepository.save(privilege);
        return privilegeDTO;

    }

    @Override
    public PrivilegeDTO update(PrivilegeDTO privilegeDTO) {
        if(privilegeRepository.existsByRoleAndModuleAndOperation(privilegeDTO.getRole(),privilegeDTO.getModule(),privilegeDTO.getOperation())){
            throw new ResourceAlreadyExistException("Privilege Already Exists!");
        }

        Privilege privilege = objectMapper.privilegeDtoToPrivilege(privilegeDTO);
        privilegeRepository.save(privilege);
        return privilegeDTO;
    }

    @Override
    public String delete(Integer id) {
        Privilege privilege = privilegeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Privilege Not Found!"));
        privilegeRepository.delete(privilege);
        return "Privilege Successfully Deleted!";
    }
}
