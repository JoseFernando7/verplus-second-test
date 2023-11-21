package com.josef7.backendtest.model;

import jakarta.persistence.Column;

import java.util.List;

/**
 * The query entity that marks the structure of the user object that the server receives.
 *
 * @author josef7
 * @version 1.0.0
 */
public class UserRequest
{
    @Column(name = "username")
    private String username;

    private List<QueryRequest> queries;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<QueryRequest> getQueries() {
        return queries;
    }

    public void setQueries(List<QueryRequest> queries) {
        this.queries = queries;
    }
}
