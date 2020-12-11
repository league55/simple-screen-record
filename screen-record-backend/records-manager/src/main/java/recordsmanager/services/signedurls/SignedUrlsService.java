package recordsmanager.services.signedurls;

import recordsmanager.dto.RecordResponse;

import java.util.List;

public interface SignedUrlsService {
    List<RecordResponse> getUrls(List<String> filenames, String username);
}
