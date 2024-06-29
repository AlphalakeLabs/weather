function getWeather() {
    var api_key = '4b3f9217acc11edc0b248da68a61ac6e';
    var user_input = document.getElementById('city-input').value;
    var weatherInfoElement = document.getElementById('weather-info');
    var bodyElement = document.body;
 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${user_input}&units=metric&APPID=${api_key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            var weather = data.weather[0].main.toLowerCase();
            var temp_celsius = Math.round(data.main.temp);
            var temp_fahrenheit = Math.round(data.main.temp * 9 / 5 + 32);
            var humidity = data.main.humidity;
            var windSpeed = data.wind.speed;
            var windDirection = data.wind.deg;
            var pressure = data.main.pressure;
            var visibility = data.visibility;
 
            // Update weather info display
            weatherInfoElement.innerHTML = `
                <p><strong>Weather:</strong> ${weather.charAt(0).toUpperCase() + weather.slice(1)}</p>
                <p><strong>Temperature:</strong> ${temp_celsius}ºC / ${temp_fahrenheit}ºF</p>
                <p><strong>Humidity:</strong> ${humidity}%</p>
                <p><strong>Wind:</strong> ${windSpeed} m/s, ${windDirection}º</p>
                <p><strong>Pressure:</strong> ${pressure} hPa</p>
                <p><strong>Visibility:</strong> ${visibility} meters</p>
            `;
 
            // Show weather info section
            weatherInfoElement.style.display = 'block';
 
            // Add blurred class to body element
            bodyElement.classList.add('blurred');
 
            // Reset body class and set new background based on weather
            setTimeout(() => {
                bodyElement.className = 'blurred'; // This will remove all previous classes
                if (weather.includes('clear')) {
                    bodyElement.classList.add('clear');
                } else if (weather.includes('cloud')) {
                    bodyElement.classList.add('clouds');
                } else if (weather.includes('rain')) {
                    bodyElement.classList.add('rain');
                } else if (weather.includes('snow')) {
                    bodyElement.classList.add('snow');
                } else {
                    bodyElement.classList.add('default');
                }
                // Remove the blurred class after the animation completes
                setTimeout(() => {
                    bodyElement.classList.remove('blurred');
                }, 300); // Duration should match the CSS animation duration
            }, 0);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfoElement.textContent = 'City not found or error fetching data.';
        });
}

// Function to handle key press event for Enter key
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
}

// Add event listener to input field to trigger getWeather on Enter key press
var cityInput = document.getElementById('city-input');
cityInput.addEventListener('keypress', handleKeyPress);

// Function to get the user's location and display weather info
function displayUserLocationWeather() {
    var api_key = '4b3f9217acc11edc0b248da68a61ac6e';
    var userLocationWeatherElement = document.getElementById('user-location-weather');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${api_key}`)
                .then(response => response.json())
                .then(data => {
                    var location = data.name;
                    var weather = data.weather[0].main.toLowerCase();
                    var temp_celsius = Math.round(data.main.temp);
                    var temp_fahrenheit = Math.round(data.main.temp * 9 / 5 + 32);

                    userLocationWeatherElement.innerHTML = `
                        <p><strong>Location:</strong> ${location}</p>
                        <p><strong>Weather:</strong> ${weather.charAt(0).toUpperCase() + weather.slice(1)}</p>
                        <p><strong>Temperature:</strong> ${temp_celsius}ºC</p>
                    `;

                    userLocationWeatherElement.style.display = 'block';
                })
                .catch(error => {
                    console.error('Error fetching location weather data:', error);
                    userLocationWeatherElement.textContent = 'Error fetching location weather data.';
                });
        }, function(error) {
            console.error('Error getting location:', error);
            userLocationWeatherElement.textContent = 'Error getting location.';
        });
    } else {
        userLocationWeatherElement.textContent = 'Geolocation is not supported by this browser.';
    }
}

// Call the function to display user's location weather on page load
displayUserLocationWeather();
