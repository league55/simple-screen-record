package recordsmanager.configuration;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "aws.cloudfront")
@Data
public class CloudfrontConfigurationProperties {
    private String accountId;
    private String domain;
    private String pathToPK;
    private String keypairId;
}
