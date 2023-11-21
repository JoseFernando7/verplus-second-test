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

/**
 * This controller is responsible for manage all the request to the bigquery dataset.
 *
 * @author josef7
 * @version 1.0.0
 */
@RestController
@CrossOrigin
@RequestMapping("/dataset-query")
public class BigQueryController
{
    BigQueryService queryService = new BigQueryService();

    /**
     * Uses the endpoint to receive the query from the client side, and with the getData function returns the
     * information given for the dataset after the query executes.
     *
     * @param request - The query object given for the client.
     * @return - A list of QueryResponse with the information the dataset returned.
     * @throws IOException - Occurs when there's an error in the write or read of the data either entering or leaving the server.
     * @throws InterruptedException - Occurs when the thread is interrupted.
     */
    @PostMapping("/add-sql")
    public ResponseEntity<List<QueryResponse>> addSql(@RequestBody QueryRequest request) throws IOException, InterruptedException
    {
        List<QueryResponse> result = queryService.getData(request.getQuery(), request.getFields());
        return ResponseEntity.ok(result);
    }
}
