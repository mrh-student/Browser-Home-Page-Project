const timeZoneLocations = [
    {
        cities: [
            'New York',
            'Detroit'
        ],
        geo: 'America/Detroit'
    },
    {
        cities: [
            'San Francisco',
            'Los Angeles',
            'San Diego'
        ],
        geo: 'America/Los_Angeles'
    },
    {
        cities: [
            'Berlin',
            'Paris',
            'Amsterdam',
            'Warsaw',
            'Brussels',
            'Vienna',
            'Rome',
            'Zurich'
        ],
        geo: 'Europe/Berlin'
    },
    {
        cities: [
            'London',
            'Dublin',
            'Lisbon'
        ],
        geo: 'Europe/London'
    },
    {
        cities: [
            'Sao Paulo',
            'Mendoza'
        ],
        geo: 'America/Sao_Paulo'
    },
    {
        cities: [
            'Nashville',
            'Chicago'
        ],
        geo: 'America/Chicago'
    },
    {
        cities: [
            'Melbourne'
        ],
        geo: 'Australia/Melbourne'
    }
]

let selectedTimeZones = localStorage.getItem("ConfigLocalStorage") === null ? [] : JSON.parse(localStorage.getItem('ConfigLocalStorage')).timeZones

//** BUTTONS & INPUTS & LABELS */
const btnSubmit = document.getElementById('btnSubmitSetup')
const btnSave = document.getElementById('save')
const inputName = document.getElementById('userName')
const inputLocation = document.getElementById('userLocation')
const inputAPIKey = document.getElementById('APIkey')
const inputTimeZone = document.getElementById('timezone')
const lblError = document.getElementById('errormessage')
const lblGreeting = document.getElementById('greeting')
const lblWeather = document.getElementById('weather')

btnSubmit.addEventListener('click', function(){
    clearResults()
    checkInput()
    document.getElementById('check').hidden = false
})

btnSave.addEventListener('click', function(){
    saveConfig()
    backToHome()
})


//** MAIN */
function displayTimeZoneOptions(){
    // display time zone options
    for(let i = 0; i < timeZoneLocations.length; i++){
        const citiesList = timeZoneLocations[i].cities
        for (let n = 0; n < citiesList.length; n++){
            let selectedCity = citiesList[n]
            let timeZoneBox = document.createElement('span')
            timeZoneBox.id = selectedCity.replace(/\s/g, '').toLowerCase()
            timeZoneBox.className = 'tz'
            timeZoneBox.innerText = selectedCity
            document.getElementById('timeZoneOptions').appendChild(timeZoneBox)
        }
    }
    // attach event listener
    let btnTzList = document.getElementsByClassName('tz');
    for(i=0;i<btnTzList.length;i++){
        btnTzList[i].addEventListener("click", function(e){
            addTimeZone(createTzToAdd(e.target.innerText))
            e.target.classList.toggle('selected')
        })
    } 
}
function readConfig(){
    let user = localStorage.getItem("ConfigLocalStorage") === null ? {userName:'',weatherLocation:'',openweatherAPI:'',timeZones:[]} : JSON.parse(localStorage.getItem('ConfigLocalStorage'))
    
    const userName = user.userName
    const location = user.weatherLocation
    const openweatherAPI = user.openweatherAPI
    const timeZones = user.timeZones

    inputName.value = userName
    inputLocation.value = location
    inputAPIKey.value = openweatherAPI

    if(timeZones.length > 0){
        for(i=0; i<timeZones.length; i++){
            document.getElementById(timeZones[i].listingId).className= 'tz selected';
        }
    }
}
function checkInput(){
    const name = inputName.value
    const location = inputLocation.value
    const APIkey = inputAPIKey.value
    
    if(name =='' || location =='' || APIkey ==''){
        lblError.innerText = 'Whoops - Please fill out name, location and API key below and try again.'
    } else {
        printGreeting(name)
        const url = constructURL(location, APIkey)

        $.getJSON(url, function(data){
            const temp = Math.round(data.main.temp - 273.15)
            const condition = data.weather[0].description
            printWeather(temp, condition, location)
        }).fail(function(jqXHR){
            if (jqXHR.status == 404) {
                lblError.innerText = 'Error 404 - City not found. Check the spelling or choose a different location.'
                document.getElementById('check').innerHTML= ''
            } else if(jqXHR.status == 401){
                lblError.innerText = 'Error:401 - Access denied. Check that you have entered a valid API key.'
                document.getElementById('check').innerHTML= ''
            } else {
                lblError.innerText = 'An unknown error occurred. Please try again.'
                document.getElementById('check').innerHTML=''
            }
        })
        
    }
}
function saveConfig(){
    const user = {
        userName: inputName.value,
        weatherLocation: inputLocation.value,
        openweatherAPI: inputAPIKey.value,
        timeZones: selectedTimeZones
    }
    localStorage.setItem('ConfigLocalStorage', JSON.stringify(user))
}

//** HELPERS */
function clearResults(){
    //clear any previous results or errors
    lblError.innerHTML = ''
    lblGreeting.innerHTML = ''
    lblWeather.innerHTML = ''
}
function constructURL(location, APIKey){
    return 'https://api.openweathermap.org/data/2.5/weather?q='+location+'&appid='+APIKey
}
function printWeather(temp, condition, location){
    lblWeather.innerHTML = `It's ${temp}°C in ${location} with ${condition}`
}
function printGreeting(name){
    lblGreeting.innerHTML = `Hi there ${name}`
}
function createTzToAdd(city){
    for (i=0; i < timeZoneLocations.length; i++) {
        const citiesList = timeZoneLocations[i].cities
        if(citiesList.indexOf(city) != -1){
            let timeZoneToAdd = {
                listingGeo: timeZoneLocations[i].geo,
                city: city,
                listingId: city.replace(/\s/g, '').toLowerCase()
            }
            return timeZoneToAdd
        }
    }
}
function addTimeZone(entry){
    if(selectedTimeZones.length < 1){
        selectedTimeZones.push(entry)
    }
    else{
        let entryFound = false
        let entryIndex
        for(i=0; i < selectedTimeZones.length; i++){
            if(selectedTimeZones[i].listingId == entry.listingId){
                entryFound = true
                entryIndex = i
            }
        }
        if(entryFound){
            selectedTimeZones.splice(entryIndex,1)
        }
        else{
            selectedTimeZones.push(entry)
        }
    }
}
function backToHome() {
    window.open ('index.html','_self',false)
}
