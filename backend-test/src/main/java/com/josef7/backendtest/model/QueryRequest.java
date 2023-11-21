package com.josef7.backendtest.model;

import com.josef7.backendtest.service.ListObjectConverter;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;

import java.util.List;

public class QueryRequest
{
    @Column(name = "query_name")
    private String query_name;

    @Column(name = "other_column")
    //@Convert(converter = ListObjectConverter.class)
    private List<String> other_column;

    @Column(name = "rank_column")
    private List<Integer> rank_column;

    @Column(name = "comment")
    private String comment;

    public String getQuery_name() {
        return query_name;
    }

    public void setQuery_name(String query_name) {
        this.query_name = query_name;
    }

//    public List<Object> getOther_column() {
//        return other_column;
//    }
//
//    public void setOther_column(List<Object> other_column) {
//        this.other_column = other_column;
//    }


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
}
