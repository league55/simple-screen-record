package recordsmanager.services.login;

import org.springframework.stereotype.Service;
import recordsmanager.services.jwt.JwtTokensService;

@Service
public class LoginServiceImpl implements LoginService {

    public static final String LOGIN = "LOGIN";
    private final JwtTokensService tokensService;

    public LoginServiceImpl(JwtTokensService tokensService) {
        this.tokensService = tokensService;
    }

    @Override
    public String login(String username) {
        long expiration = 1000L * 60L * 60L * 5; //5h
        return tokensService.createToken(username, LOGIN, expiration);
    }

}
