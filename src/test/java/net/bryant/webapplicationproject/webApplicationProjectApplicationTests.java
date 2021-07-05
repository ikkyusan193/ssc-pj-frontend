package net.bryant.webapplicationproject;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.persistence.EntityManager;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class webApplicationProjectApplicationTests {

    @Autowired
    private UserRepository repo;

    @Autowired
    private EntityManager entityManager;

    @Test
    void testCreateUser() {
        User user = new User();
        user.setEmail("Test2@gmail.com");
        user.setPassword("password");
        user.setFirstName("Admin2");
        user.setLastName("Test");
        User savedUser = repo.save(user);
        User existedUser = entityManager.find(User.class, savedUser.getId());
        assertThat(existedUser.getEmail().equals(user.getEmail()));
    }

}
