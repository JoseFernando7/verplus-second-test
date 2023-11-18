package com.josef7.backendtest.controller;

import com.josef7.backendtest.service.BigQueryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/dataset-query")
public class BigQueryController
{
    BigQueryService queryService = new BigQueryService();
    // Username: user
    @GetMapping("/")
    public String getAPI() throws IOException, InterruptedException
    {
        return queryService.fetchService();
    }

    @GetMapping("/dmas")
    public ResponseEntity<List<Integer>> getDMA() throws IOException, InterruptedException
    {
        return queryService.getDMAs();
    }

    @PostMapping("/add-sql")
    public ResponseEntity<String> addSql(@RequestBody String newSql) throws IOException, InterruptedException
    {
        String queryResult = queryService.getData(newSql);

        return new ResponseEntity<>(queryResult, HttpStatus.CREATED);
    }
}
