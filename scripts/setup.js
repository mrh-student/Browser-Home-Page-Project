document.getElementById('btnsubmitsetup').addEventListener('click', function(){
    checkInput()
    document.getElementById('check').hidden = false
    saveConfig()
})

function checkInput(){
    //clear any previous results or errors
    document.getElementById('errormessage').innerHTML = ''
    document.getElementById('greeting').innerHTML = ''
    document.getElementById('weather').innerHTML = ''

    const name = document.getElementById('userName').value
    const location = document.getElementById('userLocation').value
    let APIkey = document.getElementById('APIkey').value
    
    if (APIkey ==''){
        APIkey ='2b19e11e5e6f2f6b45e767ed1f96d3fb'
    }
    
    if(name =='' || location ==''){
        const errormessage = 'Whoops - Please fill out name and location below and try again.'
        document.getElementById('errormessage').innerHTML = errormessage
        console.log(errormessage)
    } else {
        giveGreeting(name)
        const url = 'https://api.openweathermap.org/data/2.5/weather?q='+location+'&appid='+APIkey

        $.getJSON(url, function(data){
            const temp = Math.round(data.main.temp - 273.15)
            const condition = data.weather[0].description

            console.log(temp+' '+condition)
            giveTemp(temp, condition, location)
            document.getElementById('check').innerHTML= ''
        }).fail(function(jqXHR){
            if (jqXHR.status == 404) {
                let failMessage = 'Error 404 - City not found. Check the spelling or choose a different location.'
                document.getElementById('errormessage').innerHTML = failMessage
                document.getElementById('check').innerHTML= ''
            } else if(jqXHR.status == 401){
                let failMessage = 'Error:401 - Access denied. Check that you have entered a valid API key.'
                document.getElementById('errormessage').innerHTML = failMessage
                document.getElementById('check').innerHTML= ''
            } else {
                let failMessage = 'An unknown error occurred. Please try again.'
                document.getElementById('errormessage').innerHTML = failMessage
                document.getElementById('check').innerHTML=''
            }
        });
        
    }
}
function giveTemp(temp, condition, location){
    document.getElementById('weather').innerHTML = `It's ${temp}°C in ${location} with ${condition}`
}

function giveGreeting(name){
    document.getElementById('greeting').innerHTML = `Hi there ${name}`
}

function readConfig(){
    const user = JSON.parse(localStorage.getItem('ConfigLocalStorage'))
    const userName = user.userName
    const location = user.weatherLocation
    let openweatherAPI = user.openweatherAPI
    
    if (openweatherAPI == ''){
        openweatherAPI = 'default API key for testing'
    }

    document.getElementById('read_name').innerHTML = userName
    document.getElementById('read_location').innerHTML = location
    document.getElementById('read_api').innerHTML = openweatherAPI
}

function saveConfig(){
    const user = {
        userName: '',
        weatherLocation: '',
        openweatherAPI: ''
    }

    user.userName = document.getElementById('userName').value
    user.weatherLocation = document.getElementById('userLocation').value
    user.openweatherAPI = document.getElementById('APIkey').value

    const newConfigData = JSON.stringify(user)
    console.log(newConfigData)
    localStorage.setItem('ConfigLocalStorage', newConfigData)
}

function backToHome() {
    window.open ('index.html','_self',false);
}


