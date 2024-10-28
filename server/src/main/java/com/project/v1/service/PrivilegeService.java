package com.project.v1.service;

import com.project.v1.dto.PrivilegeDTO;

import java.util.HashMap;
import java.util.List;

public interface PrivilegeService {
    List<PrivilegeDTO> getAll(HashMap<String, String> params);

    PrivilegeDTO save(PrivilegeDTO privilegeDTO);

    PrivilegeDTO update(PrivilegeDTO privilegeDTO);

    String delete(Integer id);
}
