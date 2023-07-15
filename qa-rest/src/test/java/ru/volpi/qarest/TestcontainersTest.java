package ru.volpi.qarest;

import org.junit.jupiter.api.BeforeAll;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.testcontainers.containers.PostgreSQLContainer;
import ru.volpi.qarest.annotation.IntegrationTest;

@Sql("classpath:sql/data.sql")
@IntegrationTest
public abstract class TestcontainersTest {

    private static final PostgreSQLContainer<?> POSTGRES_CONTAINER
        = new PostgreSQLContainer<>("postgres:15.1");

    private static final String DATASOURCE_URL_PROPERTY = "spring.datasource.url";
    private static final String DATASOURCE_USERNAME_PROPERTY = "spring.datasource.username";
    private static final String DATASOURCE_PASSWORD_PROPERTY = "spring.datasource.password";

    @BeforeAll
    static void runContainers() {
        TestcontainersTest.POSTGRES_CONTAINER.start();
    }

    @DynamicPropertySource
    static void postgresProperties(final DynamicPropertyRegistry registry) {
        registry.add(TestcontainersTest.DATASOURCE_URL_PROPERTY, TestcontainersTest.POSTGRES_CONTAINER::getJdbcUrl);
        registry.add(TestcontainersTest.DATASOURCE_USERNAME_PROPERTY, TestcontainersTest.POSTGRES_CONTAINER::getUsername);
        registry.add(TestcontainersTest.DATASOURCE_PASSWORD_PROPERTY, TestcontainersTest.POSTGRES_CONTAINER::getPassword);
    }
}
