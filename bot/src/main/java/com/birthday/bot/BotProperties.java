package com.birthday.bot;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "bot")
public record BotProperties(String token, String username, String webappUrl) {}
