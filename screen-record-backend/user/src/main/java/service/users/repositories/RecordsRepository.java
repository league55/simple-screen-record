package service.users.repositories;

import service.users.dto.Record;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;


@RepositoryRestResource(collectionResourceRel = "records", path = "records")
public interface RecordsRepository extends CrudRepository<Record, Long> {

	List<Record> findByOwner_Id(@Param("owner") String owner);
}
