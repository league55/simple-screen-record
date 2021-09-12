package recordsmanager.controllers;

import com.fasterxml.jackson.databind.json.JsonMapper;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import org.mockito.Mockito;
import static org.mockito.Mockito.when;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import recordsmanager.dto.RecordResponse;
import recordsmanager.services.jwt.JwtTokensService;
import static recordsmanager.services.jwt.JwtTokensServiceImpl.RECORDS_MANAGER;
import recordsmanager.services.signedurls.SignedUrlsService;
import recordsmanager.services.storage.StorageService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class RecordsControllerTest {

    private static final String USERNAME = "username";
    private static final String FILE_1 = "file1";
    private static final String FILE_2 = "file2";
    private static final String FILE_1_SIGNED = "1signed";
    private static final String FILE_2_SIGNED = "2signed";

    @Autowired
    private LoginController controller;
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private StorageService storageService;
    @MockBean
    private SignedUrlsService signedUrlsService;
    @MockBean
    private JwtTokensService jwtTokensService;


    @BeforeEach
    void setUp() {
        Claims claims = Mockito.mock(Claims.class);
        when(claims.getId()).thenReturn(USERNAME);
        long nowMillis = System.currentTimeMillis() + 1000000L;
        Date now = new Date(nowMillis);
        when(claims.getExpiration()).thenReturn(now);
        when(claims.getIssuer()).thenReturn(RECORDS_MANAGER);

        when(jwtTokensService.decodeJwt(any())).thenReturn(claims);
    }

    @Test
    void listUploadedFiles() throws Exception {
        //given
        CompletableFuture<List<String>> files = CompletableFuture.completedFuture(Arrays.asList(FILE_1, FILE_2));
        when(storageService.listAll(USERNAME)).thenReturn(files);
        when(signedUrlsService.getUrl(USERNAME + "/" + FILE_1)).thenReturn(FILE_1_SIGNED);
        when(signedUrlsService.getUrl(USERNAME + "/" + FILE_2)).thenReturn(FILE_2_SIGNED);
        ArrayList<RecordResponse> expected = new ArrayList<>();
        expected.add(new RecordResponse(FILE_1, FILE_1_SIGNED));
        expected.add(new RecordResponse(FILE_2, FILE_2_SIGNED));

        JsonMapper mapper = new JsonMapper();
        String expectedAsJson = mapper.writer().writeValueAsString(expected);

        //when
        this.mockMvc.perform(get("/records"))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(content().json(expectedAsJson));
    }
}
