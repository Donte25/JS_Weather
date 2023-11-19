const apiKey = 'ac5f419f66c3f46ffcf2228677e9db69';

const getWeather = async (e) => {
    e.preventDefault();
    const location = document.getElementById('location').value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`;
    const response = await fetch(apiUrl);
    const error = document.querySelector('.error');
    if (response.ok) {
        error.style.display = 'none';
        const data = await response.json();
        displayWeather(data);
    } else {
        error.style.display = 'block';
    }
}

const displayWeather = (data) => {
    const error = document.querySelector('.no-data')

    if (data) {
        error.style.display = 'none';
        const temp = data.main.temp;
        const city = data.name;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const minTemp = data.main.temp_min;
        const maxTemp = data.main.temp_max;

        document.querySelector('.temp').textContent = `${parseInt(temp)} °F`;
        document.querySelector('.min_temp').textContent = `${parseInt(minTemp)} °F`;
        document.querySelector('.max_temp').textContent = `${parseInt(maxTemp)} °F`;
        document.querySelector('.city').textContent = `${city}`;
        document.querySelector('.humidity').textContent = `${humidity}%`;
        document.querySelector('.wind').textContent = `${windSpeed} mph`;

        const weatherIcon = document.querySelector('.weather-icon');

        if (data.weather[0].main == 'Clouds') {
            weatherIcon.src = 'http://upload.wikimedia.org/wikipedia/commons/8/8d/Cumulus_clouds_Montenegro.jpg';
        } else if (data.weather[0].main == 'Clear') {
            weatherIcon.src = 'https://tse4.mm.bing.net/th?id=OIP.cUJMV5xpK0w6B_CAPOwL6gHaEo&pid=Api&P=0&h=220';
        } else if (data.weather[0].main == '') {
            weatherIcon.src = 'https://giffiles.alphacoders.com/105/105408.gif';
        } else if (data.weather[0].main == 'Drizzle') {
            weatherIcon.src = 'https://tse2.mm.bing.net/th?id=OIP.9YWTpA-g4YvROPYgEZWAVQHaFj&pid=Api&P=0&h=220';
        } else if (data.weather[0].main == 'Mist') {
            weatherIcon.src = 'https://climate.nasa.gov/system/news_items/main_images/2610_drizzle-1280px-90.jpg';
        } else {
            weatherIcon.src = './images/snow.png';
        }

        const tempColor = document.querySelector('.main-div');
        
        if (data.main.temp >= 80) {
            tempColor.style.background = 'linear-gradient(to bottom right, red, orange)'
        } else if (data.main.temp >= 40 && data.main.temp < 80 ) {
            tempColor.style.background = 'linear-gradient(to bottom right, blue, #ffb300)'
        } else {
            tempColor.style.background = 'linear-gradient(to bottom right, #0400ff, #00ffff)'
        }

        document.querySelector('.weather').style.display = 'block';

    } else {
        error.style.display = 'block';
    }
}