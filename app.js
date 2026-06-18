const API_KEY = '';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';


const cityInput   = document.getElementById('cityInput');
const searchBtn   = document.getElementById('searchBtn');
const errorMsg    = document.getElementById('errorMsg');
const weatherCard = document.getElementById('weatherCard');
const loader      = document.getElementById('loader');
 
const cityName    = document.getElementById('cityName');
const weatherIcon = document.getElementById('weatherIcon');
const temp        = document.getElementById('temp');
const description = document.getElementById('description');
const humidity    = document.getElementById('humidity');
const wind        = document.getElementById('wind');
const feelsLike   = document.getElementById('feelsLike');
const visibility  = document.getElementById('visibility');
 

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});
 
cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
  }
});
 

async function fetchWeather(city) {
  showLoader(true);
  showError('');
  try {
    const res = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=ru`
    );
 
    if (!res.ok) {
      if (res.status === 404) throw new Error('Город не найден. Проверьте название.');
      if (res.status === 401) throw new Error('Неверный API ключ.');
      throw new Error('Ошибка сервера. Попробуйте позже.');
    }
 
    const data = await res.json();
    renderWeather(data);
  } catch (err) {
    showError(err.message);
    weatherCard.style.display = 'none';
  } finally {
    showLoader(false);
  }
}
 

function renderWeather(data) {
  cityName.textContent    = `${data.name}, ${data.sys.country}`;
  temp.textContent        = Math.round(data.main.temp);
  description.textContent = data.weather[0].description;
  humidity.textContent    = `${data.main.humidity}%`;
  wind.textContent        = `${Math.round(data.wind.speed)} м/с`;
  feelsLike.textContent   = `${Math.round(data.main.feels_like)}°C`;
  visibility.textContent  = `${(data.visibility / 1000).toFixed(1)} км`;
  weatherIcon.textContent = getWeatherLabel(data.weather[0].id);
  weatherCard.style.display = 'block';
}
 

function showError(msg) { errorMsg.textContent = msg; }
 
function showLoader(show) {
  loader.style.display = show ? 'flex' : 'none';
  if (show) weatherCard.style.display = 'none';
}
 
function getWeatherLabel(code) {
  if (code >= 200 && code < 300) return 'Storm';
  if (code >= 300 && code < 400) return 'Drizzle';
  if (code >= 500 && code < 600) return 'Rain';
  if (code >= 600 && code < 700) return 'Snow';
  if (code >= 700 && code < 800) return 'Fog';
  if (code === 800) return 'Clear';
  if (code === 801) return 'Partly cloudy';
  if (code === 802) return 'Cloudy';
  if (code >= 803) return 'Overcast';
  return '—';
}
