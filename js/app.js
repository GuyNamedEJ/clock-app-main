
let toggleDetails = document.getElementById("toggle-details");
let detailsSection = document.getElementById("details-section");
let quoteSection = document.getElementById("quote-section");
let timeDisplay = document.getElementById("time");
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

async function getTime(){
  let response = await fetch(WORLD_TIME_URL)
  let timeData = await response.json();
  console.log(timeData)
  updateTime(timeData)
}

async function getLocation(){
  const response = await fetch(GEO_IP_URL);
  const data = await response.json();
  console.log(data.city)
  city = data.city;
  state = data.region;
  getTime();
  setLocation(city, state);
}

async function getQuote(){
  const res = await fetch(QUOTABLE_URL)
  const data = await res.json()
  displayRandomQuote(data[0])
}

function updateTime(jsonObj) {
  let timezoneAbbreviation = document.getElementById("tz-abbreviation");
  let time = jsonObj["datetime"].slice(11, 16);
  let timeArray = time.split(":")
  let hours = parseInt(timeArray[0])
  let timezoneDisplay = document.getElementById("timezone-display");
  timezone = jsonObj["timezone"].replace("_", " ");
  userTimezone = timezone
  dayOfYear(jsonObj);
  dayOfWeek(jsonObj);
  weekNumber(jsonObj);
  setGreeting(hours)
  timeDisplay.textContent = time;
  timezoneDisplay.textContent = timezone;
  timezoneAbbreviation.textContent = jsonObj["abbreviation"];
}

setInterval(setTime, 1000)

async function setTime(){
  // let response = await fetch(WORLD_TIME_URL)
  // let timeData = await response.json();
  //let time = timeData["datetime"].slice(11, 16);
  let date = new Date()
  let time = date.toLocaleTimeString({timeZone: `${userTimezone}`}).slice(0,5);
  console.log(date.toLocaleTimeString().slice(0,5))
  console.log(`Time zone is ${date.toLocaleTimeString({timeZone: `${userTimezone}`}).slice(0,5)}`)
   timeDisplay.textContent = time;
}


function dayOfYear(jsonObj) {
  let dayOfYearDisplay = document.getElementById("day-of-year-display");
  let dayOfYear = jsonObj["day_of_year"];

  dayOfYearDisplay.textContent = dayOfYear;
}

function dayOfWeek(jsonObj) {
  let dayOfWeekDisplay = document.getElementById("day-of-week-display");
  let dayOfWeek = jsonObj["day_of_week"];

  dayOfWeekDisplay.textContent = dayOfWeek;
}

function weekNumber(jsonObj) {
  let weekNumberDisplay = document.getElementById("week-number-display");
  let weekNumber = jsonObj["week_number"];

  weekNumberDisplay.textContent = weekNumber;
}

function displayRandomQuote(randomQuoteObj) {
  let quoteDisplay = document.getElementById("quote");
  let authorDisplay = document.getElementById("author");

  quoteDisplay.textContent = '"' + randomQuoteObj.content + '"';
  authorDisplay.textContent = randomQuoteObj.author;
}

function setLocation(city, state) {
  let locationDisplay = document.getElementById("location");
  locationDisplay.textContent =
    "in " + city + ", " + state;
  
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
  let greeting = document.getElementById("time-of-day");

  if (hours >= 0 && hours <= 11) {
    document.getElementById("time-icon").src = "/assets/desktop/icon-sun.svg";
    greeting.textContent = "Good Morning, it's currently";
    if (desktop.matches) {
      document.body.style.background =
        "url('/assets/desktop/bg-image-daytime.jpg') rgba(0, 0, 0, 0.3)";
    }
    if (tablet.matches) {
      document.body.style.background =
        "url('/assets/tablet/bg-image-daytime.jpg') rgba(0, 0, 0, 0.3)";
    }

    if (mobile.matches || small.matches) {
      document.body.style.background =
        "url('/assets/mobile/bg-image-daytime.jpg') rgba(0, 0, 0, 0.3)";
    }

    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  }

  if (hours >= 12 && hours <= 17) {
    greeting.textContent = "Good Afternoon, its currently";
  }

  if ((hours >= 18 && hours <= 23)) 
  {
    greeting.textContent = "Good evening, it's currently";
    document.getElementById("time-icon").src = "/assets/desktop/icon-moon.svg";
   
    if (desktop.matches) {
      document.body.style.background =
        "url('/assets/desktop/bg-image-nighttime.jpg') rgba(0, 0, 0, 0.3)";
    }
    if (tablet.matches) {
      document.body.style.background =
        "url('/assets/tablet/bg-image-nighttime.jpg') rgba(0, 0, 0, 0.3)";
    }

    if (mobile.matches || small.matches) {
      document.body.style.background =
        "url('/assets/mobile/bg-image-nighttime.jpg') rgba(0, 0, 0, 0.3)";
    }

    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center"
  }
}


getQuote();
getLocation();


