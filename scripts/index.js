function start() {
  // read config.json to get user info
  var config_data = JSON.parse(user);
  var user_name = config_data[0].user_name;
  var location = config_data[0].weather_location;
  var openweatherAPI = config_data[0].openweatherAPI;

  if(user_name == "Jane Doe" && location == "New York" && openweatherAPI == "2b19e11e5e6f2f6b45e767ed1f96d3fb"){
    window.open ('setup.html','_self',false)
  } else {
    // display user name
    document.getElementById("name").innerHTML=user_name+".";
    // start site widgets
    greet_user(user_name);
    random_bg();
    startTime();
    get_weather_open(location,openweatherAPI);
    get_quote();
    get_times();
    worldclock();
  }
  
}

function set_me_up(){
  window.open ('setup.html','_self',false);
}

function greet_user(user_name) {
  var now = moment().format("HH:mm");
  var morning = "06:00";
  var lunch = "12:00";
  var afternoon = "13:30";
  var evening = "18:00";
  var night = "22:00";

  if (now >= "00:00" && now < morning) {
    var greeting = "Good night, "
  } else if (now >= morning && now < lunch) {
    var greeting = "Good morning, "
  } else if (now >= lunch && now < afternoon) {
    var greeting = "Happy lunch time, "
  } else if (now >= afternoon && now < evening) {
    var greeting = "Good afternoon, "
  } else if (now >= evening && now < night) {
    var greeting = "Good evening, "
  } else if (now >= night && now <= "23:59") {
    var greeting = "It's getting late, "
  } else {
    var greeting = "Hello,  "
  }
  document.getElementById("greeting").innerHTML=greeting;
  t = setTimeout(greet_user, 1000)
}

