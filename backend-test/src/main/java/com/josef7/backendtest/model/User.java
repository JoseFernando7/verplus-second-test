package com.josef7.backendtest.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

/**
 * The query entity that marks the structure of the query table.
 *
 * @author josef7
 * @version 1.0.0
 */
@Entity
@Table(name = "user-info")
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username")
    private String name;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Query> queries = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Query> getQueries() {
        return queries;
    }

    public void setQueries(List<Query> queries) {
        this.queries = queries;
    }
}
