package recordsmanager.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import recordsmanager.services.storage.FileSystemStorageService;
import recordsmanager.services.storage.S3StorageServiceImpl;
import recordsmanager.services.storage.StorageException;
import recordsmanager.services.storage.StorageService;

@Configuration
public class StorageConfig {
    @Bean
    @Profile("test")
    public StorageService fileStorageService() throws StorageException {
        FileSystemStorageService fileSystemStorageService = new FileSystemStorageService();
        fileSystemStorageService.init();
        return fileSystemStorageService;
    }

    @Bean
    @Profile("s3")
    public StorageService s3StorageService() throws StorageException {
        S3StorageServiceImpl s3StorageService = new S3StorageServiceImpl();
        s3StorageService.init();
        return s3StorageService;
    }
}
