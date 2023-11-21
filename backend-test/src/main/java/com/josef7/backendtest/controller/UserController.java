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

/**
 * This controller is responsible for manage all the user requests to the database.
 *
 * @author josef7
 * @version 1.0.0
 */
@RestController
@CrossOrigin
@RequestMapping("/api/v1/users")
public class UserController
{
    @Autowired
    private UserRespository userRespository;

    @Autowired
    private QueryRepository queryRepository;

    /**
     * Get all the users stored in the database.
     *
     * @return - All the users in database.
     */
    @GetMapping("/")
    public List<User> getUsers()
    {
        return userRespository.findAll();
    }

    /**
     * With the UserRequest param sets the object of a new user and stores it in the database.
     *
     * @param newUser - The object of the user entity.
     * @return - A message of success if everything goes well.
     */
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

        return ResponseEntity.ok("Data saved successfully");
    }
}
