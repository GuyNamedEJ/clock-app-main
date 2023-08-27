// UI Elements
let toggleDetails = document.getElementById("toggle-details");
let detailsSection = document.getElementById("details-section");
let quoteSection = document.getElementById("quote-section");
let timeDisplay = document.getElementById("time");
let dayOfYearDisplay = document.getElementById("day-of-year-display");
let dayOfWeekDisplay = document.getElementById("day-of-week-display");
let timezoneAbbreviation = document.getElementById("tz-abbreviation");
let timezoneDisplay = document.getElementById("timezone-display");
let weekNumberDisplay = document.getElementById("week-number-display");
let quoteDisplay = document.getElementById("quote");
let authorDisplay = document.getElementById("author");
let locationDisplay = document.getElementById("location");
let greeting = document.getElementById("time-of-day");

// variables
let userIP;
let city;
let state;
let seconds = 0;
let userTimezone;

// Media Queries
let desktop = window.matchMedia("(min-width: 1400px)");
let tablet = window.matchMedia("(max-width: 768px)");
let mobile = window.matchMedia("(min-width: 376px) and (max-width: 767px)");
let small = window.matchMedia("(max-width: 375px)");

// API URLS
const GEO_IP_URL = `https://ipapi.co/json/`;
const WORLD_TIME_URL = "https://worldtimeapi.org/api/ip/";
const QUOTABLE_URL = "https://api.quotable.io/quotes/random";



/**
 * Get the time data from the World Time API
 * Pass the data to the updateDisplay function
 */

async function getTime(){
  let response = await fetch(WORLD_TIME_URL)
  let timeData = await response.json();
  updateDisplay(timeData)
}

/**
 * Get the City, State based on the user's IP
 * Set the location to the city and state
 *  */ 
async function getLocation(){
  const response = await fetch(GEO_IP_URL);
  const data = await response.json();
  city = data.city;
  state = data.region;
  setLocation(city, state);
}

/**
 * Get the a quote and display it on the page
 */
async function getQuote(){
  const response = await fetch(QUOTABLE_URL)
  const data = await response.json()
  displayRandomQuote(data[0])
}

/**
 * 
 * @param {*} timeData 
 */

function updateDisplay(timeData) {
  timezone = timeData["timezone"];
  userTimezone = timezone
  setTimeDetails(timeData)
  setTime();
  timezoneDisplay.textContent = timezone.replace("_", " ");
  timezoneAbbreviation.textContent = timeData["abbreviation"];
}

function setTime(){
  let date = new Date()
  let time = date.toLocaleTimeString("en-US",{timeZone: `${userTimezone}`, hour: "2-digit", minute: "2-digit", hour12: false}).slice(0,5);
  let hours = parseInt(time.slice(0,2))
  setGreeting(hours)
  timeDisplay.textContent = time;
}

function setTimeDetails(timeData){
  dayOfYearDisplay.textContent = timeData["day_of_year"];
  dayOfWeekDisplay.textContent = timeData["day_of_week"];
  weekNumberDisplay.textContent = timeData["week_number"];
}

function displayRandomQuote(randomQuoteObj) {
  quoteDisplay.textContent = '"' + randomQuoteObj.content + '"';
  authorDisplay.textContent = randomQuoteObj.author;
}

function setLocation(city, state) {
  locationDisplay.textContent = `in ${city}, ${state}`
}

function showHide() {
  let buttonText = document.getElementById("button-text");
  let arrow = document.getElementById("arrow");

  if (quoteSection.style.display === "none") {
    quoteSection.style.display = "block";
  } else {
    quoteSection.style.display = "none";
  }

  if (detailsSection.style.display === "flex") {
    detailsSection.style.display = "none";
    buttonText.textContent = "More";
    arrow.style.transform = "rotate(" + 360 + "deg)";
  } else {
    detailsSection.style.display = "flex";
    arrow.style.transform = "rotate(" + 180 + "deg)";
    buttonText.textContent = "Less";
  }
}

function setGreeting(hours) {
  

  if (hours >= 0 && hours <= 11) {
    document.getElementById("time-icon").src = "/assets/desktop/icon-sun.svg";
    greeting.textContent = "Good Morning, it's currently";
    document.body.style.background =
        "url('https://source.unsplash.com/random/?morning/') rgba(0, 0, 0, 0.3)";

    // if (desktop.matches) {
    //   document.body.style.background =
    //     "url('https://source.unsplash.com/random/?morning/') rgba(0, 0, 0, 0.3)";
    // }
    // if (tablet.matches) {
    //   document.body.style.background =
    //   "url('https://source.unsplash.com/random/?morning/') rgba(0, 0, 0, 0.3)";
    // }

    // if (mobile.matches || small.matches) {
    //   document.body.style.background =
    //     "url('https://source.unsplash.com/random/?morning/') rgba(0, 0, 0, 0.3)";
    // }
  }

  if (hours >= 12 && hours <= 17) {
    greeting.textContent = "Good Afternoon, its currently";
    document.body.style.background =
        "url('https://source.unsplash.com/random/?afternoon/') rgba(0, 0, 0, 0.3)";
  }

  if ((hours >= 18 && hours <= 23)) 
  {
    greeting.textContent = "Good evening, it's currently";
    document.getElementById("time-icon").src = "/assets/desktop/icon-moon.svg";
    document.body.style.background =
        "url('https://source.unsplash.com/random/?night/') rgba(0, 0, 0, 0.3)";
   
    // if (desktop.matches) {
    //   document.body.style.background =
    //     "url('https://source.unsplash.com/random/?night/') rgba(0, 0, 0, 0.3)";
    // }
    // if (tablet.matches) {
    //   document.body.style.background =
    //     "url('https://source.unsplash.com/random/?night/') rgba(0, 0, 0, 0.3)";
    // }

    // if (mobile.matches || small.matches) {
    //   document.body.style.background =
    //     "url('https://source.unsplash.com/random/?night/') rgba(0, 0, 0, 0.3)";
    // }
  }

    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center"
}

getTime();
getQuote();
getLocation();
setInterval(setTime, 1000)

