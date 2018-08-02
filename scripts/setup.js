function dosomething(){
    //clear any previous results or errors
    document.getElementById("error_message").innerHTML = "";
    document.getElementById("greeting").innerHTML = "";
    document.getElementById("weather").innerHTML = "";

    var name = document.getElementById('user_name').value;
    var location = document.getElementById('user_location').value;
    var APIkey = document.getElementById('APIkey').value;
    // console.log(name + location);
    if (APIkey ==""){
        var APIkey ="2b19e11e5e6f2f6b45e767ed1f96d3fb";
    } else {
        var APIkey = document.getElementById('APIkey').value;
    }
    
    if(name =="" || location ==""){
        var error_message = "Whoops - Please fill out name and location below and try again.";
        document.getElementById("error_message").innerHTML = error_message;
        console.log(error_message);
    } else {
        give_greeting(name);
        var url = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid="+APIkey;
        $.getJSON(url, function(data){
            var temp_k = data.main.temp;
            var temp_k = data.main.temp;
            var temp = Math.round(temp_k - 273.15);
            var condition = data.weather[0].description;
            console.log(temp+" "+condition);
            give_temp(temp, condition, location);
            document.getElementById("check").innerHTML= "<span>Does that look good to you?</span><br><br><input type='button' id='save' class='button' value='Yes, save.' onclick='save_config();'/>"; 
        }).fail(function(jqXHR){
            if (jqXHR.status == 404) {
                var fail_message = "Error 404 - City not found. Check the spelling or choose a different location.";
                document.getElementById("error_message").innerHTML = fail_message;
                document.getElementById("check").innerHTML= "";
                //alert(fail_message);
            } else if(jqXHR.status == 401){
                var fail_message = "Error:401 - Access denied. Check that you have entered a valid API key.";
                document.getElementById("error_message").innerHTML = fail_message;
                document.getElementById("check").innerHTML= "";
                //alert(fail_message);
            } else {
                var fail_message = "An unknown error occurred. Please try again.";
                document.getElementById("error_message").innerHTML = fail_message;
                document.getElementById("check").innerHTML="";
                //alert(fail_message);
            }
        });
        
    }
}
function give_temp(temp, condition, location){
    document.getElementById("weather").innerHTML = "It's " + temp + "°C in " + location + " with " + condition ;
    //console.log(temp, condition)
}

function give_greeting(name){
    document.getElementById("greeting").innerHTML = "Hi there "+ name ;
    //console.log(name)
}

function read_config(){
    //var user = {"user_name":"Maria","weather_location":"Cork","openweatherAPI":"37cc90f9dc2d284a03cdf9d320e132e5"}
    //var config_data = JSON.parse(user);
    var user_stored = localStorage.getItem("ConfigLocalStorage");
    var user = JSON.parse(user_stored);
    var user_name = user.user_name;
    var location = user.weather_location;
    var openweatherAPI = user.openweatherAPI;
    //console.log(user_name+  location)
    document.getElementById("read_name").innerHTML = user_name;
    document.getElementById("read_location").innerHTML = location;
    document.getElementById("read_api").innerHTML = openweatherAPI;
}

function save_config(){
    var user = {"user_name":"","weather_location":"","openweatherAPI":""}
    //var config_data = JSON.parse(user);
    var new_name = document.getElementById('user_name').value;
    var new_location = document.getElementById('user_location').value;
    var new_APIkey = document.getElementById('APIkey').value;
    user.user_name = new_name;
    user.weather_location = new_location;
    user.openweatherAPI = new_APIkey;
    var new_config_data = JSON.stringify(user);
    console.log(new_config_data);
    localStorage.setItem("ConfigLocalStorage", new_config_data);
    //function download(content, fileName, contentType) {
    //    var a = document.createElement("a");
    //    var file = new Blob([content], {type: contentType});
    //    a.href = URL.createObjectURL(file);
    //    a.download = fileName;
    //    a.click();
    //}
    //download(new_config_data, 'config.json', 'application/json');

    document.getElementById("next").innerHTML = "<input type='button' class='button' value='Done! Take me to my home page' onclick='take_me_home();' />";
    document.getElementById("save").value = "Saved. Click to save again.";
}

function take_me_home() {
    window.open ('index.html','_self',false);
}


