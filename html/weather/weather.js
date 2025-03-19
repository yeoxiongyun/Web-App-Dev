// OPEN WEATHER MAP API

// PING
// https://api.openweathermap.org/data/2.5/weather?q=berlin&appid=094b2383d474a4e9551179ec33b06191
// PONG
// "coord":{"lon":13.4105,"lat":52.5244},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"base":"stations","main":{"temp":279.51,"feels_like":278.32,"temp_min":278.74,"temp_max":280.38,"pressure":1031,"humidity":35,"sea_level":1031,"grnd_level":1025},"visibility":10000,"wind":{"speed":1.79,"deg":0,"gust":4.02},"clouds":{"all":14},"dt":1742225570,"sys":{"type":2,"id":2009543,"country":"DE","sunrise":1742188560,"sunset":1742231607},"timezone":3600,"id":2950159,"name":"Berlin","cod":200}

const API_KEY = '4d8fb5b93d4af21d66a2948710284366'; // 094b2383d474a4e9551179ec33b06191
// const API_URL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=malaysia';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?';


// CENTRALISED IMAGES DIRECTORY
// ------------------------------------------------------------------------------------------- //
const IMAGES_DIR = '../../images/';
const images = document.querySelectorAll('img[img-dynamic-src]');  // specific images
// const images = document.getElementsByTagName('img');  //  all images
images.forEach(img => {
    const filename = img.getAttribute('img-dynamic-src') || img.src.split('/').pop();
    img.src = `${IMAGES_DIR}${filename}`;

    // Fallback Mechanic
    img.onerror = () => {
        img.src = `${IMAGES_DIR}$unknown.png`; 
    };
});
// Dynamically-added Images
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.tagName === 'IMG' && node.hasAttribute('img-dynamic-src')) {
          node.src = `$${IMAGES_DIR}$${node.getAttribute('img-dynamic-src')}`;
        }
      });
    });
 });
observer.observe(document.body, { childList: true, subtree: true });
// ------------------------------------------------------------------------------------------- //
  
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
searchBtn.addEventListener('click', ()=>{
    checkWeather(searchBox.value);
})

const searchedDict = {};
const weatherIcon = document.querySelector('.weather-icon');
// Define a mapping between weather conditions and image sources
const weatherIcons = {
    'Clear': `${IMAGES_DIR}sunny.png`,
    'Clouds': `${IMAGES_DIR}cloudy.png`,
    'Mist': `${IMAGES_DIR}fog.png`,
    'Rain': `${IMAGES_DIR}rain.png`,
    'Snow': `${IMAGES_DIR}snow.png`
};

async function updateHTMLText(data) {
    // Update items from API
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';
}

async function updateHTMLImage(currentWeather){
    // Check if the current weather condition exists in the mapping
    if (weatherIcons[currentWeather]) {
        weatherIcon.src = weatherIcons[currentWeather];  // Set the weather icon
      } 
      else { // Fallback in case no match is found
        weatherIcon.src = `$${IMAGES_DIR}unknown.png`;  // for undefined weather conditions
      }
}

async function fetchData(city) {
    try {
        const response = await fetch(API_URL + `units=metric` + `&q=${city}` + `&appid=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // If response is OK, parse JSON and return the data
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('There was a problem fetching the data:', error);
        return null;
    }
}

async function checkWeather(city) {
    const currentTime = Date.now();  // Get the current time in milliseconds
    const THIRTY_MINUTES = 30 * 60 * 1000;  // 30 minutes in milliseconds
    
    // Check if the city has been searched
    if (searchedDict[city]) {
        const { timestamp, data } = searchedDict[city];

        // Check if more than 30 minutes have passed since the data was fetched
        if (currentTime - timestamp > THIRTY_MINUTES) {
            console.log(`${city} data is older than 30 minutes, re-fetching...`);
        } else {
            console.log(`${city} has already been searched in the past 30 minutes.`);
            updateHTMLText(data); // Update the UI with the stored data
            updateHTMLImage(data.weather[0].main); // Update the weather icon
            document.querySelector('.weather').style.display = 'block';
            document.querySelector('.error').style.display = 'none';
            return; // Exit the function if data is still fresh
        }
    }

    // Fetch new weather data if the city is not in the searched list
    const data = await fetchData(city);

    if (!data){ // response.status == 404
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    }

    // Store the city and its weather data in the dictionary
    searchedDict[city] = { data, timestamp: currentTime };

    // Update items from API
    updateHTMLText(data);
    // Update images to city's weather conditions
    const currentWeather = data.weather[0].main;
    updateHTMLImage(currentWeather);

    // Show the weather data and hide the error message
    document.querySelector('.weather').style.display = 'block';
    document.querySelector('.error').style.display = 'none';
}