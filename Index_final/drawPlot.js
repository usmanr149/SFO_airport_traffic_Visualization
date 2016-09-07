function drawPlot(){

  var w = 960,
    h = 500,
    pad = 60,
    left_pad = 200;

  var vis = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);


    var line = d3.svg.line()
      .x(function(d,i) { return xScale(new Date("2008-" + logi_data[i].Month + "-" + logi_data[i].DayofMonth)); })
      .y(function(d,i) { return yScale((+logi_data[i].Dest) + (+logi_data[i].Origin)); });

    // define the y scale  (vertical)
    var yScale = d3.scale.linear()
      .domain([500, 850])    // values between 0 and 100
      .range([height - pad, pad]);

    // define the x scale  (vertical)
    var xScale = d3.time.scale()
      .domain([new Date(2008, 0, 1), new Date(2009, 0, 1)])
      .range([left_pad, w-pad]);
    
    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left");

    var xAxis = d3.svg.axis()
      .orient("bottom")
      .scale(xScale);

    vis.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0, "+(h-pad)+")")
    .call(xAxis)
    .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(45)")
    .style("text-anchor", "start");
 
    vis.append("g")
      .attr("class", "axis")
      .attr("transform", "translate("+(left_pad-pad)+", 0)")
      .call(yAxis);

    // now add titles to the axes
    vis.append("text")
      .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
      .attr("transform", "translate("+ (left_pad-2*pad) +","+(h/2)+")rotate(-90)")
      .text("Total Number of Flights Arriving and Leaving SFO");

    vis.append("svg:path")
      .attr("d", line(logi_data))
      .attr("class", "data")
      .attr("stroke", "#F51D1D")
      .attr("stroke-width", 0.5)
      .attr("fill", "none")
      .style("opacity", 1);

}