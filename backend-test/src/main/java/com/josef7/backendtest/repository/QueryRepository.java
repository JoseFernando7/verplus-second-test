package com.josef7.backendtest.repository;

import com.josef7.backendtest.model.Query;
import com.josef7.backendtest.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * JpaRepository of the Query entities.
 *
 * @author josef7
 * @version 1.0.0
 */
@Repository
public interface QueryRepository extends JpaRepository<Query, Long>
{

}
