package ru.volpi.qaadmin.service;

public interface EmailService {
    void sendAnsweredNotification(String to, String answer);

    void sendRemovedNotification(String to);
}
