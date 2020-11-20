package user.data.repositories;

import java.util.Optional;

import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import user.data.model.User;

@EnableScan
@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface ProductInfoRepository extends CrudRepository<User, String> {
    Optional<User> findByName(@Param("name") String name);
}
