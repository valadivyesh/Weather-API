const apiKey = "daa1586237ea90653a21f9d170db4715";
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");

async function getWeather() {
  const city = cityInput.value.trim();

  if (city === "") {
    weatherInfo.innerHTML = "<p>Please type a city name 🙂</p>";
    return;
  }

  weatherInfo.innerHTML = "<p>Fetching weather details...</p>";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!res.ok) {
      weatherInfo.innerHTML = "<p>City not found 😕</p>";
      return;
    }

    const data = await res.json();

    weatherInfo.innerHTML = `
      <div class="city">${data.name}, ${data.sys.country}</div>
      <div class="temp">${Math.round(data.main.temp)}°C</div>
      <div class="desc">${data.weather[0].description}</div>
      <div class="details">
        Feels like ${Math.round(data.main.feels_like)}°C<br>
        Humidity ${data.main.humidity}%
      </div>
    `;
  } catch (error) {
    weatherInfo.innerHTML = "<p>Something went wrong 😔</p>";
  }
}

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") getWeather();
});
