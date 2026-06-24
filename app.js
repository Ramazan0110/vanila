const API_KEY = "580282e9c420a1ee1d71a1eb6db9f596";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const geoBtn = document.getElementById("geoBtn");
const errorMsg = document.getElementById("errorMsg");
const weatherCard = document.getElementById("weatherCard");
const forecastSection = document.getElementById("forecastSection");
const forecastGrid = document.getElementById("forecastGrid");
const loader = document.getElementById("loader");
const themeToggle = document.getElementById("themeToggle");
const historySection = document.getElementById("historySection");
const historyChips = document.getElementById("historyChips");
const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");
const visibility = document.getElementById("visibility");

let searchHistory = JSON.parse(localStorage.getItem("weatherHistory")) || [];

const savedTheme = localStorage.getItem("weatherTheme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("weatherTheme", next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeToggle.querySelector(".theme-icon").textContent =
    theme === "dark" ? "Light" : "Dark";
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
  }
});

geoBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    showError("Геолокация не поддерживается вашим браузером.");
    return;
  }
  showLoader(true);
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      fetchWeatherByCoords(latitude, longitude);
    },
    () => {
      showLoader(false);
      showError("Не удалось определить местоположение. Проверьте разрешения.");
    },
  );
});

async function fetchWeather(city) {
  showLoader(true);
  showError("");
  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=ru`,
      ),
      fetch(
        `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=ru`,
      ),
    ]);
    if (!currentRes.ok) {
      if (currentRes.status === 404)
        throw new Error("Город не найден. Проверьте название.");
      if (currentRes.status === 401) throw new Error("Неверный API ключ.");
      throw new Error("Ошибка сервера. Попробуйте позже.");
    }
    const current = await currentRes.json();
    const forecast = await forecastRes.json();
    renderWeather(current);
    renderForecast(forecast);
    addToHistory(current.name);
  } catch (err) {
    showError(err.message);
    weatherCard.style.display = "none";
    forecastSection.style.display = "none";
  } finally {
    showLoader(false);
  }
}

async function fetchWeatherByCoords(lat, lon) {
  showError("");
  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ru`,
      ),
      fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ru`,
      ),
    ]);
    if (!currentRes.ok) throw new Error("Ошибка получения данных.");
    const current = await currentRes.json();
    const forecast = await forecastRes.json();
    renderWeather(current);
    renderForecast(forecast);
    addToHistory(current.name);
    cityInput.value = current.name;
  } catch (err) {
    showError(err.message);
  } finally {
    showLoader(false);
  }
}

function renderWeather(data) {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temp.textContent = Math.round(data.main.temp);
  description.textContent = data.weather[0].description;
  humidity.textContent = `${data.main.humidity}%`;
  wind.textContent = `${Math.round(data.wind.speed)} м/с`;
  feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
  visibility.textContent = `${(data.visibility / 1000).toFixed(1)} км`;
  weatherIcon.textContent = getWeatherLabel(data.weather[0].id);
  weatherCard.style.display = "block";
}

function renderForecast(data) {
  const dailyMap = {};
  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toLocaleDateString("ru-RU", {
      weekday: "short",
      day: "numeric",
    });
    const hour = date.getHours();
    if (
      !dailyMap[dayKey] ||
      Math.abs(hour - 12) <
        Math.abs(new Date(dailyMap[dayKey].dt * 1000).getHours() - 12)
    ) {
      dailyMap[dayKey] = item;
    }
  });
  const days = Object.entries(dailyMap).slice(0, 5);
  forecastGrid.innerHTML = "";
  days.forEach(([dayLabel, item]) => {
    const el = document.createElement("div");
    el.className = "forecast-item";
    el.innerHTML = `
      <span class="forecast-day">${dayLabel}</span>
      <span class="forecast-icon">${getWeatherLabel(item.weather[0].id)}</span>
      <span class="forecast-temp">${Math.round(item.main.temp)}°</span>
      <span class="forecast-min">${Math.round(item.main.temp_min)}°</span>
    `;
    forecastGrid.appendChild(el);
  });
  forecastSection.style.display = "block";
}

function addToHistory(city) {
  searchHistory = [
    city,
    ...searchHistory.filter((c) => c.toLowerCase() !== city.toLowerCase()),
  ].slice(0, 5);
  localStorage.setItem("weatherHistory", JSON.stringify(searchHistory));
  renderHistory();
}

function renderHistory() {
  if (searchHistory.length === 0) {
    historySection.style.display = "none";
    return;
  }
  historySection.style.display = "block";
  historyChips.innerHTML = "";
  searchHistory.forEach((city) => {
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.textContent = city;
    chip.addEventListener("click", () => {
      cityInput.value = city;
      fetchWeather(city);
    });
    historyChips.appendChild(chip);
  });
}

function showError(msg) {
  errorMsg.textContent = msg;
}

function showLoader(show) {
  loader.style.display = show ? "flex" : "none";
  if (show) {
    weatherCard.style.display = "none";
    forecastSection.style.display = "none";
  }
}

function getWeatherLabel(code) {
  if (code >= 200 && code < 300) return "Storm";
  if (code >= 300 && code < 400) return "Drizzle";
  if (code >= 500 && code < 600) return "Rain";
  if (code >= 600 && code < 700) return "Snow";
  if (code >= 700 && code < 800) return "Fog";
  if (code === 800) return "Clear";
  if (code === 801) return "Partly cloudy";
  if (code === 802) return "Cloudy";
  if (code >= 803) return "Overcast";
  return "—";
}

renderHistory();
