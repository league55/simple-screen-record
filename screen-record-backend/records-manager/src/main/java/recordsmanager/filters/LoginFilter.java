package recordsmanager.filters;

import io.jsonwebtoken.Claims;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import static recordsmanager.controllers.LoginController.JWT_TOKEN_HEADER;
import recordsmanager.services.jwt.JwtTokensService;
import static recordsmanager.services.jwt.JwtTokensServiceImpl.RECORDS_MANAGER;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

public class LoginFilter implements Filter {

    private final JwtTokensService jwtTokensService;

    public LoginFilter(JwtTokensService jwtTokensService) {
        this.jwtTokensService = jwtTokensService;
    }


    @Override
    public void doFilter(ServletRequest request, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;

        Claims claims = jwtTokensService.decodeJwt(req.getHeader(JWT_TOKEN_HEADER));
        boolean isValid = isTokenValid(claims);

        req.getSession().setAttribute("login", claims.getId());

        if (isValid) {
            filterChain.doFilter(request, servletResponse);
        } else {
            HttpServletResponse response = (HttpServletResponse) servletResponse;
            response.sendError(HttpServletResponse.SC_FORBIDDEN);
        }
    }

    private boolean isTokenValid(Claims claims) {
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        boolean isExpired = claims.getExpiration().before(now);

        return !isExpired && RECORDS_MANAGER.equals(claims.getIssuer());
    }
}
