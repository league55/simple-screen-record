package recordsmanager.services.storage;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class FileSystemStorageService implements StorageService {

    private static final String ROOT = "./files";
    private final Path rootLocation;

    public FileSystemStorageService() {
        this.rootLocation = Paths.get(ROOT);
    }

    @Override
    public void store(MultipartFile file, String username) throws StorageException {
        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file.");
            }
            String subPath = username + "/" + file.getOriginalFilename();
            Path destinationFile = this.rootLocation.resolve(Paths.get(subPath)).normalize().toAbsolutePath();
            Path userDir = this.rootLocation.resolve(Paths.get(username)).normalize().toAbsolutePath();
            if (!destinationFile.getParent().toAbsolutePath().equals(userDir)) {
                // This is a security check
                throw new StorageException("Cannot store file outside current directory.");
            }
            if(!userDir.toFile().exists()) {
                userDir.toFile().mkdir();
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
            }
        } catch (IOException e) {
            throw new StorageException("Failed to store file.", e);
        }
    }

    @Override
    public List<String> listAll(String username) {
        Path path = load(ROOT + username);
        File file = path.toFile();
        String[] fileNames = file.list();

        if (fileNames != null) {
            return Arrays.asList(fileNames);
        } else {
            return new ArrayList<>();
        }
    }


    @Override
    public Path load(String filename) {
        return rootLocation.resolve(filename);
    }

    @Override
    public Resource loadAsResource(String filename) throws StorageFileNotFoundException {
        try {
            Path file = load(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new StorageFileNotFoundException("Could not read file: " + filename);
            }
        } catch (MalformedURLException e) {
            throw new StorageFileNotFoundException("Could not read file: " + filename, e);
        }
    }


    @Override
    public void init() throws StorageException {
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new StorageException("Could not initialize storage", e);
        }
    }
}
