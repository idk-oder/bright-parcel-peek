const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function getWeatherByCoords(
  lat: number,
  lon: number
) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Weather API failed");
  }

  const data = await res.json();

  return {
    condition: data.weather[0].main,        // Rain, Clear, Clouds, Thunderstorm
    description: data.weather[0].description,
    temperature: data.main.temp,
    windSpeed: data.wind.speed
  };
}
