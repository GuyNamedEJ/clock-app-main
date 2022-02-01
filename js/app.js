// Get time by user's IP address
let toggleDetails = document.getElementById("toggle-details");
let detailsSection = document.getElementById("details-section");
let quoteSection = document.getElementById("quote-section");

function getTime()
{
    let timeRequestURL = 'http://worldtimeapi.org/api/ip';
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


// var update = window.setInterval(function() {
//     const timeData = timeRequest.response;
//     updateTime(timeData);
//     console.log("Updating");
// },1000);



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
   let timeZoneDisplay = document.getElementById("tz-abbreviation");
   let time = jsonObj['datetime'].slice(11,16)

   

   timeDisplay.textContent = convertTime(time);
   timeZoneDisplay.textContent = jsonObj['abbreviation'];

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

function convertTime(time)
{
  

//   if(time.slice(0,2) >= 5  && time.slice(0,2) < 12)
//   {
//       alert("Good Morning");
//   }

//   if(time.slice(0,2) >= 12 && time.slice(0,2) < 18 )
//   {
//       alert("Good Afternoon")
//   }

//   if(time.slice(0,2) >= 18 || time.slice(0,2) < 5)
//   {
//       alert("Good Evening");
//   }

  let hours = time.slice(0,2) % 12;
  let minute =time.slice(3,5);

  return hours+":"+minute;

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

      if (detailsSection.style.display === "block") {
        detailsSection.style.display = "none";
        buttonText.textContent = "More";
        arrow.style.transform = "rotate("+ 360 +"deg)"
      } else {
        detailsSection.style.display = "block";
        arrow.style.transform = "rotate("+ 180 +"deg)"
        buttonText.textContent = "Less";
        
      }



      
}




