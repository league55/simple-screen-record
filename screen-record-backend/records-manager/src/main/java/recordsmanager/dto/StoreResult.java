package recordsmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class StoreResult {
    HttpStatus status;
    String[] keys;

    public StoreResult() {}

    public StoreResult(HttpStatus status, List<String> keys) {
        this.status = status;
        this.keys = keys == null ? new String[] {}: keys.toArray(new String[] {});

    }
}
