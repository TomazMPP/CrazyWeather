document.addEventListener('DOMContentLoaded', function() {
  const apiKey = 'QG8JA7KU2KNDPCF2VAJXXRS4H';
  const submitBtn = document.getElementById('checkbutton');
  const weatherData = document.getElementById('weather-data');
  const errorMessage = document.getElementById('error-message');
  const details = document.querySelector('.details');
  const temperatureElement = weatherData.querySelector('.temperature');
  const descriptionElement = weatherData.querySelector('.description');
  const feelslikeElement = document.getElementById('feelslike');
  const humidityElement = document.getElementById('humidity');
  const windspeedElement = document.getElementById('windspeed');
  const iconElement = weatherData.querySelector('.icon')

  submitBtn.addEventListener('click', function() {
    const cityName = document.getElementById('cityName').value;

    if (cityName !== '') {
      const encodedCityName = encodeURIComponent(cityName);
      const api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedCityName}?unitGroup=metric&key=${apiKey}&contentType=json`;

      fetch(api)
        .then(response => response.json())
        .then(data => {
          const description = data.days[0].description;
          const temperature = data.currentConditions.temp;
          const feelslike = data.currentConditions.feelslike;
          const humidity = data.currentConditions.humidity;
          const windspeed = data.currentConditions.windspeed;
          const icon = data.days[0].icon;

          iconElement.innerHTML = `<img src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Monochrome/${icon}.png">`
          temperatureElement.innerHTML = `<h3>${temperature}°C</h3>`;
          descriptionElement.innerHTML = `<h5>${description}</h5>`;
          feelslikeElement.innerHTML = `${feelslike}°C`;
          humidityElement.innerHTML = `${humidity}%`;
          windspeedElement.innerHTML = `${windspeed}m/s`;

          details.style.display = 'flex';
          errorMessage.style.display = 'none';
          weatherData.style.display = 'block';
        })
        .catch(error => {
          console.error(error);
          errorMessage.innerHTML = "<h3>An error happened, please try again</h3>";
          errorMessage.style.display = 'block';
          weatherData.style.display = 'none';
        });
    } else {
      errorMessage.innerHTML = "<h3>Please enter a city name</h3>";
      errorMessage.style.display = 'block';
      weatherData.style.display = 'none';
    }
  });
});
