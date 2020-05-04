  
const api = {
    key: "d641b66a4d45fb4814b3a63f5c407153",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
    //   13 is 'Enter' on keyboard
  
  function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
  }
// weather is equal to ? and (searchbox) (q)query is equal to query
// units are imperial and APPID is equal to api.key

function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    //   puts txt as name of location entered

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
    // sets date using datebuilder function

    let temp = document.querySelector('.current .temp');
    // gets current temp
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°f</span>`;
    // Rounds main temp to degrees f
    let weather_el = document.querySelector('.current .weather');
    // sets weather_el to location.current.weather
    weather_el.innerText = weather.weather[0].main;
    // sets inner text to the weather of current location
    let hilow = document.querySelector('.hi-low');
    hilow.innerHTML = `high of (${Math.round(weather.main.temp_max)}) °f <br>
     low of (${Math.round(weather.main.temp_min)}) °f `;
    // sets hi-low innertext to a rounded min temperature (weather.main.temp_min)in °f and 
    // sets hi-low innertext to a rounded max temperature (weather.main.temp_max) in °f

}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }

