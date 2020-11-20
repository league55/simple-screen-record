package service.users;

import service.users.dto.Record;
import service.users.dto.User;
import service.users.repositories.RecordsRepository;
import service.users.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;

@SpringBootApplication
public class Application {

	@Autowired
	private RecordsRepository recordsRepository;
	@Autowired
	private UserRepository userRepository;

	public static void main(String[] args) {
		SpringApplication.run(Application.class);
	}

	public @PostConstruct void init() {

		User bilbo = new User("Bilbo");
		userRepository.save(bilbo);
		userRepository.save(new User("Frodo"));
		userRepository.save(new User("Gandalf"));

		recordsRepository.save(new Record("test.mpeg", bilbo));
		recordsRepository.save(new Record("test2.mpeg", bilbo));
	}
}
