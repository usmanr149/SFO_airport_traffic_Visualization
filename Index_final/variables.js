//These are global variables needed for the various functions to run
//Names of month, index 0 is empty for wase of use.
var month_names = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""];

//read the datset with all the dates, longitude and latitude of the airports from where flights come and go.
var data = d3.csv("../2008_pruned_SFO.csv", function(d){
	d['D_Latitude'] = +d['D_Latitude'];
	d['D_Longitude'] = +d['D_Longitude'];
	d['O_Latitude'] = +d['O_Latitude'];
	d['O_Longitude'] = +d['O_Longitude'];
	d['DayofMonth'] = +d['DayofMonth'];
	return data = d;
});

//reads the data for creating the bar charts beside the map
var logi_data = d3.csv("bar_chart.csv", function(d) {
	d["Origin"] = +d["Origin"];
	d["Dest"] = +d["Dest"];
    return logi_data = d; 
    });

//array of months
var months = [1,2,3,4,5,6,7,8,9,10,11,12];
var margin = 0,
	width = 900,
	height = 500;
var month_idx = -1;
var svg;
var projection;
var options;
var state_selected = [];
var CheckBoxes = ["Departures", "Arrivals"];
var currentDate;

var currently = "Pause";

var getMonth = d3.time.format("%B");
var getDay = d3.time.format("%d");

var svgContainer2;
var margin_b = {top_b: 20, right_b: 20, bottom_b: 30, left_b: 40},
    width_b = 250 - margin_b.left_b - margin_b.right_b,
    height_b = 500 - margin_b.top_b - margin_b.bottom_b;

bar_colors = ["#F51D1D", "#090352"];
var play = false;