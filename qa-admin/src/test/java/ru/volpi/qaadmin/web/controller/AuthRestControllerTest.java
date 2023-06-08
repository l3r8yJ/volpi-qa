package ru.volpi.qaadmin.web.controller;

import org.hamcrest.MatcherAssert;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import ru.volpi.qaadmin.TestcontainersTest;

import java.nio.charset.StandardCharsets;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
final class AuthRestControllerTest extends TestcontainersTest {

    private static final String AUTH_URL = "/api/v1/admin/auth";
    private static final String REGISTER_URL = "/api/v1/admin/register";
    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("New admin registration")
    void registrationAdminCorrectly() throws Exception {
        final String response = this.mockMvc.perform(
                post(REGISTER_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .characterEncoding(StandardCharsets.UTF_8)
                    .content(
                        """
                            {
                                "username": "sickFuckUsername",
                                "password": "sickFuckPassword"
                            }
                            """
                    )
            ).andExpect(status().isOk())
            .andReturn().getResponse().getContentAsString();
        MatcherAssert.assertThat(response, Matchers.startsWithIgnoringCase("{\"token\""));
    }

    @Test
    @DisplayName("Registration existing user")
    void registrationAdminThatAlreadyExists() throws Exception {
        final String response = this.mockMvc.perform(
                post(REGISTER_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .characterEncoding(StandardCharsets.UTF_8)
                    .content(
                        """
                            {
                                "username": "admin",
                                "password": "admin"
                            }
                            """
                    )
            ).andExpect(status().isBadRequest())
            .andReturn().getResponse().getContentAsString();
        MatcherAssert.assertThat(
            response.contains("Ползьзователь 'admin' уже зарегестрирован"),
            Matchers.is(true)
        );
    }

    @Test
    @DisplayName("Authenticate user correctly")
    void authenticateCorrectly() throws Exception {
        final String response = this.mockMvc.perform(
                post(AUTH_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .characterEncoding(StandardCharsets.UTF_8)
                    .content(
                        """
                            {
                                "username": "admin",
                                "password": "admin"
                            }
                            """
                    )
            ).andExpect(status().isOk())
            .andReturn().getResponse().getContentAsString();
        MatcherAssert.assertThat(response, Matchers.startsWithIgnoringCase("{\"token\""));
    }

    @Test
    @DisplayName("Authenticate user with wrong password")
    void authenticateUserWithWrongPassword() throws Exception {
        final String response = this.mockMvc.perform(
                post(AUTH_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .characterEncoding(StandardCharsets.UTF_8)
                    .content(
                        """
                            {
                                "username": "admin",
                                "password": "adfaf"
                            }
                            """
                    )
            ).andExpect(status().isUnauthorized())
            .andReturn().getResponse().getContentAsString();
        MatcherAssert.assertThat(response.contains("Неправильный пароль"), Matchers.is(true));
    }
}
