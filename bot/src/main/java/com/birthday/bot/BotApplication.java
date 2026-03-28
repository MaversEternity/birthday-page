package com.birthday.bot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(BotProperties.class)
public class BotApplication {

    static void main(String[] args) {
        SpringApplication.run(BotApplication.class, args);
    }
}
