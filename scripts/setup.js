function dosomething(){
    var name = document.getElementById('user_name').value;
    var location = document.getElementById('user_location').value;
    var APIkey = document.getElementById('APIkey').value;
    // console.log(name + location);
    
    if(name =="" || location =="" || APIkey ==""){
        var error_message = "Whoops - Please fill out all the fields below and try again.";
        document.getElementById("error_message").innerHTML = error_message;
        console.log(error_message);
    } else {
        give_greeting(name);
        var url = "http://api.openweathermap.org/data/2.5/weather?q="+location+"&appid="+APIkey;
        $.getJSON(url, function(data){
            var temp_k = data.main.temp;
            var temp_k = data.main.temp;
            var temp = Math.round(temp_k - 273.15);
            var condition = data.weather[0].description;
            console.log(temp+" "+condition);
            give_temp(temp, condition, location); 

        }).fail(function(jqXHR){
            if (jqXHR.status == 404) {
                alert("404 - Location Not Found");
            } else if(jqXHR.status == 401){
                alert("401 - access denied, check your API key");
            } else {
                alter("other error");
            }
        });
        document.getElementById("check").innerHTML= "<span>Does that look correct to you?</span><br><br><input type='button' id='save' class='button' value='Yes, save.' onclick='save_config();'/>";
    }
}
function give_temp(temp, condition, location){
    document.getElementById("weather").innerHTML = "It's " + temp + "°C in " + location + " with " + condition ;
    //console.log(temp, condition)
}

function give_greeting(name){
    document.getElementById("greeting").innerHTML = "Hello, "+ name ;
    //console.log(name)
}

function read_config(){
    var config_data = JSON.parse(user);
    var user_name = config_data[0].user_name;
    var location = config_data[0].weather_location;
    var openweatherAPI = config_data[0].openweatherAPI;
    //console.log(user_name+  location)
    document.getElementById("read_name").innerHTML = user_name;
    document.getElementById("read_location").innerHTML = location;
    document.getElementById("read_api").innerHTML = openweatherAPI;
}

function save_config(){
    var config_data = JSON.parse(user);
    var new_name = document.getElementById('user_name').value;
    var new_location = document.getElementById('user_location').value;
    var new_APIkey = document.getElementById('APIkey').value;
    config_data[0].user_name = new_name;
    config_data[0].weather_location = new_location;
    config_data[0].openweatherAPI = new_APIkey;
    var new_config_data = "user ='"+JSON.stringify(config_data)+"'";
    console.log(new_config_data);
    function download(content, fileName, contentType) {
        var a = document.createElement("a");
        var file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }
    download(new_config_data, 'config.json', 'application/json');

    document.getElementById("next").innerHTML = "Make sure the downloaded file is named 'config.json' and place it in the same folder as index.html<br>Overwrite any older files if they exist.<br><br><input type='button' class='button' value='Done! Take me to my home page' onclick='take_me_home();' />"
}

function take_me_home() {
    window.open ('index.html','_self',false);
}
