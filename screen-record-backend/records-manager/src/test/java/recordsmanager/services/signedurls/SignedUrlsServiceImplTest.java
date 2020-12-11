package recordsmanager.services.signedurls;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;

import java.util.ArrayList;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("s3")
class SignedUrlsServiceImplTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @LocalServerPort
    private int serverPort;

    @Autowired
    private SignedUrlsService service;

    @Test
    void whenUploadSingleFile_thenSuccess() throws Exception {

        ArrayList<String> files = new ArrayList<>();
        files.add("myfile.webm");

        service.getUrls(files, "asdf");
    }

}
