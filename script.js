
const WEATHER_API_KEY = '3e8aa203fe534309893140755232803';

const temperatureDescription = document.querySelector('.temperature_description');
const gustDescription = document.querySelector('.gust_description');
const temperature_degree = document.querySelector('.temperature_degree');
const locationTimeZone = document.querySelector('.location_timezone');
const weatherIconImg = document.querySelector('.weatherIconImg');
const degreeSection = document.querySelector('.degree_section');
const temperatureUnit = document.querySelector('.temperature_unit');
const humidityDescription = document.querySelector('.humidity_description');


// humidity_description


window.addEventListener('load', () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            // By Longitube and latitude -
            const locationQuery = lat + ',' + long;

            // By City Name -
            // const locationQuery = 'imphal';

            const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${locationQuery}`;

            fetch(weatherUrl)
                .then((res) => res.json())
                .then((data) => {
                    const { temp_c, temp_f, gust_kph, humidity, condition: { text: weatherText, icon } } = data.current;
                    console.log(temp_c, temp_f, gust_kph, weatherText);
                    console.log(icon);

                    const iconPath = icon.replace('//cdn.weatherapi.com', '.')
                    const { name, country } = data.location
                    console.log('path', iconPath);
                    // render View - 
                    renderView(temp_c, temp_f, gust_kph, humidity, weatherText, icon, name, country);
                });




        });
    } else {
        alert('location denied');
    };
});



const renderView = (temp_c, temp_f, gust_kph, humidity, weatherText, icon, name, country) => {
    temperature_degree.textContent = temp_c + '℃';
    temperatureUnit.textContent = '℃';
    temperatureDescription.textContent = weatherText;
    gustDescription.textContent = gust_kph + 'km/h';
    humidityDescription.textContent = humidity + '%';

    locationTimeZone.textContent = `${name}, ${country}`;
    weatherIconImg.src = icon;

    // Change Weather Unit on Click
    degreeSection.addEventListener("click", () => {
        let unit = temperatureUnit.textContent.slice(1);

        if (unit == "C") {
            temperatureUnit.textContent = "℉";
            temperature_degree.textContent = temp_f;
        } else {
            temperatureUnit.textContent = "℃";
            temperature_degree.textContent = temp_c;
        }
    })
}

