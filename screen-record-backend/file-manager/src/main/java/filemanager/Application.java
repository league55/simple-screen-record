package filemanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import filemanager.clients.HealthWebClient;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);

        HealthWebClient gwc = new HealthWebClient();
        System.out.println(gwc.getResult());
    }
}
