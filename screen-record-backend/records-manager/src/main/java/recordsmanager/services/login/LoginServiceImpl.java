package recordsmanager.services.login;

import io.jsonwebtoken.Claims;
import recordsmanager.services.jwt.JwtTokensService;
import static recordsmanager.services.jwt.JwtTokensServiceImpl.RECORDS_MANAGER;

import java.util.Date;

public class LoginServiceImpl implements LoginService {

    public static final String LOGIN = "LOGIN";
    private final JwtTokensService tokensService;

    public LoginServiceImpl(JwtTokensService tokensService) {
        this.tokensService = tokensService;
    }

    @Override
    public String login(String username) {
        long expiration = 1000L * 60L * 60L;
        return tokensService.createToken(username, LOGIN, expiration);
    }

    @Override
    public boolean testLogin(String username, String token) {
        Claims decoded = tokensService.decodeJWT(token);
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        boolean isExpired = decoded.getExpiration().before(now);
        return !isExpired
               && username.equals(decoded.getId())
               && RECORDS_MANAGER.equals(decoded.getIssuer());

    }
}
