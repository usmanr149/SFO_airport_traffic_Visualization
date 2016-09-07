var month_names = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var data = d3.csv("../2008_pruned_SFO_take10.csv", function(d){
	d['D_Latitude'] = +d['D_Latitude'];
	d['D_Longitude'] = +d['D_Longitude'];
	d['O_Latitude'] = +d['O_Latitude'];
	d['O_Longitude'] = +d['O_Longitude'];
	d['DayofMonth'] = +d['DayofMonth'];
	return data = d;
});
var logi_data = d3.csv("bar_chart.csv", function(d) {
    return logi_data = d; 
    });
var months = [1,2,3,4,5,6,7,8,9,10,11,12];
var margin = 0,
	width = 900,
	height = 500;
var month_idx = 0;
var svg;
var projection;
var options;
var state_selected = null;
var shapeData = ["Departures", "Arrivals"];
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