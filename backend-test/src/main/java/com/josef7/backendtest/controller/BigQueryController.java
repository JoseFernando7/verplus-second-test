package com.josef7.backendtest.controller;

import com.josef7.backendtest.service.BigQueryService;
import com.josef7.backendtest.service.QueryRequest;
import com.josef7.backendtest.service.QueryResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Collections;
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
    public ResponseEntity<List<QueryResponse>> addSql(@RequestBody QueryRequest request) throws IOException, InterruptedException
    {
        List<QueryResponse> result = queryService.getData(request.getQuery(), request.getFields());
        return ResponseEntity.ok(result);
    }
}
