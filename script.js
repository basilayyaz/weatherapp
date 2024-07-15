
const apiKey = '27f7d49ce5b306e2eee6b29a49296f31'; 
document.getElementById('fetchWeather').addEventListener('click', () => {
    const location = document.getElementById('locationInput').value;
    if (location) {
        getWeatherByLocation(location);
    }
});

function getWeatherByLocation(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                handleError(data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            handleError('Unable to fetch weather data.');
        });
}

function displayWeather(data) {
    const location = document.getElementById('location');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');

    location.textContent = `Location: ${data.name}, ${data.sys ? data.sys.country : 'Unknown'}`;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    description.textContent = `Weather: ${data.weather[0].description}`;
}

function handleError(message) {
    const location = document.getElementById('location');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');

    location.textContent = '';
    temperature.textContent = '';
    description.textContent = `Error: ${message}`;
}

// Use Geolocation API to get user's current location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    displayWeather(data);
                } else {
                    handleError(data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                handleError('Unable to fetch weather data.');
            });
    });
} else {
    console.log('Geolocation is not supported by this browser.');
}
