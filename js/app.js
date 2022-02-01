// Get time by user's IP address
let toggleDetails = document.getElementById("toggle-details");
let detailsSection = document.getElementById("details-section");
let quoteSection = document.getElementById("quote-section");

// Media Queries
let desktop = window.matchMedia("(max-width: 1400px)");
let tablet = window.matchMedia("(max-width: 850px)");
let mobile = window.matchMedia("(min-width: 376px) and (max-width: 799px)");
let small =  window.matchMedia("(max-width: 375px)");


function getTime()
{
    let timeRequestURL = 'https://worldtimeapi.org/api/ip';
    let timeRequest = new XMLHttpRequest();
    timeRequest.open('GET', timeRequestURL);
    timeRequest.responseType = 'json';
    timeRequest.send();

    timeRequest.onload = function() {
        const timeData = timeRequest.response;
        updateTime(timeData);
    }
}

setInterval(getTime,1000);

// Get Location by client's IP Address
let locationRequestURL = 'https://api.freegeoip.app/json/?apikey=2b6fc8f0-73e2-11ec-8fcf-570906a9ba81';
let locationRequest = new XMLHttpRequest();
locationRequest.open('GET', locationRequestURL);
locationRequest.responseType = 'json';
locationRequest.send();

locationRequest.onload = function() {
    const locationData = locationRequest.response;
    setLocation(locationData);
}

// Get Random Quote
let randomQuoteURL = 'https://programming-quotes-api.herokuapp.com/Quotes/random';
let quoteRequest = new XMLHttpRequest();
quoteRequest.open('GET', randomQuoteURL);
quoteRequest.responseType = 'json';
quoteRequest.send();

quoteRequest.onload = function() {
    const randomQuote = quoteRequest.response;
    displayRandomQuote(randomQuote);
}

function updateTime(jsonObj)
{
   let timeDisplay = document.getElementById("time");
   let timezoneAbbreviation = document.getElementById("tz-abbreviation");
   let time = jsonObj['datetime'].slice(11,16);
   let timezoneDisplay = document.getElementById("timezone-display");
   timezone = jsonObj['timezone'].replace('_', ' ');
   dayOfYear(jsonObj);
   dayOfWeek(jsonObj);
   weekNumber(jsonObj);
   setGreeting(time);

   timeDisplay.textContent = time;
   timezoneDisplay.textContent = timezone;
   timezoneAbbreviation.textContent = jsonObj['abbreviation'];

}

function dayOfYear(jsonObj)
{
  let dayOfYearDisplay = document.getElementById("day-of-year-display");
  let dayOfYear = jsonObj['day_of_year'];

  dayOfYearDisplay.textContent = dayOfYear;
}

function dayOfWeek(jsonObj)
{
  let dayOfWeekDisplay = document.getElementById("day-of-week-display");
  let dayOfWeek = jsonObj['day_of_week'];

  dayOfWeekDisplay.textContent = dayOfWeek;
}

function weekNumber(jsonObj)
{
  let weekNumberDisplay = document.getElementById("week-number-display");
  let weekNumber = jsonObj['week_number'];

  weekNumberDisplay.textContent = weekNumber;
}
function displayRandomQuote(randomQuoteObj)
{
    let quoteDisplay = document.getElementById("quote");
    let authorDisplay = document.getElementById("author");

    quoteDisplay.textContent = '"' + randomQuoteObj['en'] + '"';
    authorDisplay.textContent = randomQuoteObj['author'];
}

function setLocation(locationObj)
{
    let locationDisplay = document.getElementById("location");
    locationDisplay.textContent = "in " + locationObj['city'] + ", " + locationObj['region_code'];
    console.log(locationObj['city']);
}

function showHide()
{
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
        arrow.style.transform = "rotate("+ 360 +"deg)"
      } else {
        detailsSection.style.display = "flex";
        arrow.style.transform = "rotate("+ 180 +"deg)"
        buttonText.textContent = "Less";
        
      }
}

function setGreeting(time)
{
  let greeting = document.getElementById('time-of-day');
  let hours = time.slice(0,2);
  
  if(hours >= 5 && hours <= 11)
  {
    greeting.textContent = "Good Morning";
    if(desktop.matches)
    {
      document.body.style.background = "url('/assets/desktop/bg-image-daytime.jpg') rgba(0, 0, 0, 0.3)";
    }
    if(tablet.matches)
    {
      document.body.style.background = "url('/assets/tablet/bg-image-daytime.jpg') rgba(0, 0, 0, 0.3)"; 
    }

    if(mobile.matches || small.matches)
    {
      document.body.style.background = "url('/assets/mobile/bg-image-daytime.jpg') rgba(0, 0, 0, 0.3)"; 
    }
    
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";

   
  }

  if(hours >= 12 && hours <= 17 )
  {
    greeting.textContent = "Good Afternoon";
  }

  if((hours >= 18 && hours <= 23) || (hours >= 0 && hours <= 4))
  {
    greeting.textContent = "Good evening";
    document.body.style.background = "url('/assets/desktop/bg-image-nighttime.jpg') rgba(0, 0, 0, 0.3)"; 
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
 
  }


}




