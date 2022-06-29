const input = document.querySelector('input');
const button = document.querySelector('button');
const errorMessage = document.querySelector('.error');
const cityName = document.querySelector('.cityName');
const img = document.querySelector('img');
const temperature = document.querySelector('.temperature');
const feelTemperature = document.querySelector('.feelTemperature');
const description = document.querySelector('.temperatureDesc');
const pressure = document.querySelector('.pressure');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.windSpeed');
const date = document.querySelector('.date');

const apilink = 'https://api.openweathermap.org/data/2.5/weather?q='
const apiKey = '&appid=2f9eb0a0c7b11dcac562c9d881964b55'
const apiUnits = '&units=metric'

const checkWeather = () => {
    const city = input.value
    const URL = apilink + city + apiKey + apiUnits

    axios.get(URL).then(response => {
        console.log(response.data)

        cityName.textContent = `${response.data.name}, ${response.data.sys.country}`
        temperature.textContent = `${Math.floor(response.data.main.temp)}°C`
        feelTemperature.textContent = `${Math.floor(response.data.main.feels_like)}°C`
        pressure.textContent = `${response.data.main.pressure} hPa`
        humidity.textContent = `${response.data.main.humidity} %`
        windSpeed.textContent = `${response.data.wind.speed} km/h`
        description.textContent = `${response.data.weather[0].description}`
        img.setAttribute('src', `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
        date.textContent = `${new Date().toString().slice(4,21)}`

        errorMessage.textContent = ''
    }).catch((error) => {
        console.error(error);
        if(error.response.data.cod === '404'){
            errorMessage.textContent = "Nie ma takiej nazwy miasta";
        }else{
            errorMessage.textContent = "Wystapil nieznany blad";
        }

        [cityName, temperature, feelTemperature, pressure, humidity, windSpeed, description, date].forEach(el => {
            el.textContent = ''
            img.setAttribute('src', '')
        })
    }).finally(() => {
        input.value = ''
    })
}

const checkWeatherByEnter = e => {
    if (e.key == 'Enter') {
        checkWeather()
    }
} 
input.addEventListener('keyup', checkWeatherByEnter)  
button.addEventListener('click', checkWeather)