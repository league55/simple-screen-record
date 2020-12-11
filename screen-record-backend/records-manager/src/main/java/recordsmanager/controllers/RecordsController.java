package recordsmanager.controllers;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import recordsmanager.services.storage.StorageException;
import recordsmanager.services.storage.StorageFileNotFoundException;
import recordsmanager.services.storage.StorageService;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

@RestController
@RequestMapping("/records")
@CrossOrigin(value = "*", origins = "*")
@Slf4j
public class RecordsController {

    private final Logger LOG = LoggerFactory.getLogger(RecordsController.class);
    private final StorageService storageService;

    public RecordsController(StorageService storageService) {
        this.storageService = storageService;
    }

    @GetMapping
    public List<String> listUploadedFiles(HttpSession session) throws ExecutionException, InterruptedException {
        String login = getLogin(session);
        return storageService.listAll(login).get();
    }

    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) throws StorageFileNotFoundException {

        Resource file = storageService.loadAsResource(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

    @PostMapping
    String uploadRecord(@RequestParam("file") MultipartFile file, HttpSession session)
            throws IOException, ExecutionException, InterruptedException {
        String login = getLogin(session);
        LOG.info("User {} is uploading something filename:{} original:{}", login, file.getName(), file.getOriginalFilename());
        CompletableFuture<String> result = storageService.store(file, login).thenApply(s -> {
            LOG.info(s.toString());
            return s.toString();
        });
        return result.get();
    }

    private String getLogin(HttpSession session) {
        return String.valueOf(session.getAttribute("login"));
    }
}
