let toggleDetails = document.getElementById("toggle-details");
let detailsSection = document.getElementById("details-section");
let quoteSection = document.getElementById("quote-section");
let userIP;
let city;
let state;


// Media Queries
let desktop = window.matchMedia("(min-width: 1400px)");
let tablet = window.matchMedia("(max-width: 850px)");
let mobile = window.matchMedia("(min-width: 376px) and (max-width: 799px)");
let small = window.matchMedia("(max-width: 375px)");

function getTime() {
  let timeRequestURL = "https://worldtimeapi.org/api/ip/" + userIP;
  let timeRequest = new XMLHttpRequest();
  timeRequest.open("GET", timeRequestURL);
  timeRequest.responseType = "json";
  timeRequest.send();

  timeRequest.onload = function () {
    const timeData = timeRequest.response;
    updateTime(timeData);
  };
}

const api_url = "https://geo.ipify.org/api/v2/country,city?apiKey=at_ILesY5Ea31ir7gLgwNkINdILMGjbw&ipAddress=";
async function getLocation()
{
  const response = await fetch(api_url);
  const data = await response.json();
  userIP = data.ip;
  console.log(data.ip)
  city = data.location.city;
  state = data.location.region;
  getTime()
  setLocation(city, state);
}

setInterval(getTime, 1000);
getLocation();

async function getQuote()
{
  const res = await fetch("https://api.quotable.io/quotes/random")
  const data = await res.json()
  console.log(data[0])
  displayRandomQuote(data[0])
}
getQuote();


function updateTime(jsonObj) {
  let timeDisplay = document.getElementById("time");
  let timezoneAbbreviation = document.getElementById("tz-abbreviation");
  let time = jsonObj["datetime"].slice(11, 16);
  let timezoneDisplay = document.getElementById("timezone-display");
  timezone = jsonObj["timezone"].replace("_", " ");
  dayOfYear(jsonObj);
  dayOfWeek(jsonObj);
  weekNumber(jsonObj);
  setGreeting(time);

  timeDisplay.textContent = time;
  timezoneDisplay.textContent = timezone;
  timezoneAbbreviation.textContent = jsonObj["abbreviation"];
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

function setGreeting(time) {
  let greeting = document.getElementById("time-of-day");

  let hours = time.slice(0, 2);

  if (hours >= 5 && hours <= 11) {
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

  if ((hours >= 18 && hours <= 23) || (hours >= 0 && hours <= 4)) 
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
  }
}


