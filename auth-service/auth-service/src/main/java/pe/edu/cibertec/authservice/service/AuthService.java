package pe.edu.cibertec.authservice.service;

import pe.edu.cibertec.authservice.entity.User;

public interface AuthService {
    User register(User user);
    String login(String username, String password);
}
