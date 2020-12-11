package recordsmanager.services.storage;

import static java.util.stream.Collectors.toList;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;
import recordsmanager.configuration.S3ClientConfigurationProperties;
import recordsmanager.dto.StoreResult;
import software.amazon.awssdk.core.async.AsyncRequestBody;
import software.amazon.awssdk.services.s3.S3AsyncClient;
import software.amazon.awssdk.services.s3.model.ListObjectsV2Request;
import software.amazon.awssdk.services.s3.model.ListObjectsV2Response;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Object;

import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Slf4j
public class S3StorageServiceImpl implements StorageService {

    private final S3AsyncClient s3client;
    private final S3ClientConfigurationProperties s3config;

    public S3StorageServiceImpl(S3AsyncClient s3client, S3ClientConfigurationProperties s3config) {
        this.s3client = s3client;
        this.s3config = s3config;
    }

    @Override
    public void init() throws StorageException {

    }

    @Override
    @CacheEvict(value = "recordsList", key = "#username")
    public CompletableFuture<StoreResult> store(MultipartFile file, String username) throws IOException {
        String originalFilename = file.getOriginalFilename();
        log.info("Uploading file {} to S3, file length={}", originalFilename, file.getSize());

        return s3client.putObject(PutObjectRequest.builder().bucket(s3config.getBucket()).contentLength(file.getSize())
                                                  .key(username + "/" + originalFilename)
                                                  .contentType(MediaType.MULTIPART_FORM_DATA.toString()).metadata(new HashMap<>()).build(),
                AsyncRequestBody.fromBytes(file.getBytes()))
                       .thenApply(result -> new StoreResult(HttpStatus.CREATED, new String[] {originalFilename}));
    }

    @Override
    @Cacheable(value = "recordsList", key = "#username")
    public CompletableFuture<List<String>> listAll(String username) {
        try {
            ListObjectsV2Response listObjectsV2Response = s3client
                    .listObjectsV2(ListObjectsV2Request.builder().bucket(s3config.getBucket()).prefix(username).build()).get();

            List<String> collect = listObjectsV2Response.contents().stream()
                                         .map(S3Object::key)
                                         .map(key -> key.substring(username.length() + 1))
                                         .collect(toList());
            return CompletableFuture.completedFuture(collect);
        } catch (Exception e) {
            log.error("An unexpected exception occurred", e);
        }

        return CompletableFuture.completedFuture(new ArrayList<>());
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
