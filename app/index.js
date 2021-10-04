// const {Weather}=require('./Weather.js')
//const {UI}=require('./UI.js')
//const {Store}=require('./Store.js')

// Recordar que hay que usar un requiere solo que ahorita no nos lo permite el programa
class Weather {

    constructor(city, countryCode) {
        this.apiKey = '6f843d79b03ffdcaf6cd412913fec7e0';
        this.city = city;
        this.countryCode = countryCode;
    }
    async getWeather() {
        const URI = `https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.countryCode}}&appid=${this.apiKey}&units=metric`
        const response = await fetch(URI)
        const data = await response.json();
        return data;
    }
    changeLocation(city, countryCode) {
        this.city = city;
        this.countryCode = this.countryCode;
    }
}
// Recordar que hay que usar un requiere solo que ahorita no nos lo permite el programa
class Store {
    constructor() {
        this.city;
        this.countryCode;
        this.defaultCity = 'London';
        this.defaultCountry = 'UK';
    }
    getLocationData() {
        if (localStorage.getItem('city' == null)) {
            this.city = this.defaultCity;
            this.countryCode = this.countryCode;
            
        } else {
            
            this.city = localStorage.getItem('city');
            this.countryCode = localStorage.getItem('countryCode');
        }
        return {
            city: this.city,
            countryCode: this.countryCode
        }
        
    }
    setLocationData(city, countryCode) {
        localStorage.setItem('city', city);
        localStorage.setItem('countryCode', countryCode);
    }
}
// Recordar que hay que usar un requiere solo que ahorita no nos lo permite el programa
class UI {
    constructor() {
        this.location = document.getElementById('weather-location');
        this.description = document.getElementById('weather-description');
        this.string = document.getElementById('weather-string');
        this.humidity = document.getElementById('weather-humidity');
        this.wind = document.getElementById('weather-wind');
        this.img=document.getElementById('imgClima');
    }

    render(weather) {
        this.location.textContent = weather.name + "/" + weather.sys.country;
        this.description.textContent = weather.weather[0]['description']
        this.string.textContent = weather.main.temp + "°C"
        this.humidity.textContent = "Humidity: " + weather.main.humidity + "%"
        this.wind.textContent = "Wind: " + weather.wind.speed + " m/s"
        this.img.setAttribute('src',`http://openweathermap.org/img/w/${weather.weather[0]['icon']}.png`);
    }

}
const store = new Store();
const { city, countryCode } = store.getLocationData();
const weather = new Weather(city, countryCode);
const ui = new UI();

async function fetchWeather() {
    const data = await weather.getWeather();
    console.log(data);
    ui.render(data);


}
document.getElementById('w-change-btn').addEventListener('click', (e) => {
    const city = document.getElementById('city').value;
    const countryCode = document.getElementById('countryCode').value;
    weather.changeLocation(city, location);
    store.setLocationData(city, location);
    fetchWeather();
    e.preventDefault();

})

document.addEventListener('DOMContentLoaded', fetchWeather);