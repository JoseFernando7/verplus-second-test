package com.josef7.backendtest.service;

import java.util.List;

/**
 * The QueryRequest entity
 *
 * @author josef7
 * @version 1.0.0
 */
public class QueryResponse
{
    private List<Object> response;

    public List<Object> getResponse() {
        return response;
    }

    public void setResponse(List<Object> response) {
        this.response = response;
    }
}
