package com.sosapp.repository;

import com.sosapp.model.Alert;
import com.sosapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlertRepository extends JpaRepository<Alert, Long> {

    List<Alert> findByUser(User user);
}
