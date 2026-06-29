# WeatherNow

Простое веб-приложение для просмотра погоды в любом городе мира. Построено на Vanilla JavaScript с использованием OpenWeatherMap API.

Проект выполнен на основе туториала: [Build a Simple Weather App With Vanilla JavaScript](https://webdesign.tutsplus.com/tutorials/build-a-simple-weather-app-with-vanilla-javascript--cms-33893) из каталога [practical-tutorials/project-based-learning](https://github.com/practical-tutorials/project-based-learning).

[![Maintainability](https://qlty.sh/gh/Ramazan0110/projects/vanila/maintainability.svg)](https://qlty.sh/gh/Ramazan0110/projects/vanila)

## Функционал

- Поиск погоды по названию города
- Геолокация — погода по текущему местоположению
- История последних 5 поисков (сохраняется в localStorage)
- Тёмная / светлая тема (сохраняется в localStorage)
- Прогноз погоды на 5 дней
- Обработка ошибок (город не найден, неверный ключ и т.д.)
- Адаптивная вёрстка (mobile-friendly)

## Стек

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Backend:** отсутствует
- **DB:** отсутствует (данные хранятся в localStorage)
- **API:** OpenWeatherMap API
- **Деплой:** Vercel

## Как запустить локально

1. Клонируй репозиторий:
   ```bash
   git clone https://github.com/Ramazan0110/vanila.git
   cd vanila
   ```

2. Открой файл `app.js` и замени `YOUR_API_KEY_HERE` на свой ключ с [openweathermap.org](https://openweathermap.org/api)

3. Открой `index.html` в браузере (или через Live Server в VS Code)

## Деплой

https://vanila-lac.vercel.app