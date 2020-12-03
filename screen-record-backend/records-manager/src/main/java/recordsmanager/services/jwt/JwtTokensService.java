package recordsmanager.services.jwt;

import io.jsonwebtoken.Claims;

public interface JwtTokensService {
    String createToken(String input, String subject, Long expirationTime);

    Claims decodeJWT(String jwt);
}
