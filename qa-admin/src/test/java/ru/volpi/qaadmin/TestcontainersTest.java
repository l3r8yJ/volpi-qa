package ru.volpi.qaadmin;

import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.containers.wait.strategy.Wait;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.utility.DockerImageName;
import ru.volpi.qaadmin.annotation.IntegrationTest;

@Sql("classpath:sql/data.sql")
@IntegrationTest
public abstract class TestcontainersTest {

    @Container
    private static final PostgreSQLContainer<?> POSTGRES_CONTAINER
        = new PostgreSQLContainer<>("postgres:15.1");

    @Container
    private static final GenericContainer<?> SMTP_CONTAINER
        = new GenericContainer<>(DockerImageName.parse("greenmail/standalone:latest"))
        .waitingFor(Wait.forLogMessage(".*Starting GreenMail standalone.*", 1))
        .withEnv("GREENMAIL_OPTS", "-Dgreenmail.setup.test.smtp -Dgreenmail.hostname=0.0.0.0 -Dgreenmail.users=user:admin")
        .withExposedPorts(3025);

    @DynamicPropertySource
    static void postgresProperties(final DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", POSTGRES_CONTAINER::getJdbcUrl);
        registry.add("spring.datasource.username", POSTGRES_CONTAINER::getUsername);
        registry.add("spring.datasource.password", POSTGRES_CONTAINER::getPassword);
    }

    @DynamicPropertySource
    static void smtpProperties(final DynamicPropertyRegistry registry) {
        registry.add("spring.mail.host", SMTP_CONTAINER::getHost);
        registry.add("spring.mail.port", SMTP_CONTAINER::getFirstMappedPort);
    }
}