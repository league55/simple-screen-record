package service.users.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


@Entity
@Data
@NoArgsConstructor
public class Record {

	private @Id @GeneratedValue Long id;
	private String publicName;

	public Record(String publicName, User owner) {
		this.publicName = publicName;
		this.owner = owner;
	}

	@ManyToOne
	@JoinColumn(name="ownerId", nullable=false)
	private User owner;
}
