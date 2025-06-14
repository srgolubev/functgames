# Спортивный Фестиваль «Мама, Папа, Я» и Московские Функциональные Игры World Class

Это статический сайт для презентации и информирования о предстоящем спортивном фестивале, объединяющем семейный праздник «Мама, Папа, Я» и Московские Функциональные Игры World Class.

## Содержание репозитория
- `index.html` — главная страница проекта.
- `style.css` — стили оформления.
- `script.js` — скрипты для динамической генерации контента и интерактивности.
- `content.json` — конфигурация и текстовый контент сайта.
- `assets/` — папка с изображениями и видео.

## Локальный запуск
Для корректной работы сайта (особенно при загрузке JSON и видео) рекомендуется использовать локальный HTTP-сервер. Например, из корня проекта:
```bash
python -m http.server 8000
# или любой другой сервер по вашему выбору
```
Затем откройте в браузере http://localhost:8000

## План улучшений
1. Добавить README и документацию по разработке (этот файл).
2. Настроить систему линтинга и форматирования (ESLint, Prettier, Stylelint) и добавить pre-commit хуки.
3. Организовать процесс сборки (Webpack, Rollup или аналог) для модульного JS и оптимизации CSS.
4. Оптимизировать и конвертировать изображения в WebP, добавить lazy loading.
5. Улучшить доступность (WCAG): добавить ARIA-метки, обеспечить управление с клавиатуры, проверить контрастность.
6. Разбить `script.js` на модули, вынести шаблоны рендеринга в отдельные функции и улучшить обработку ошибок.
7. Добавить тесты для функций рендеринга (Jest) и e2e-тестирование пользовательских сценариев (Cypress).
8. Интегрировать CI/CD: GitHub Actions или аналог для автоматического линтинга, тестов и деплоя.
9. Добавить i18n-поддержку для нескольких языков.
10. Реализовать темную тему и переключатель светлой/темной схемы.

_Документация и остальные задачи по плану будут реализованы поэтапно._