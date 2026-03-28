package com.birthday.bot;

import org.springframework.stereotype.Component;
import org.telegram.telegrambots.client.okhttp.OkHttpTelegramClient;
import org.telegram.telegrambots.longpolling.interfaces.LongPollingUpdateConsumer;
import org.telegram.telegrambots.longpolling.starter.SpringLongPollingBot;
import org.telegram.telegrambots.longpolling.util.LongPollingSingleThreadUpdateConsumer;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.InlineKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.InlineKeyboardButton;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.InlineKeyboardRow;
import org.telegram.telegrambots.meta.api.objects.webapp.WebAppInfo;
import org.telegram.telegrambots.meta.generics.TelegramClient;

@Component
public class BirthdayBot implements SpringLongPollingBot, LongPollingSingleThreadUpdateConsumer {

    private final BotProperties properties;
    private final TelegramClient telegramClient;

    public BirthdayBot(BotProperties properties) {
        this.properties = properties;
        this.telegramClient = new OkHttpTelegramClient(properties.token());
    }

    @Override
    public String getBotToken() {
        return properties.token();
    }

    @Override
    public LongPollingUpdateConsumer getUpdatesConsumer() {
        return this;
    }

    @Override
    public void consume(Update update) {
        if (!update.hasMessage() || !update.getMessage().hasText()) return;

        long chatId = update.getMessage().getChatId();
        String text = update.getMessage().getText();

        switch (text) {
            case "/start" -> sendMagicalInvitation(chatId);
            case "/chatid" -> send(chatId, "Твой chat ID: `%d`".formatted(chatId));
            default -> send(chatId, "Отправь /start, чтобы получить волшебное письмо.");
        }
    }

    public void sendMagicalInvitation(long chatId) {
        var webAppButton = InlineKeyboardButton.builder()
                .text("\uD83D\uDD2E Открыть письмо")
                .webApp(new WebAppInfo(properties.webappUrl()))
                .build();

        var keyboard = InlineKeyboardMarkup.builder()
                .keyboardRow(new InlineKeyboardRow(webAppButton))
                .build();

        var message = SendMessage.builder()
                .chatId(chatId)
                .text("""
                        ✨ *Тебе пришло волшебное письмо...* ✨

                        Кто-то наложил заклинание специально для тебя.
                        Открой — если не боишься. 🪄""")
                .parseMode("Markdown")
                .replyMarkup(keyboard)
                .build();

        try {
            telegramClient.execute(message);
        } catch (Exception e) {
            System.err.println("Failed to send invitation: " + e.getMessage());
        }
    }

    private void send(long chatId, String text) {
        try {
            telegramClient.execute(SendMessage.builder()
                    .chatId(chatId)
                    .text(text)
                    .parseMode("Markdown")
                    .build());
        } catch (Exception e) {
            System.err.println("Failed to send message: " + e.getMessage());
        }
    }
}