function random_bg(){
  var bg_images = ["images/bg001.jpg","images/bg002.jpg","images/bg003.jpg","images/bg004.jpg","images/bg005.jpg","images/bg006.jpg", "images/bg007.jpg", "images/bg008.jpg","images/bg009.jpg","images/bg010.jpg","images/bg011.jpg"]

  var img_pick = _.sample(bg_images);
  var $bg_image = $("#page")
  $bg_image.append("<style> html {background: url("+img_pick+") no-repeat center center fixed; -webkit-background-size: cover;-moz-background-size: cover;-o-background-size: cover;background-size: cover;}</style>")  
  
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var d = today.getDay();
    var y = today.getFullYear();
    var dd = today.getDate();
    var mo =today.getUTCMonth();
    h = checkTime(h);
    m = checkTime(m);

    if (d == 1){
      var day = "Monday";
    } else if (d == 2){
      var day = "Tuesday";
    } else if (d == 3){
      var day = "Wednesday";
    } else if (d == 4){
      var day = "Thursday";
    } else if (d == 5){
      var day = "Friday";
    } else if (d == 6){
      var day = "Saturday";
    } else if (d == 0){
      var day = "Sunday";
    }

    if (mo == 0){
      var month = "January";
    } else if (mo == 1){
      var month = "February";
    } else if (mo == 2){
      var month = "March";
    } else if (mo == 3){
      var month = "April";
    } else if (mo == 4){
      var month = "May";
    } else if (mo == 5){
      var month = "June";
    } else if (mo == 6){
      var month = "July";
    } else if (mo == 7){
      var month = "August";
    } else if (mo == 8){
      var month = "September";
    } else if (mo == 9){
      var month = "October";
    } else if (mo == 10){
      var month = "November";
    } else if (mo == 11){
      var month = "December";
    }


    if (dd == 1 || dd == 21 || dd == 31){
      var date_suffix = "st";
    } else if (dd == 2 || dd == 22) {
      var date_suffix = "nd";
    } else if(dd==3 || dd == 23) {
      var date_suffix ="rd"
    } else {
      var date_suffix = "th"
    }

    document.getElementById("clock").innerHTML = h + ":" + m;
    document.getElementById("date").innerHTML = day + ", "+month+" "+dd+date_suffix+" "+y;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

function get_weather (){
  var url = "http://ws.geonames.org/findNearByWeatherJSON?&lat=51.903614&lng=-8.468399&username=mhennig";
  $.getJSON(url, function(data) {
    var temp = data.weatherObservation.temperature;
    var cloudiness = data.weatherObservation.clouds;
    give_temp(temp, cloudiness);
  });
  var t = setTimeout(get_weather, 900000);
}

function get_weather_open(location,openweatherAPI){
  var config_data = JSON.parse(user);
  var location = config_data[0].weather_location;
  var openweatherAPI = config_data[0].openweatherAPI;
  var url = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid="+openweatherAPI;
  $.getJSON(url, function(data){
    var temp_k = data.main.temp;
    var temp = Math.round(temp_k - 273.15);
    var condition = data.weather[0].description;
    give_temp_open(temp, condition);
  });
  var t = setTimeout(get_weather_open,900000)
}

function give_temp(temp, cloudiness){
  var now = new Date();
  var $current = $("#current");
  $current.html("Cork City<br>It's " + temp + "°C with " + cloudiness);
  console.log(now + " - Cork City - It's " + temp + "°C with " + cloudiness)
}

function give_temp_open(temp, condition){
  var now = new Date();
  var config_data = JSON.parse(user);
  var location = config_data[0].weather_location;
  var $current = $("#current");
  $current.html(location+"<br>It's " + temp + "°C with " + condition);
  console.log(now + " - Cork City - It's " + temp + "°C with " + condition)
}

function get_quote(){
  var quotes = ["<h3>The fear of death follows from the fear of life. One who lives life fully is prepared to die at any time.</h3><br><i>Mark Twain</i>","<h3>Idealistic as it may sound, altruism should be the driving force in business, not just competition and a desire for wealth.</h3><br><i>Dalai Lama</i>","<h3>The best teachers are those who show you where to look, but don't tell you what to see.</h3><br><i>Alexandra K. Trenfor</i>","<h3>Sitting quietly, doing nothing, spring comes, and the grass grows by itself.</h3><br><i>Zenrin Kushû</i>","<h3>People do not seem to realize that their opinion of the world is also a confession of character.</h3><br><i>Ralph Waldo Emerson</i>","<h3>The problem is not the problem. The problem is your attitude about the problem.</h3><br><i>Captain Jack Sparrow</i>","<h3>It is the unknown we fear when we look upon death and darkness, nothing more.</h3><br><i>Albus Dumbledore</i>", "<h3>Denjetzigen Moment langt</h3><br><i>Unknown</i>", "<h3>Don't compromise yourself. You are everything you've got.</h3><br><i>Janis Joplin</i>"]

  var pick = _.sample(quotes);
  var $quote = $("#quote");
  $quote.html(pick);
} 

function openNav() {
  document.getElementById("mySidenav").style.height = "450px";
}

function closeNav() {
  document.getElementById("mySidenav").style.height = "0";
}

function get_times() {
  moment.tz.add([
    "America/Los_Angeles|PST PDT PWT PPT|80 70 70 70|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261q0 1nX0 11B0 1nX0 SgN0 8x10 iy0 5Wp1 1VaX 3dA0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1fA0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|15e6",

    "America/Kentucky/Monticello|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|0101023010101010101010101010101010101010101010101010101010101010101010101454545454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 SWp0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11A0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0",

    "America/Sao_Paulo|LMT -03 -02|36.s 30 20|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|-2glwR.w HdKR.w 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 pTd0 PX0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 1C10 Lz0 1Ip0 HX0 1zd0 On0 1HB0 IL0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1HB0 FX0 1HB0 FX0 1HB0 IL0 1HB0 FX0 1HB0 IL0 1EN0 FX0 1HB0 FX0 1HB0 IL0 1EN0 IL0 1HB0 FX0 1HB0 FX0 1HB0 FX0 1HB0 FX0 1HB0 FX0 1Kp0 FX0 1HB0 IL0 1EN0 FX0 1HB0 FX0 1HB0 IL0 1EN0|20e6",

    "Europe/London|GMT BST BDST|0 -10 -20|0101010101010101010101010101010101010101010101010121212121210101210101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2axa0 Rc0 1fA0 14M0 1fc0 1g00 1co0 1dc0 1co0 1oo0 1400 1dc0 19A0 1io0 1io0 WM0 1o00 14o0 1o00 17c0 1io0 17c0 1fA0 1a00 1lc0 17c0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1cM0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1io0 1qM0 Dc0 2Rz0 Dc0 1zc0 Oo0 1zc0 Rc0 1wo0 17c0 1iM0 FA0 xB0 1fA0 1a00 14o0 bb0 LA0 xB0 Rc0 1wo0 11A0 1o00 17c0 1fA0 1a00 1fA0 1cM0 1fA0 1a00 17c0 1fA0 1a00 1io0 17c0 1lc0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1a00 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1tA0 IM0 90o0 U00 1tA0 U00 1tA0 U00 1tA0 U00 1tA0 WM0 1qM0 WM0 1qM0 WM0 1tA0 U00 1tA0 U00 1tA0 11z0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 14o0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|10e6",

    "Europe/Berlin|CET CEST CEMT|-10 -20 -30|01010101010101210101210101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 kL0 Nc0 m10 WM0 1ao0 1cp0 dX0 jz0 Dd0 1io0 17c0 1fA0 1a00 1ehA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|41e5",

    "Australia/Melbourne|AEST AEDT|-a0 -b0|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293lX xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1qM0 11A0 1tA0 U00 1tA0 U00 1tA0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 11A0 1o00 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|39e5",
  ]);
  var now = new Date();
  var times = [
    {
      jsclass: 'js-sf',
      jstime: moment.tz(now, "America/Los_Angeles")
    },
    {
      jsclass: 'js-nv',
      jstime: moment.tz(now, "America/Kentucky/Monticello")
    },
    {
      jsclass: 'js-md',
      jstime: moment.tz(now, "America/Sao_Paulo")
    },
    {
      jsclass: 'js-ld',
      jstime: moment.tz(now, "Europe/London")
    },
    {
      jsclass: 'js-bl',
      jstime: moment.tz(now, "Europe/Berlin")
    },
    {
      jsclass: 'js-mb',
      jstime: moment.tz(now, "Australia/Melbourne")
    }
  ];
  return times;
}

function worldclock() {
  var times = get_times();
  var SanFrancisco = times[0].jstime.format('HH') + ":" + times[0].jstime.format('mm');
  var Nashville = times[1].jstime.format('HH') + ":" + times[1].jstime.format('mm');
  var Mendoza  = times[2].jstime.format('HH') + ":" + times[2].jstime.format('mm');
  var London = times[3].jstime.format('HH') + ":" + times[3].jstime.format('mm');
  var Berlin = times[4].jstime.format('HH') + ":" + times[4].jstime.format('mm');
  var Melbourne = times[5].jstime.format('HH') + ":" + times[5].jstime.format('mm');

  document.getElementById("sf").innerHTML = "San Francisco: " + SanFrancisco;
  document.getElementById("nashville").innerHTML = "Nashville: " + Nashville;
  document.getElementById("mendoza").innerHTML = "Mendoza: " + Mendoza;
  document.getElementById("london").innerHTML = "London: " + London;
  document.getElementById("berlin").innerHTML = "Berlin: " + Berlin;
  document.getElementById("melbourne").innerHTML = "Melbourne: " + Melbourne;
  var t = setTimeout(worldclock, 500);
}

