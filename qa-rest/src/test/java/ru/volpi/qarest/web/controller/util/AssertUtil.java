package ru.volpi.qarest.web.controller.util;

import lombok.experimental.UtilityClass;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@UtilityClass
public class AssertUtil {
    public static void assertUrlWithMock(final MockMvc mockMvc, final String url, final ResultMatcher matcher) throws Exception {
        mockMvc.perform(get(url)).andExpect(matcher);
    }
}
