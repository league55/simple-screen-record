package recordsmanager.services.jwt;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;

@Service
public class JwtTokensServiceImpl implements JwtTokensService {

    public static final String RECORDS_MANAGER = "RecordsManager";

    @Value("#{environment.JWT_TOKEN_SECRET}")
    private String secret;

    /**
     * Credits: https://developer.okta.com/blog/2018/10/31/jwts-with-java
     */
    @Override
    public String createToken(String id, String subject, Long expirationTime) {
        //The JWT signature algorithm we will be using to sign the token
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        //We will sign our JWT with our ApiKey secret
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(secret);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        //Let's set the JWT Claims
        JwtBuilder builder = Jwts.builder().setId(id).setIssuedAt(now).setSubject(subject).setIssuer(RECORDS_MANAGER)
                                 .signWith(signatureAlgorithm, signingKey);

        //if it has been specified, let's add the expiration
        if (expirationTime > 0) {
            long expMillis = nowMillis + expirationTime;
            Date exp = new Date(expMillis);
            builder.setExpiration(exp);
        }

        //Builds the JWT and serializes it to a compact, URL-safe string
        return builder.compact();
    }

    @Override
    public Claims decodeJwt(String jwt) {
        //This line will throw an exception if it is not a signed JWS (as expected)
        return Jwts.parserBuilder().setSigningKey(DatatypeConverter.parseBase64Binary(secret)).build().parseClaimsJws(jwt).getBody();
    }
}
