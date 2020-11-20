
package service.users.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import static javax.persistence.CascadeType.ALL;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class User {

	public User(String name) {
		this.name = name;
	}

	private @Id @GeneratedValue Long id;
	private String name;

	@OneToMany(cascade=ALL, mappedBy="owner")
	private List<Record> records = new ArrayList<>();
}
