<html>
<body>

  <h1>A Look at Flight Patterns From San Francisco Airport in 2008</h1>
  <h2>By Usman Rizwan</h2>

  <p>For my data visualization project I decided to look at the flights that arrive and depart from the San Francisco International Airport every data. I got the data set from http://stat-computing.org/dataexpo/2009/the-data.html. My first attempt at data visualization was to make a simple of the United States (excluding Alaska) and mark all the airports listed in the data set on the map. For this I combined the flight data set with the airport coordinate data set from http://openflights.org/data.html. They provide a data set with the airport codes and latitude and longitude coordinates of all the major airports in US (see Index1.html)</p>

<p>
In the second iteration of my visual analysis I looked at scaling the map to get a better view of the map. For this part of the analysis I used Michelle Chandra's "Basic US State Map - D3" code on http://bl.ocks.org/ and Mike Bostock's "Let's Make a Map" tutorial on https://bost.ocks.org/mike/map/, see Index2.html. In this visualization I have successfully drawn the paths of the flights. I showed this visualization around and people suggested that it would be interesting to actually see the number of flights coming in and leaving the airport. As the visualization in the current format conveyed no important information. 
</p>

<p>
I decided to make the visualization more effective by adding a time slider at the bottom to give let the user have a better view of the flight patterns through out the year of 2008 and look at the specific day s/he is interested in. I adopted the time slider given by Zan's post "slider: days of the year" on http://bl.ocks.org/zanarmstrong/ddff7cd0b1220bc68a58. I showed this version to a couple of people I know and they suggested that the it would be better to color code arrivals and departures to give a better idea of flights coming in and out. So I added red color for departures and blue for departures and also added check boxes so users can select to look at only arrivals or departures or both if they want, see folder Index3/ in my submission folder.
</p>

<p>
  I was quite happy with this version until I received another comment from a friend that it doesn't actually show how busy the airport is on holidays versus normal days. For example if somebody wants to see how many flights leave the airport on Christmas Day vs. New Year's Eve, the visualization cannot be used to answer this question. So as a final addition I added a bar chart to show the total number of flights arriving and leaving on the selected day. To make the bar chart I modified the code provided by Mike Bostock in his "Bar Chart" example on https://bl.ocks.org/mbostock/3885304. Now a user can clearly see that the busiest days at SFO are at the beginning and end of summer. This makes sense because people leave for holidays at the beginning of summer and start coming back at the end of summer. See Index4/ in my submission folder.
</p>

  <p>
  Based on the comment received from the reviewer I have made major changes to the visualization. The first change I made was that instead of showing paths as straight lines the paths are now shown as arcs. The advantage of arcs is that departures are concave arcs while the arrival arcs are convex. This makes the paths look less convoluted when all the lines are shown. The user can now also click on one or more states to see the flight paths to the specific states clicked. When a user hover over a state the name of the state is now shown.
  </p>

<p>
  I have also added play/pause capabilities to the slider. In addition I have added 8 new buttons to show the important dates and draw the users attention to the busiest and the slowest day of the year. For the final visualization see Index_final/ in my submission folder. This final visualization shows what I originally intended to show, the number of flights flowing in and out of SFO every day of the year of 2008. It allows the user to select states and look at some of the important dates of the year.
</p>

<p>
  Based on further comments from the reviewer I have added a descriptive headline over the chart. I have also added a line graph that clearly shows the rise in air traffic during the summer. I have also added text that says that "States are Clickable". For the final visualization see Index_final/ in my submission folder.
</p>

<h2>References</h2>
<ol>
  <li>"Map Hover", http://bl.ocks.org/lhoworko/7753a11efc189a936371</li>
  <li>"fresh block" for play-pause paths, http://bl.ocks.org/Sokrates86/7620cc16809c0ff36d7b</li>
  <li>"d3 date axis simple example", http://bl.ocks.org/phoebebright/3059392
    <li>"Rotated Axis Labels", http://bl.ocks.org/mbostock/4403522
</ol>

    

</body>
</html>
