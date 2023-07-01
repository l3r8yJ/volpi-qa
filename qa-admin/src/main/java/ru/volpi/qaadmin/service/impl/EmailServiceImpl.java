package ru.volpi.qaadmin.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import ru.volpi.qaadmin.service.EmailService;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender emailSender;

    @Value("${answer.template}")
    private String template;

    @Value("${answer.from}")
    private String from;

    @Override
    public void sendNotification(final String to, final String subject, final String answer) {
        final SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(this.from);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(this.template.formatted(answer));
        this.emailSender.send(message);
    }
}
