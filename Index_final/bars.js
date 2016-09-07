function bars(month, day){

    //find the maximum of the of the origin flights 
    var max = d3.max(logi_data, function(d){ 
        return d.Origin; });

    //create a scale for the ordinal x axis
    var x = d3.scale.ordinal()
        .domain(["Departures", "Arrivals"])
        .rangeRoundBands([0, width_b], .1);

    //create a scale for the y axis
    var y = d3.scale.linear()
        .domain([0, max])
        .range([height_b, 0]);

    //put ticks on the x axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    //ticks for the y axis
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

    //create a domain for the y axis
    y.domain([0, max]);

    //append a chart and translate it so the label and ticks can be clearly seen
    svgContainer2 = d3.select(".chart")
        .append("svg")
        .attr("width", width_b + margin_b.left_b + margin_b.right_b)
        .attr("height", height_b + margin_b.top_b + margin_b.bottom_b)
        .append("g")
        .attr("transform", "translate(" + (margin_b.left_b+20) + "," + margin_b.top_b + ")");

    //append the x axis
    svgContainer2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height_b + ")")
        .style("fill", "black")
        .call(xAxis);

    //append the y axis
    svgContainer2.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("y", 6)
        .attr("transform", "translate("+ (-55) +","+150+")rotate(-90)")
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("fill", "black")
        .text("Number of Flights");

    //draw the bars based on the month and day
    update_bars(month, day);
}

function update_bars(month, day){

    //get the number of delays and arrivals on the day selected.
    new_data2 = logi_data.filter(function(d){ 
        return (d.Month == month && d.DayofMonth == day);
    });

    var max = d3.max(logi_data, function(d){ 
        return d.Origin; });

    //create a scale for the ordinal x axis
    var x = d3.scale.ordinal()
        .domain(["Departures", "Arrivals"])
        .rangeRoundBands([0, width_b], .1);

    //create a scale for the y axis
    var y = d3.scale.linear()
        .domain([0, max])
        .range([height_b, 0]);

    //create an array containing the arrival and departures for the day selected.
    var hold_data = [+new_data2[0].Origin, +new_data2[0].Dest];

    //labels for the x axis
    var x_labels = ["Departures", "Arrivals"];

    //remove previously drawn bars
    d3.selectAll(".bar")
        .remove();

    //appends the bars with the height based on the number of departing and arriving. Data is scaled.
    svgContainer2.selectAll(".bar")
        .data(hold_data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("fill", function(d, i){
            //departues are red and arrivals are blue
            return bar_colors[i];
        })
        .attr("x", function(d,i) { return x(x_labels[i]); })
        .attr("width", x.rangeBand())
        .attr("y", function(d,i) { return y(d); })
        .attr("height", function(d,i) { return height_b - y(d); })

}