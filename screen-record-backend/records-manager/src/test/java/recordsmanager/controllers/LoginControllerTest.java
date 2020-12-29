package recordsmanager.controllers;

import static org.hamcrest.Matchers.containsString;
import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.when;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import recordsmanager.services.login.LoginService;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class LoginControllerTest {

    private final String USERNAME = "username";
    private final String TOKEN = "token";
    @Autowired
    private LoginController controller;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LoginService loginService;

    @Test
    void loginRequestReturnsToken() throws Exception {
        //given
        when(loginService.login(USERNAME)).thenReturn(TOKEN);
        //when
        this.mockMvc.perform(post("/login/" + USERNAME))
                    //then
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(content().string(containsString(TOKEN)));

    }
}
