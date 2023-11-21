package com.josef7.backendtest.controller;

import com.josef7.backendtest.model.Query;
import com.josef7.backendtest.model.User;
import com.josef7.backendtest.repository.QueryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * This controller is responsible for manage all the query requests to the users/queries database.
 *
 * @author josef7
 * @version 1.0.0
 */
@RestController
@RequestMapping("/api/v1/queries")
public class QueryController
{
    @Autowired
    private QueryRepository queryRepository;

    /**
     * Manages the POST request through the endpoint.
     *
     * @param newQuery - The query object that the user saves.
     * @return - A 201 status code (CREATED)
     */
    @PostMapping("/add-query")
    public ResponseEntity<Query> addQuery(@RequestBody Query newQuery)
    {
        Query savedQuery = queryRepository.save(newQuery);

        return new ResponseEntity<>(savedQuery, HttpStatus.CREATED);
    }
}
