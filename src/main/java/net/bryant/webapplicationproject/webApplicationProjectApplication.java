package net.bryant.webapplicationproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@EntityScan
@SpringBootApplication
public class webApplicationProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(webApplicationProjectApplication.class, args);
    }

}
