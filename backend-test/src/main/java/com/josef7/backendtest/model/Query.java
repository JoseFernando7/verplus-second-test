package com.josef7.backendtest.model;

import jakarta.persistence.*;

import java.util.List;

/**
 * The query entity that marks the structure of the query table.
 *
 * @author josef7
 * @version 1.0.0
 */
@Entity
public class Query
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "query_name")
    private String query_name;

    @Column(name = "other_column")
    //@Convert(converter = ListObjectConverter.class)
    private List<String> other_column;

    @Column(name = "rank_column")
    private List<Integer> rank_column;

    @Column(name = "comment")
    private String comment;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuery_name() {
        return query_name;
    }

    public void setQuery_name(String query_name) {
        this.query_name = query_name;
    }

    public List<String> getOther_column() {
        return other_column;
    }

    public void setOther_column(List<String> other_column) {
        this.other_column = other_column;
    }

    public List<Integer> getRank_column() {
        return rank_column;
    }

    public void setRank_column(List<Integer> rank_column) {
        this.rank_column = rank_column;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
