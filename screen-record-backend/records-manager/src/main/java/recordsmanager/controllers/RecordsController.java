package recordsmanager.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/records")
@CrossOrigin(value = "*", origins = "*")
public class RecordsController {

    @PostMapping
    String uploadRecord() {
        return "ok";
    }
}
