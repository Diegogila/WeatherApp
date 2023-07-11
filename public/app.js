document.addEventListener('DOMContentLoaded', () => {
    const weatherForm = document.getElementById('weatherForm');
    const locationInput = document.getElementById('locationInput');
    const weatherResult = document.getElementById('weatherResult');
    const locationName = document.getElementById('locationName');
    const temperature = document.getElementById('temperature');
    const weatherDescription = document.getElementById('weatherDescription');
    const windSpeed = document.getElementById('windSpeed');
    const windDirection = document.getElementById('windDirection');
    const pressure = document.getElementById('pressure');
    const humidity = document.getElementById('humidity');
  
    weatherForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const location = locationInput.value;
      if (!location) {
        return;
      }
  
      try {
        const response = await fetch(`/weather?location=${location}`);
        const weatherData = await response.json();
  
        if (response.ok) {
          locationName.textContent = weatherData.location.name;
          temperature.textContent = weatherData.current.temperature;
          weatherDescription.textContent = weatherData.current.weather_descriptions[0];
          windSpeed.textContent = weatherData.current.wind_speed;
          windDirection.textContent = weatherData.current.wind_dir;
          pressure.textContent = weatherData.current.pressure;
          humidity.textContent = weatherData.current.humidity;
  
          weatherResult.style.display = 'block';
        } else {
          weatherResult.textContent = weatherData.error;
        }
      } catch (error) {
        console.error(error);
        weatherResult.textContent = 'Ocurrió un error al consultar el clima.';
      }
    });
  });