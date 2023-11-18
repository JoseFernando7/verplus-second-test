package com.josef7.backendtest.repository;

import com.josef7.backendtest.model.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QueryRepository extends JpaRepository<Query, Long>
{

}
