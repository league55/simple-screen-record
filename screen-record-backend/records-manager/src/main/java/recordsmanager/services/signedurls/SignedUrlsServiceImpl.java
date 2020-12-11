package recordsmanager.services.signedurls;

import com.amazonaws.services.cloudfront.CloudFrontUrlSigner;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Service;
import recordsmanager.configuration.CloudfrontConfigurationProperties;
import recordsmanager.dto.RecordResponse;

import java.io.File;
import java.io.IOException;
import java.security.spec.InvalidKeySpecException;
import java.util.Calendar;
import java.util.Date;

@Service
@EnableConfigurationProperties(CloudfrontConfigurationProperties.class)
@Slf4j
public class SignedUrlsServiceImpl implements SignedUrlsService {

    private final CloudfrontConfigurationProperties configuration;

    @Autowired
    public SignedUrlsServiceImpl(CloudfrontConfigurationProperties configuration) {
        this.configuration = configuration;
    }

    public String getUrl(String filename) {
        String distributionDomain = configuration.getDomain();
        CloudFrontUrlSigner.Protocol protocol = CloudFrontUrlSigner.Protocol.http;
        File privateKeyFile = new File(configuration.getPathToPK());
        Date time = getExpirationDate();

        try {
            String signedUrlCanned = getSignedURLWithCannedPolicy(distributionDomain, filename, protocol, privateKeyFile, time);
            log.info("Signed url for file {} : {}", filename, signedUrlCanned);
            return signedUrlCanned;
        } catch (InvalidKeySpecException | IOException e) {
            log.error("Failed to create signed url for file: " + filename, e);
        }
        return null;
    }

    private Date getExpirationDate() {
        Calendar cal = Calendar.getInstance(); // creates calendar
        cal.setTime(new Date());               // sets calendar time/date
        cal.add(Calendar.HOUR_OF_DAY, 12);      // adds 12 hours
        return cal.getTime();
    }

    private String getSignedURLWithCannedPolicy(String distributionDomain, String s3ObjectKey, CloudFrontUrlSigner.Protocol protocol,
            File privateKeyFile, Date dateLessThan) throws InvalidKeySpecException, IOException {
        return CloudFrontUrlSigner.getSignedURLWithCannedPolicy(protocol,
                distributionDomain,
                privateKeyFile,
                s3ObjectKey,
                configuration.getKeypairId(),
                dateLessThan);
    }
}
