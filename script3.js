const form = document.getElementById('location-form');
const locationInput = document.getElementById('location-input');
const weatherInfo = document.getElementById('weather-info');
const weatherAnimation = document.getElementById('weather-animation');
const weatherDetails = document.getElementById('weather-details');

const apiKey = 'bd5e378503939ddaee76f12ad7a97608'; 

// Event listener for form submission
form.addEventListener('submit', e => {
  e.preventDefault();
  const location = locationInput.value.trim();
  if (location) {
    getWeather(location);
    locationInput.value = '';
  } else {
    alert('Please enter a location.');
  }
});

// Function to fetch weather data from API
async function getWeather(location) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
    const weatherData = await response.json();
    console.log(weatherData);

    // Display weather information
    const { name, main, weather, sys, wind } = weatherData;
    const temperature = main.temp;
    const description = weather[0].description;
    const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(sys.sunset * 1000).toLocaleTimeString();
    const windSpeed = wind.speed;
    const humidity = main.humidity;

    weatherInfo.innerHTML = `
      <h2>${name}</h2>
      <p>Temperature: ${temperature} &deg;C</p>
      <p>Description: ${description}</p>
    `;

    weatherDetails.innerHTML = `
      <p>Sunrise: ${sunrise}</p>
      <p>Sunset: ${sunset}</p>
      <p>Wind Speed: ${windSpeed} m/s</p>
      <p>Humidity: ${humidity}%</p>
    `;

    updateWeatherAnimation(weather[0].main.toLowerCase());

  } catch (error) {
    console.error('Error fetching weather data:', error);
    alert('Failed to fetch weather data. Please try again.');
  }
}

// Function to update the weather animation
function updateWeatherAnimation(weatherCondition) {
  weatherAnimation.innerHTML = '';

  if (weatherCondition.includes('cloud')) {
    const cloud = document.createElement('div');
    cloud.className = 'cloud';
    weatherAnimation.appendChild(cloud);
  } else if (weatherCondition.includes('clear')) {
    const sunny = document.createElement('div');
    sunny.className = 'sunny';
    weatherAnimation.appendChild(sunny);
  } else if (weatherCondition.includes('thunderstorm')) {
    const thunderstorm = document.createElement('div');
    thunderstorm.className = 'thunderstorm';
    weatherAnimation.appendChild(thunderstorm);
  } else if (weatherCondition.includes('wind')) {
    const windy = document.createElement('div');
    windy.className = 'windy';
    weatherAnimation.appendChild(windy);
  }
}



