//** BUTTONS & INPUTS & LABELS */

const btnSubmit = document.getElementById('btnSubmitSetup')
const btnSave = document.getElementById('save')
const inputName = document.getElementById('userName')
const inputLocation = document.getElementById('userLocation')
const inputAPIKey = document.getElementById('APIkey')
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
function readConfig(){
    const user = JSON.parse(localStorage.getItem('ConfigLocalStorage'))
    const userName = user.userName
    const location = user.weatherLocation
    const openweatherAPI = user.openweatherAPI

    document.getElementById('readName').innerText = userName
    document.getElementById('readLocation').innerText = location
    document.getElementById('readAPI').innerText = openweatherAPI
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
        openweatherAPI: inputAPIKey.value
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
function backToHome() {
    window.open ('index.html','_self',false)
}