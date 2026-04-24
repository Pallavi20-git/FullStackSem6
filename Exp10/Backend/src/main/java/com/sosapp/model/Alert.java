package com.sosapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "alerts")
public class Alert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "message")
    private String message;

    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timestamp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore   // prevents LazyInitializationException and circular serialization
    private User user;

    public Alert() {}

    public Alert(Long id, String message, LocalDateTime timestamp, User user) {
        this.id = id;
        this.message = message;
        this.timestamp = timestamp;
        this.user = user;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    // Builder pattern
    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String message;
        private LocalDateTime timestamp;
        private User user;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder message(String message) { this.message = message; return this; }
        public Builder timestamp(LocalDateTime timestamp) { this.timestamp = timestamp; return this; }
        public Builder user(User user) { this.user = user; return this; }

        public Alert build() { return new Alert(id, message, timestamp, user); }
    }
}
