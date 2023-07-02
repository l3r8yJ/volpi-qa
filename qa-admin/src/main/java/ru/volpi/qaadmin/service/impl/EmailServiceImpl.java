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

    @Value("${answer.answered-template}")
    private String answeredTemplate;

    @Value("${answer.removed-template}")
    private String removedTemplate;

    @Value("${answer.from}")
    private String from;

    @Value("${answer.answered-subject}")
    private String answeredSubject;

    @Value("${answer.removed-subject}")
    private String removedSubject;

    @Override
    public void sendAnsweredNotification(final String to, final String answer) {
        final SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(this.from);
        message.setTo(to);
        message.setSubject(answeredSubject);
        message.setText(this.answeredTemplate.formatted(answer));
        this.emailSender.send(message);
    }

    @Override
    public void sendRemovedNotification(final String to) {
        final SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(this.from);
        message.setTo(to);
        message.setSubject(removedSubject);
        message.setText(removedTemplate);
        this.emailSender.send(message);
    }
}
