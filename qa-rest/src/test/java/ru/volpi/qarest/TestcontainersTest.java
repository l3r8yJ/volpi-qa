package ru.volpi.qarest;

import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import ru.volpi.qarest.annotation.IntegrationTest;

@Sql("classpath:sql/data.sql")
@IntegrationTest
public abstract class TestcontainersTest {

    @Container
    private static final PostgreSQLContainer<?> CONTAINER
        = new PostgreSQLContainer<>("postgres:15.1");

    private static final String DATASOURCE_URL_PROPERTY = "spring.datasource.url";
    private static final String DATASOURCE_USERNAME_PROPERTY = "spring.datasource.username";
    private static final String DATASOURCE_PASSWORD_PROPERTY = "spring.datasource.password";

    @DynamicPropertySource
    static void postgresProperties(final DynamicPropertyRegistry registry) {
        registry.add(TestcontainersTest.DATASOURCE_URL_PROPERTY, TestcontainersTest.CONTAINER::getJdbcUrl);
        registry.add(TestcontainersTest.DATASOURCE_USERNAME_PROPERTY, TestcontainersTest.CONTAINER::getUsername);
        registry.add(TestcontainersTest.DATASOURCE_PASSWORD_PROPERTY, TestcontainersTest.CONTAINER::getPassword);
    }
}
