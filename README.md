# HomeTab
After using the Momentum browser home page for a while, I wanted to create my own to be able to personalise it more. 
This is an ongoing project, also used to try out new techniques from coding courses.<br><br>
I am currently running the page locally as the default browser home page / new tab page.<br>
<img src="images/screenshot.png" width="800px"> 

#### Install
Download, open `index.html` in your browser

<p>To customise, the page needs your name, your location (for weather) and an <a href="https://openweathermap.org/appid#get">API key from openweathermap</a> (free option available). No affiliation, I just liked their weather data output the best.</p>

When `index.html` is loaded and no configuration information is found, `setup.html` is loaded. You can enter name, location and API key here. You can also select additional time zones to display. The values are stored in local storage. 

<p>Other customisation options not included in setup are described below.</p>
<p>Once the page is customised to you, you can set it as the default home page / new tab page of your browser. No need to upload to a webspace, it can just run locally.</p>

To update info, visit `setup.html` by using the settings icon in the bottom left corner. 


#### Tech Stack:
HTML, CSS, JavaScript

#### Tested in:

- Chrome
- Firefox
- Safari

<p>Best for larger screens > 1200px width<br>
Smallest dimensions to still look good is 1200 x 650 px<br>
More work on optimsation for smaller screens needed</p>

#### Features:

- Random screen filling background image

- Clock: shows current time in hours and minutes, updated every 0.5s
- Date: shows current date as 'weekday, month, date, year', updated every 0.5s
- User greeting: shows a custom greeting depending on the current time, updated every 1s
    - change the greetings and timeframes in index.js , `getGreeting()` function

- Timezone Clocks: show current time in different locations around the world, updated every 0.5s
    - which cities / timezones are shown can be customised in `setup.html``
    - more cities can be added in in `setup.js` in `timeZoneLocations`object list

- Quote: Shows a random quote whenever the page is loaded / reloaded 
    - currently using `_.sample` so picks can repeat, no other fine-tuning
    - the quote box will show an expanding animation everytime the page is loaded / reloaded
    - get a new random quote by clicking on the quote
    - quotes are set in index.js, `getQuote()` function
    

- Weather: Shows the current temperature and condition using openweathermaps API, updates every 15min
    - You can set the location and API key for the call through setup.html / config.json
    - To customise update time modifiy the Interval for the `getWeather()` function (be careful since there is a daily/monthly limit for free API calls using openweathermaps )

- Change Background button: Change the background image to another random pick 
    - currently using `_.sample` so picks can repeat, no other fine-tuning

- To Do List: Add to do items, cross them off and/or delete them. 

- Search: bottom search bar searches Google for keyword in new tab


#### Notes:

index.js is referencing `images/bg001.jpg` - `images/bg011.jpg`<br>
Example images are included in the repository, but you can replace them with your own in the images folder<br>
Images are set in `setRandomBackground()` function<br>
<p>Example image sources: 
Free to use

https://www.pexels.com/photo/adventure-alps-background-beautiful-547114/

https://www.pexels.com/photo/blue-and-purple-cosmic-sky-956999/

https://images.pexels.com/photos/808465/pexels-photo-808465.jpeg?cs=srgb&dl=background-boardwalk-clouds-808465.jpg&fm=jpg

https://www.pexels.com/photo/background-balance-beach-boulder-289586/

https://www.pexels.com/photo/abendstimmung-atmospheric-background-beautiful-531872/

https://www.pexels.com/photo/yellow-bokeh-photo-949587/

https://www.pexels.com/photo/astronomy-background-constellation-cosmic-355887/

https://www.pexels.com/photo/abstract-background-beach-color-355288/

https://www.pexels.com/photo/scenic-view-of-the-mountain-733031/

https://www.pexels.com/photo/adventure-alpine-background-black-and-white-355770/

https://www.pexels.com/photo/black-and-white-gray-long-road-3131/

https://www.pexels.com/photo/classic-blue-coupe-die-cast-model-1037995/

https://www.pexels.com/photo/body-of-water-with-mountains-on-side-937782/

https://www.pexels.com/photo/layout-of-green-leaves-1227648/

https://www.pexels.com/photo/snow-top-mountain-under-clear-sky-1054218/

</p>