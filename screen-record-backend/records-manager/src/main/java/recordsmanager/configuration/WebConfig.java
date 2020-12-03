package recordsmanager.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import recordsmanager.filters.LoginFilter;
import recordsmanager.services.jwt.JwtTokensService;

@Configuration
public class WebConfig {

    private final JwtTokensService jwtTokensService;

    public WebConfig(JwtTokensService jwtTokensService) {
        this.jwtTokensService = jwtTokensService;
    }

    @Bean
    public FilterRegistrationBean<LoginFilter> loggingFilter(){
        FilterRegistrationBean<LoginFilter> registrationBean = new FilterRegistrationBean<>();

        registrationBean.setFilter(new LoginFilter(jwtTokensService));
        registrationBean.addUrlPatterns("/records/**");

        return registrationBean;
    }
}
