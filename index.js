function start(){
  greet_user();
  random_bg();
  startTime();
  get_weather();
  get_quote();
}
window.onload = start;

function greet_user() {
  var now = moment().format("HH:mm");
  var morning = "06:00";
  var lunch = "12:00";
  var afternoon = "14:00";
  var evening = "19:00";
  var night = "22:00";

  if (now >= "00:00" && now < morning) {
    var greeting = "Good night, Maria."
  } else if (now >= morning && now < lunch) {
    var greeting = "Good morning, Maria."
  } else if (now >= lunch && now < afternoon) {
    var greeting = "Happy lunch time, Maria."
  } else if (now >= afternoon && now < evening) {
    var greeting = "Good afternoon, Maria."
  } else if (now >= evening && now < night) {
    var greeting = "Good evening, Maria."
  } else if (now >= night && now <= "23:59") {
    var greeting = "It's getting late."
  } else {
    var greeting = "Looks like you are traveling outside of time. Or I am experiencing an error. One of the two."
  }

  var $greeting = $("#greeting");
  $greeting.html(greeting);
}

function random_bg(){
  var bg_images = ["https://i.imgur.com/3Mq9bY2.jpg","http://onlysp.com/wp-content/uploads/2016/07/life-is-strange-chloes-bedroom_1920.0.jpg","https://i.imgur.com/uWRMmLK.jpg","https://images5.alphacoders.com/839/839681.jpg","http://leganerd.com/wp-content/uploads/2013/09/Fantasy-Space-Best-Wallpaper-HD.jpg"]

  var img_pick = _.sample(bg_images);
  var $bg_image = $("#page")
  $bg_image.html("<style> #outer-wrapper{background-image: url("+img_pick+");background-size: cover; background-repeat: no-repeat; margin: auto; padding: 15px; width: 95vw; height: 93vh; border-radius: 25px; overflow: hidden;background-position: center center;}</style><link href='main.css' rel='stylesheet' type='text/css' />")  
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    h = checkTime(h)
    m = checkTime(m);
    document.getElementById("clock").innerHTML = h + ":" + m;
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
}

function give_temp(temp, cloudiness){
  
  var $current = $("#current");
  $current.append("It's " + temp + "°C with " + cloudiness);
}

function get_quote(){
  var quotes = ["<h3>The fear of death follows from the fear of life. One who lives life fully is prepared to die at any time.</h3><br><i>Mark Twain</i>","<h3>Idealistic as it may sound, altruism should be the driving force in business, not just competition and a desire for wealth.</h3><br><i>Dalai Lama</i>","<h3>The best teachers are those who show you where to look, but don't tell you what to see.</h3><br><i>Alexandra K. Trenfor</i>","<h3>Sitting quietly, doing nothing, Spring comes, and the grass grows by itself.</h3><br><i>Zenrin Kushû</i>","<h3>People do not seem to realize that their opinion of the world is also a confession of character.</h3><br><i>Ralph Waldo Emerson</i>","<h3>The problem is not the problem. The problem is your attitude about the problem.</h3><br><i>Captain Jack Sparrow</i>","<h3>It is the unknown we fear when we look upon death and darkness, nothing more.</h3><br><i>Albus Dumbledore</i>", "<h3>Denjetzigen Moment langt</h3><br><i>Unknown</i>"]

  var pick = _.sample(quotes);
  var $quote = $("#quote");
  $quote.html(pick);
} 

function openNav() {
  document.getElementById("mySidenav").style.height = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.height = "0";
}

