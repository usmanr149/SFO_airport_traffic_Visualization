<!DOCTYPE html>
<html>
<body>

<h1>A Look at Flight Patterns From San Francsco Airport in 2008</h1>

<p>I decided to look at the flight that come in and out of the San Francisco International Airport every data. My first attemp was to make a simple of the United States (excluding Alaska) and mark all the airports listed in the data set on the map. For this I used the data from http://openflights.org/data.html. They provide a fata set with the airport codes and latitude and longitude coordinates of all the major airports in US (see Index1.html)</p>

<p>
In the second iteration of my visual analysis I looked at scaling the map to get a better view of the map. For this part of the analysis I used Michelle Chandra's "Basic US State Map - D3" code on http://bl.ocks.org/ and Mike Bostock's "Let’s Make a MapLet’s Make a Map" tutorial on https://bost.ocks.org/mike/map/, see Index2.html. In this visualization I have succesfully drawn the paths of the flights. I showed this visualization around and people suggested that it would be interesting to acually see the number of flights coming in and leaving the airport. As the visuaization in the current format conveyed no important information. 
</p>

<p>
I decided to make the visualization more effective by adding a time slider at the bottom and color coding arrivals and departures to give a better view of the flight patterns through out the year of 2008. I adopted the time slider given by Zan's post "slider: days of the year" on http://bl.ocks.org/. I showed this version to a couple of people I know and they suggested that the it would be better to color code arrivals and departures to give a better idea of flights coming in and out. So I added red color for departures and blue for departures and also added checkboxes so users can select to look at only arrivals or departures or both if they want, see folder Index3/.
</p>

<p>
I was quite happy with this version until I recieved another comment from a friend that it doesn't actually show how busy the airport is on holidays versus normal days/ For example if somebody ants to see how many flights leave the airport on Christmas Dat vs. New Years Eve, the visualization cannot be used to answer this question. So as a final addition I added a bar chart to show the total number of flights arriving and leaving on the selected day. 
</p>

</body>
</html>