package com.josef7.backendtest.controller;

import com.josef7.backendtest.model.Query;
import com.josef7.backendtest.repository.QueryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/queries")
public class QueryController
{
    @Autowired
    private QueryRepository queryRepository;

    @GetMapping("/")
    public List<Query> getQueries()
    {
        return queryRepository.findAll();
    }

    @GetMapping("/query/{query_id}")
    public ResponseEntity<Optional<Query>> getUserQueries(@PathVariable Long query_id)
    {
        Optional<Query> query = queryRepository.findById(query_id);

        return ResponseEntity.ok(query);
    }

    @PostMapping("/add-query")
    public ResponseEntity<Query> addQuery(@RequestBody Query newQuery)
    {
        Query savedQuery = queryRepository.save(newQuery);

        return new ResponseEntity<>(savedQuery, HttpStatus.CREATED);
    }
}
