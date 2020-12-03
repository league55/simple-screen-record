package recordsmanager.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import recordsmanager.services.login.LoginService;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/login")
@CrossOrigin(value = "*", origins = "*")
public class LoginController {
    private final Logger LOG = LoggerFactory.getLogger(LoginController.class);
    public static final String JWT_TOKEN_HEADER = "jwt_token";

    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/{username}")
    String login(@PathVariable("username") String username, HttpServletResponse response) {
        String token = loginService.login(username);

        LOG.info("Logged in {}: {}", username, token);
        response.addHeader(JWT_TOKEN_HEADER, token);

        return token;
    }

}
