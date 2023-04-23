package ru.volpi.qaadmin;

import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import ru.volpi.qaadmin.annotation.IntegrationTest;

@Sql("classpath:sql/data.sql")
@IntegrationTest
public class TestcontainersTest {

    @Container
    private static final PostgreSQLContainer<?> CONTAINER
        = new PostgreSQLContainer<>("postgres:15.1");

    private static final String DATASOURCE_URL_PROPERTY = "spring.datasource.url";
    private static final String DATASOURCE_USERNAME_PROPERTY = "spring.datasource.username";
    private static final String DATASOURCE_PASSWORD_PROPERTY = "spring.datasource.password";

    @DynamicPropertySource
    static void postgresProperties(final DynamicPropertyRegistry registry) {
        registry.add(DATASOURCE_URL_PROPERTY, CONTAINER::getJdbcUrl);
        registry.add(DATASOURCE_USERNAME_PROPERTY, CONTAINER::getUsername);
        registry.add(DATASOURCE_PASSWORD_PROPERTY, CONTAINER::getPassword);
    }
}
