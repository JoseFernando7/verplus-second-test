package com.josef7.backendtest.controller;

import com.josef7.backendtest.model.Query;
import com.josef7.backendtest.model.QueryRequest;
import com.josef7.backendtest.model.User;
import com.josef7.backendtest.model.UserRequest;
import com.josef7.backendtest.repository.QueryRepository;
import com.josef7.backendtest.repository.UserRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/users")
public class UserController
{
    @Autowired
    private UserRespository userRespository;

    @Autowired
    private QueryRepository queryRepository;

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
    public ResponseEntity<String> addUser(@RequestBody UserRequest newUser)
    {
        // Create a User instance and assign values from request
        User user = new User();
        user.setName(newUser.getUsername());

        List<QueryRequest> queryRequests = newUser.getQueries();
        if (queryRequests != null)
        {
            for (QueryRequest queryRequest : queryRequests)
            {
                Query query = new Query();
                query.setQuery_name(queryRequest.getQuery_name());
                query.setOther_column(queryRequest.getOther_column());
                query.setRank_column(queryRequest.getRank_column());
                query.setComment(queryRequest.getComment());

                user.getQueries().add(query);
                query.setUser(user);
            }
        }

        userRespository.save(user);

        return ResponseEntity.ok("Data almacenado con éxito");
    }
}
