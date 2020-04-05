//**CONSTANTS */ 

const backgroundImages = [
  "images/bg001.jpg",
  "images/bg002.jpg",
  "images/bg003.jpg",
  "images/bg004.jpg",
  "images/bg005.jpg",
  "images/bg006.jpg",
  "images/bg007.jpg",
  "images/bg008.jpg",
  "images/bg009.jpg",
  "images/bg010.jpg",
  "images/bg011.jpg"
]

const quotes = [
  {
    quote: 'The fear of death follows from the fear of life. One who lives life fully is prepared to die at any time.',
    author: 'Mark Twain'
  },
  {
    quote: 'Idealistic as it may sound, altruism should be the driving force in business, not just competition and a desire for wealth.',
    author: 'The Dalai Lama',
  },
  {
    quote: "The best teachers are those who show you where to look, but don't tell you what to see.",
    author: 'Alexandra K. Trenfor',
  },
  {
    quote: 'Sitting quietly, doing nothing, spring comes, and the grass grows by itself.',
    author: 'Zenrin Kushû',
  },
  {
    quote: 'People do not seem to realize that their opinion of the world is also a confession of character.',
    author: 'Ralph Waldo Emerson',
  },
  {
    quote: 'The problem is not the problem. The problem is your attitude about the problem.',
    author: 'Captain Jack Sparrow',
  },
  {
    quote: 'It is the unknown we fear when we look upon death and darkness, nothing more.',
    author: 'Albus Dumbledore',
  },
  {
    quote: 'Denjetzigen Moment langt',
    author: 'Unkown',
  },
  {
    quote: "Don't compromise yourself. You are everything you've got.",
    author: 'Janis Joplin',
  }
]

let timeZoneList

//** BUTTONS, INPUTS & LABELS */
const btnQuote = document.getElementById('quote')
const btnBackground = document.getElementById('btnchangebackground')

const sctnTodo = document.getElementById('mySidenav')

const lblName = document.getElementById('name')
const lblGreeting = document.getElementById('greeting')
const lblClock = document.getElementById('clock')
const lblDate = document.getElementById('date')

btnQuote.addEventListener('click', function(){
  btnQuote.innerText = '';
  getQuote(quotes)
})

btnBackground.addEventListener('click', function(){
  setRandomBackground(backgroundImages)
})

//** MAIN */
function start() {
  //if no configuration is saved, load setup.html, else load the page
  if (localStorage.getItem("ConfigLocalStorage") === null){
    window.open ('setup.html','_self',false)
  }
  //get data from local storage
  const user = JSON.parse(localStorage.getItem("ConfigLocalStorage"))
  const userName = user.userName
  const userLocation = user.weatherLocation
  const userAPIKey = user.openweatherAPI
  timeZoneList = user.timeZones

  //start widgets
  greetUser()
  setInterval(greetUser,60000)
  lblName.innerText= `${userName}.`
  setRandomBackground(backgroundImages)
  setInterval(getTime, 500)
  for (i=0; i < timeZoneList.length; i++){
    let timeContainer = document.createElement('span')
    timeContainer.className = 'timeZone'
    timeContainer.id = timeZoneList[i].listingId
    document.getElementById('timezone_wrapper').appendChild(timeContainer);
  }
  setInterval(getWorldClock, 500)
  setInterval(getWeather(userLocation,userAPIKey),900000)
  getQuote(quotes)
  
}

function greetUser() {
  lblGreeting.innerText = getGreeting(moment().format('HH:mm'))
}

function setRandomBackground(backgroundImages){
  const selectedImage = _.sample(backgroundImages)
  const $bg_image = $('#page')
  $bg_image.append("<style> html {background: url("+selectedImage+") no-repeat center center fixed; -webkit-background-size: cover;-moz-background-size: cover;-o-background-size: cover;background-size: cover;}</style>")  
  
}

function getTime() {
  // get hours, minutes, day, year, month
  const today = new Date()
  const hours = formatTime(today.getHours())
  const minutes = formatTime(today.getMinutes())
  const dayNumber = today.getDate()
  const dayName = assignDayName(today.getDay())
  const month = assignMonthName(today.getUTCMonth())
  const year = today.getFullYear()

  //display time and date
  lblClock.innerText = `${hours}:${minutes}`
  lblDate.innerText = `${dayName}, ${month} ${dayNumber+checkDateSuffix(dayNumber)} ${year}`
}

function getWeather(location,apiKey){
  // set API call with saved location and API key
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid="+apiKey
  
  // get data from call and extract values
  $.getJSON(url, function(data){
    const tempKelvin = data.main.temp
    const tempCelsius = Math.round(tempKelvin - 273.15)
    const condition = data.weather[0].description
    const icon = data.weather[0].icon + ".png"

    giveTemp(tempCelsius, condition, icon, location)
  })
}

function getQuote(quotes){
  //pick a random quote
  const pick = _.sample(quotes)
  let quoteText = document.createElement('h3');
  let quoteAuthor = document.createElement('i');
  quoteText.innerText = pick.quote;
  quoteAuthor.innerText = pick.author;
  btnQuote.appendChild(quoteText);
  btnQuote.appendChild(document.createElement('br'));
  btnQuote.appendChild(quoteAuthor);
} 

function getWorldClock() {
  
  for(i=0; i < timeZoneList.length; i++){
    
    let currentTime = `${moment.tz(timeZoneList[i].listingGeo).format('HH')}:${moment.tz(timeZoneList[i].listingGeo).format('mm')}`
    document.getElementById(timeZoneList[i].listingId).innerText = `${timeZoneList[i].city}: ${currentTime}`
  }
}

function openNav() {
  sctnTodo.style.height = '450px'
}

function closeNav() {
  sctnTodo.style.height = '0'
}

// *** HELPERS ***
function goToSetup(){
  window.open ('setup.html','_self',false)
}

function formatTime(i) {
  if (i < 10) {i = "0" + i}  // add zero in front of numbers < 10
  return i
}

function giveTemp(temp, condition, icon, location){
  var now = new Date()
  // post location and extracted weather values to page
  var $current = $("#current")
  $current.html(location+" <img src='./images/weather/"+icon+"' width='25px' class='weather_img' /><br>It's " + temp + "°C with " + condition)
}

function assignDayName(i){
  // assign weekday name to weekday number returned
  const weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  return(weekDays[i])
}

function assignMonthName(i){
  monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December']
  return monthNames[i]
}

function checkDateSuffix(i){
  // assign date suffix
  if (i == 1 || i == 21 || i == 31){
    var dateSuffix = "st"
  } else if (i == 2 || i == 22) {
    var dateSuffix = "nd"
  } else if(i==3 || i == 23) {
    var dateSuffix ="rd"
  } else {
    var dateSuffix = "th"
  }
  return dateSuffix
}

function getGreeting(now){
  let greeting = 'Hello, '
  // get time interval cut off points
  const morning = "06:00"
  const lunch = "12:00"
  const afternoon = "13:30"
  const evening = "18:00"
  const night = "22:00"
  // set time intervals and corresponding greeting
  if (now >= "00:00" && now < morning) {
    greeting = "Good night, "
  } else if (now >= morning && now < lunch) {
    greeting = "Good morning, "
  } else if (now >= lunch && now < afternoon) {
    greeting = "Hello, "
  } else if (now >= afternoon && now < evening) {
    greeting = "Good afternoon, "
  } else if (now >= evening && now < night) {
    greeting = "Good evening, "
  } else if (now >= night && now <= "23:59") {
    greeting = "It's getting late, "
  }
  return greeting
}