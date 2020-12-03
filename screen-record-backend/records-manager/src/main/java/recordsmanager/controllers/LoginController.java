package recordsmanager.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;

@RestController
@RequestMapping("/login")
@CrossOrigin(value = "*", origins = "*")
public class LoginController {

    @PostMapping("/{username}")
    String login(@PathVariable("username") String username) {
        return username;
    }
}
