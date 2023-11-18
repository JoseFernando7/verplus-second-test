package com.josef7.backendtest.repository;

import com.josef7.backendtest.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRespository extends JpaRepository<User, Long>
{
    @Query("SELECT u FROM User u WHERE u.id = :id")
    User findId1User(@Param("id") Long id);
}
