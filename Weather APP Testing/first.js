function getWeather() {
    const location = document.getElementById("location").value;
    const weatherResult = document.getElementById("weather-result");

    
    weatherResult.innerHTML = "";
    weatherResult.classList.remove('show');

    if (!location) {
        weatherResult.innerHTML = "<p class='error'>Please enter a location!</p>";
        return;
    }

    const apiKey = '42c8f3d865d44de48cc25025251603';
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                weatherResult.innerHTML = `<p class='error'>Error: ${data.error.message}</p>`;
            } else {
                const temperature = data.current.temp_c;
                const condition = data.current.condition.text;
                const cityName = data.location.name;
                const iconUrl = data.current.condition.icon;

                weatherResult.innerHTML = `
                    <img src="${iconUrl}" alt="weather icon" />
                    <h2>Weather in ${cityName}</h2>
                    <p><strong>Temperature:</strong> ${temperature}°C</p>
                    <p><strong>Condition:</strong> ${condition}</p>
                `;

                
                weatherResult.classList.add('show');
            }
        })
        .catch(error => {
            weatherResult.innerHTML = `<p class='error'>Error fetching weather data!</p>`;
        });
}
