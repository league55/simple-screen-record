package recordsmanager.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/records")
@CrossOrigin(value = "*", origins = "*")
public class RecordsController {

    private final Logger LOG = LoggerFactory.getLogger(RecordsController.class);

    @PostMapping
    String uploadRecord(HttpSession session) {
        LOG.info("User {} is uploading something", session.getAttribute("login"));
        return "ok";
    }
}
