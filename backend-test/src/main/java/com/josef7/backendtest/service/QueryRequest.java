package com.josef7.backendtest.service;

import java.util.List;

/**
 * The QueryRequest entity
 *
 * @author josef7
 * @version 1.0.0
 */
public class QueryRequest
{
    private String query;
    private List<String> fields;

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public List<String> getFields() {
        return fields;
    }

    public void setFields(List<String> fields) {
        this.fields = fields;
    }
}
