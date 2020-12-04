package recordsmanager.services.storage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.List;

public class S3StorageServiceImpl implements StorageService {
    @Override
    public void init() throws StorageException {

    }

    @Override
    public void store(MultipartFile file, String username) throws StorageException {

    }

    @Override
    public List<String> listAll(String username) {
        return null;
    }

    @Override
    public Path load(String filename) {
        return null;
    }

    @Override
    public Resource loadAsResource(String filename) throws StorageFileNotFoundException {
        return null;
    }
}
