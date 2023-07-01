package ru.volpi.qaadmin.service;

public interface EmailService {
    void sendNotification(String to, String subject, String answer);
}
