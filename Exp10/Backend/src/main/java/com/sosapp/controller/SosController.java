package com.sosapp.controller;

import com.sosapp.model.Alert;
import com.sosapp.service.SosService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sos")
@CrossOrigin(origins = "*")
public class SosController {

    private final SosService sosService;

    public SosController(SosService sosService) {
        this.sosService = sosService;
    }

    /**
     * POST /sos
     * Requires JWT. Triggers an SOS alert for the authenticated user.
     */
    @PostMapping
    public ResponseEntity<String> triggerSos() {
        String username = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
        sosService.createAlert(username);
        return ResponseEntity.ok("SOS Triggered");
    }

    /**
     * GET /sos
     * Requires JWT. Returns all SOS alerts for the authenticated user.
     */
    @GetMapping
    public ResponseEntity<List<Alert>> getUserAlerts() {
        String username = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
        List<Alert> alerts = sosService.getUserAlerts(username);
        return ResponseEntity.ok(alerts);
    }
}
