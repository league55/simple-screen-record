package recordsmanager.services.storage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.List;

public interface StorageService {
    void init() throws StorageException;

    void store(MultipartFile file, String username) throws StorageException;

    List<String> listAll(String username);
    Path load(String filename);

    Resource loadAsResource(String filename) throws StorageFileNotFoundException;

}
