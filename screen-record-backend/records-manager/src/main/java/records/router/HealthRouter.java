package records.router;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;
import records.handlers.HealthHandler;

@Configuration
public class HealthRouter {

    @Bean
    public RouterFunction<ServerResponse> route(HealthHandler healthHandler) {
        return RouterFunctions
                .route(RequestPredicates.GET("/health").and(RequestPredicates.accept(MediaType.ALL)), healthHandler::health);
    }
}
