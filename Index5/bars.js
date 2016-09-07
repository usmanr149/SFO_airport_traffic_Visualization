function bars(month, day){

    var max = d3.max(logi_data, function(d){ 
        return d.Origin; });

    var x = d3.scale.ordinal()
        .domain(["Departures", "Arrivals"])
        .rangeRoundBands([0, width_b], .1);

    var y = d3.scale.linear()
        .domain([0, max])
        .range([height_b, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

    y.domain([0, d3.max(logi_data, function(d) { return d.Origin; })]);

    svgContainer2 = d3.select(".chart").append("svg")
        .attr("width", width_b + margin_b.left_b + margin_b.right_b)
        .attr("height", height_b + margin_b.top_b + margin_b.bottom_b)
        .append("g")
        .attr("transform", 
            "translate(" + margin_b.left_b + "," + margin_b.top_b + ")");

    svgContainer2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height_b + ")")
        .style("fill", "black")
        .call(xAxis);

    svgContainer2.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("y", 6)
        .attr("transform", "translate("+ (-46) +","+200+")rotate(-90)")
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("fill", "black")
        .text("Number of Flights");

        update_bars(month, day);
}

function update_bars(month, day){

    new_data2 = logi_data.filter(function(d){ 
        return (d.Month == month && d.DayofMonth == day);
    });

    var max = d3.max(logi_data, function(d){ 
        return d.Origin; });

    var x = d3.scale.ordinal()
        .domain(["Departures", "Arrivals"])
        .rangeRoundBands([0, width_b], .1);

    var y = d3.scale.linear()
        .domain([0, max])
        .range([height_b, 0]);

    if(new_data2.length > 0){
    var hold_data = [+new_data2[0].Origin, +new_data2[0].Dest];
    }
    else{var hold_data = [0,0];}
    var x_labels = ["Departures", "Arrivals"];

    d3.selectAll(".bar").remove();

    /*var svgContainer2 = d3.select(".chart").append("svg")
        .attr("width", width_b + margin_b.left_b + margin_b.right_b)
        .attr("height", height_b + margin_b.top_b + margin_b.bottom_b)
        .append("g")
        .attr("transform", 
            "translate(" + margin_b.left_b + "," + margin_b.top_b + ")");*/

    svgContainer2.selectAll(".bar")
        .data(hold_data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("fill", function(d, i){
            return bar_colors[i];
        })
        .attr("x", function(d,i) { return x(x_labels[i]); })
        .attr("width", x.rangeBand())
        .attr("y", function(d,i) { return y(d); })
        .attr("height", function(d,i) { return height_b - y(d); })

}