# Browser Home Page
After using the (free) Momentum browser home page for a while, I wanted to create my own to be able to personalise it more. 
This is an ongoing project, also used to try out new techniques from coding courses.<br><br>
I am currently running the page locally as the default browser home page / new tab page.<br>
<img src="images/screenshot.png" width="800px"> 

#### Install
<p>To customise, the page needs your name, your location (for weather) and an <a href="https://openweathermap.org/appid#get">API key from openweathermap</a> (free option available). No affiliation, I just liked their weather data output the best.</p>

You can enter this information directly in `config.json` or open `setup.html` to create new configuration file.
<p>Other customisation options not included in setup are described below.</p>
<p>Once the page is customised to you, you can set it as the default home page / new tab page of your browser. No need to upload to a webspace, it can just run locally.</p>

To update info, just edit `config.json` or use `setup.html` to create a new configuration file.


#### Techniques used:
HTML, CSS, JavaScript

#### Tested in:

- Chrome
- Firefox

#### Features:

- Random screen filling background image

- Clock: shows current time in hours and minutes, updated every 0.5s
- Date: shows current date as 'weekday, month, date, year', updated every 0.5s
- User greeting: shows a custom greeting depending on the current time, updated every 1s
    - change the greetings and timeframes in index.js , `greet_user(user_name)` function

- Timezone Clocks: show current time in different locations around the world, updated every 0.5s
    - modify `get_times()` and `worldclock()` function in index.js to edit which cities / timezones to show

- Quote: Shows a random quote whenever the page is loaded / reloaded 
    - currently using `_.sample` so picks can repeat, no other fine-tuning
    - the quote box will show an expanding animation everytime the page is loaded / reloaded
    - get a new random quote by clicking on the quote
    - quotes are set in index.js, `get_quote()` function
    

- Weather: Shows the current temperature and condition using openweathermaps API, updates every 15min
    - You can set the location and API key for the call through setup.html / config.json
    - To customise update time modifiy the timeout in the `get_weather_open(location,openweatherAPI)` function (be careful since there is a daily/monthly limit for free API calls using openweathermaps )

- Change Background button: Change the background image to another random pick 
    - currently using `_.sample` so picks can repeat, no other fine-tuning

- To Do List: Add to do items, cross them off and/or delete them. More work required here. The To Do List widget will currently not save to do items once the page is reloaded - the best kind of to do list is the self-erasing kind. 

- Search: bottom search bar searches Google for keyword in new tab



#### Notes:

index.js is referencing `images/bg001.jpg` - `images/bg010.jpg`<br>
The images are not included in the repository, but you can replace them with your own in the images folder<br>
Images are set in `random_bg()` function