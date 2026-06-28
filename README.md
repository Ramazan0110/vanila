# WeatherNow

Простое и красивое веб-приложение для просмотра погоды в любом городе мира.

Проект выполнен на основе туториала: [Build a Simple Weather App With Vanilla JavaScript](https://webdesign.tutsplus.com/tutorials/build-a-simple-weather-app-with-vanilla-javascript--cms-33893) из каталога [practical-tutorials/project-based-learning](https://github.com/practical-tutorials/project-based-learning).

[![Maintainability](https://api.codeclimate.com/v1/badges/REPLACE_WITH_YOUR_BADGE/maintainability)](https://codeclimate.com/github/YOUR_USERNAME/weather-app/maintainability)

## Функционал

 Поиск погоды по названию города
 Геолокация — погода по текущему местоположению
 История последних 5 поисков (сохраняется в localStorage)
 Тёмная / светлая тема (сохраняется в localStorage)
 Прогноз погоды на 5 дней
 Обработка ошибок (город не найден, нет ключа и т.д.)
 Адаптивная вёрстка (mobile-friendly)

## Стек

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **API:** OpenWeatherMap API
- **Хранилище:** localStorage (история, тема)
- **Деплой:** Vercel

## Как запустить локально

1. Клонируй репозиторий:
   ```bash
   git clone https://github.com/Ramazan0110/medium-clone.git
   cd weather-app
   ```

2. Открой файл `app.js` и замени `YOUR_API_KEY_HERE` на твой ключ с [openweathermap.org](https://openweathermap.org/api)

3. Открой `index.html` в браузере (или запусти через Live Server в VS Code)

## Деплой

[Ссылка на деплой](https://YOUR_APP.vercel.app)

## Скриншот

![WeatherNow screenshot](screenshot.png)
