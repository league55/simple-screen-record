package recordsmanager.services.storage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;
import recordsmanager.dto.StoreResult;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface StorageService {
    void init() throws StorageException;

    CompletableFuture<StoreResult> store(MultipartFile file, String username) throws IOException;

    CompletableFuture<List<String>> listAll(String username);
    Path load(String filename);

    Resource loadAsResource(String filename) throws StorageFileNotFoundException;

}
