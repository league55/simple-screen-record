package recordsmanager.services.login;

public interface LoginService {

    /**
     * @param username - user name
     * @return Encoded token to be added as a header TOKEN
     */
    String login(String username);

}
