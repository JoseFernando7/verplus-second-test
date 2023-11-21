package com.josef7.backendtest.repository;

import com.josef7.backendtest.model.Query;
import com.josef7.backendtest.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface QueryRepository extends JpaRepository<Query, Long>
{
    @org.springframework.data.jpa.repository.Query("SELECT u FROM User u WHERE u.id = :id")
    User findId1Query(@Param("id") Long id);
}
