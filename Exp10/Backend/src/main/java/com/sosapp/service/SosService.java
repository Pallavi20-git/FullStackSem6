package com.sosapp.service;

import com.sosapp.model.Alert;
import com.sosapp.model.User;
import com.sosapp.repository.AlertRepository;
import com.sosapp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SosService {

    private final UserRepository userRepository;
    private final AlertRepository alertRepository;

    public SosService(UserRepository userRepository, AlertRepository alertRepository) {
        this.userRepository = userRepository;
        this.alertRepository = alertRepository;
    }

    /**
     * Create an SOS alert for the authenticated user.
     */
    public Alert createAlert(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));

        Alert alert = Alert.builder()
                .message("SOS Triggered")
                .timestamp(LocalDateTime.now())
                .user(user)
                .build();

        return alertRepository.save(alert);
    }

    /**
     * Retrieve all SOS alerts for the authenticated user.
     */
    public List<Alert> getUserAlerts(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));

        return alertRepository.findByUser(user);
    }
}
