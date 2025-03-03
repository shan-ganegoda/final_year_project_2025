package com.project.v1.service.IMPL;

import com.project.v1.dto.UserDTO;
import com.project.v1.entity.User;
import com.project.v1.exception.ResourceNotFoundException;
import com.project.v1.repository.UserRepository;
import com.project.v1.service.UserService;
import com.project.v1.util.mapper.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class UserServiceIMPL implements UserService {

    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<UserDTO> getAll(HashMap<String, String> params) {
        List<User> users = userRepository.findAll();
        if(!users.isEmpty()){
            List<UserDTO> userDTOList = objectMapper.userListToDtoList(users);
            if(params.isEmpty()){
                return userDTOList;
            }else{

                String username = params.get("username");
                String userstatusid = params.get("userstatusid");
                String roleid = params.get("roleid");

                Stream<UserDTO> stream = userDTOList.stream();

                if(username != null ) stream = stream.filter(u -> u.getUsername().equals(username));
                if(userstatusid != null ) stream = stream.filter(u -> u.getUserstatus().getId() == Integer.parseInt(userstatusid));
                if(roleid != null ) stream = stream.filter(u -> u.getRole().getId() == Integer.parseInt(roleid));

                return stream.collect(Collectors.toList());
            }
        }else{
            throw new ResourceNotFoundException("Users Not Found!");
        }
    }

    @Override
    public UserDTO save(UserDTO userDTO) {

        if(userRepository.existsByUsername(userDTO.getUsername())){
            throw new ResourceNotFoundException("Username Already Exists!");
        }

        User user = objectMapper.userDtoToUser(userDTO);

        LocalDate today = LocalDate.now();

        user.setDocreated(today);
        user.setDolastupdated(today);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        userRepository.save(user);
        return userDTO;


    }

    @Override
    public UserDTO update(UserDTO userDTO) {

        User userrec = userRepository.findById(userDTO.getId()).orElseThrow(() -> new ResourceNotFoundException("User Not Found"));

        if(!userrec.getUsername().equals(userDTO.getUsername()) && userRepository.existsByUsername(userDTO.getUsername())){
            throw new ResourceNotFoundException("Username Already Exists!");
        }

        User user = objectMapper.userDtoToUser(userDTO);

        if(!userDTO.getPassword().equals(userrec.getPassword())){
            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }
        userRepository.save(user);
        return userDTO;
    }

    @Override
    public String delete(Integer id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User Not Found"));
        userRepository.delete(user);
        return "User Deleted Successfully";
    }
}
