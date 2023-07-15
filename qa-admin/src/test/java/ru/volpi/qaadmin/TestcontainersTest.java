package ru.volpi.qaadmin;

import org.junit.jupiter.api.BeforeAll;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.containers.wait.strategy.Wait;
import org.testcontainers.utility.DockerImageName;
import ru.volpi.qaadmin.annotation.IntegrationTest;

@Sql("classpath:sql/data.sql")
@IntegrationTest
public abstract class TestcontainersTest {

    private static final PostgreSQLContainer<?> POSTGRES_CONTAINER
        = new PostgreSQLContainer<>("postgres:15.1");

    private static final GenericContainer<?> SMTP_CONTAINER
        = new GenericContainer<>(DockerImageName.parse("greenmail/standalone:latest"))
        .waitingFor(Wait.forLogMessage(".*Starting GreenMail standalone.*", 1))
        .withEnv(
            "GREENMAIL_OPTS",
            "-Dgreenmail.setup.test.smtp -Dgreenmail.hostname=0.0.0.0 -Dgreenmail.users=user:admin"
        )
        .withExposedPorts(3025);

    @BeforeAll
    static void runContainers() {
        TestcontainersTest.POSTGRES_CONTAINER.start();
        TestcontainersTest.SMTP_CONTAINER.start();
    }

    @DynamicPropertySource
    static void postgresProperties(final DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", TestcontainersTest.POSTGRES_CONTAINER::getJdbcUrl);
        registry.add("spring.datasource.username", TestcontainersTest.POSTGRES_CONTAINER::getUsername);
        registry.add("spring.datasource.password", TestcontainersTest.POSTGRES_CONTAINER::getPassword);
    }

    @DynamicPropertySource
    static void smtpProperties(final DynamicPropertyRegistry registry) {
        registry.add("spring.mail.host", TestcontainersTest.SMTP_CONTAINER::getHost);
        registry.add("spring.mail.port", TestcontainersTest.SMTP_CONTAINER::getFirstMappedPort);
    }
}