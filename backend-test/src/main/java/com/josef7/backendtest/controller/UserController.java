package com.josef7.backendtest.controller;

import com.josef7.backendtest.model.User;
import com.josef7.backendtest.repository.UserRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController
{
    @Autowired
    private UserRespository userRespository;

    @GetMapping("/")
    public List<User> getUsers()
    {
        return userRespository.findAll();
    }

    @GetMapping("/one-user/{user_id}")
    public User getOneUser(@PathVariable Long user_id)
    {
        return userRespository.findId1User(user_id);
    }

    @PostMapping("/add-user")
    public ResponseEntity<User> addUser(@RequestBody User newUser)
    {
        User savedUser = userRespository.save(newUser);

        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }
}
