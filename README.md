# Browser Home Page
After using the (free) Momentum browser home page for a while, I wanted to create my own to be able to personalise it more. 
This is an ongoing project, also used to try out new techniques from coding courses.<br><br>
I am currently running the page locally as the default browser home page / new tab page. Everything is customised to my location, name etc., instructions on where to make customisation changes included below.


#### Techniques used:
HTML, CSS, JavaScript

### Features:

- Random screen filling background image

- Clock: shows current time in hours and minutes, updated every 0.5s
- Date: shows current date as 'weekday, month, date, year', updated every 0.5s
- User greeting: shows a custom greeting depending on the current time, updated every 1s
    - change the greetings, timeframes and user name in index.js , greet_user() function

- Timezone Clocks: show current time in different locations around the world, updated every 0.5s
    - modify get_times() and worldclock() function in index.js to edit which cities / timezones to show

- Quote: Shows a random quote whenever the page is loaded / reloaded 
    - currently using _.sample so picks can repeat, no other fine-tuning
    - the quote box will show an expanding animation everytime the page is loaded / reloaded
    - quotes are set in index.js, get_quote() function

- Weather: Shows the current temperature and condition using openweathermaps API
    - API call set in index.js, getweather() function, change query to get weather for different location

- Change Background button: Change the background image to another random pick 
    - currently using _.sample so picks can repeat, no other fine-tuning

- To Do List: Add to do items, cross them off and/or delete them. More work required here. The To Do List widget will currently not save to do items once the page is reloaded - the best kind of to do list is the self-erasing kind. 

- Search: bottom search bar searches Google for keyword in new tab



#### Notes:

index.js is referencing images 'images/bg001.jpg' - 'images/bg010.jpg'<br>
The images are not included in the repository, but you can replace them with your own<br>
Images are set in random_bg() function