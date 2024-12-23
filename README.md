Headed run - browser opens and visible
Headless run - browser open in background

# Проект автоматизированного тестирования для Lalafo

## Описание
Этот проект выполняет автоматизированные тесты для веб-сайта [Lalafo](https://lalafo.kg/), включая проверки безопасности и валидации форм. Мы используем Playwright и применяем Page Object Model (POM) для организации тестов, что делает код более структурированным и читаемым.

### Основные тесты:
1. **Проверка минимальных требований к паролю** — проверяет, что пароль не может быть менее 5 символов.
2. **Проверка защиты cookies и сессий** — проверяет флаги безопасности и завершение сессии.
3. **Проверка HTTPS-запросов** — отслеживает запросы при взаимодействии с формами и проверяет, что запросы содержат необходимые заголовки и параметры безопасности.


## Требования
- Node.js (рекомендуется версия 14 и выше)
- Playwright

## Установка
1. Установите все зависимости:
   ```bash
   npm install
