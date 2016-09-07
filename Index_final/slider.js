//This adapted from 
//http://bl.ocks.org/zanarmstrong/ddff7cd0b1220bc68a58
//This creates a time slider
function Slider(){

    //Slider
    formatDate = d3.time.format("%B %d, %a");
    var day_selected = 12

    //margin for the svg window that holds the time slider.
    //Also defined the paths for the play and pause buttons, the buttons are from http://bl.ocks.org/Sokrates86/7620cc16809c0ff36d7b
    var margin_t = {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50
    },
    width_s = 900 - margin_t.left - margin_t.right,
    height_s = 150 - margin_t.bottom - margin_t.top,
    playWidth = 20,
    playD = 'M' + [
      0, 0,
      playWidth/1.2, playWidth/2,
      0, playWidth,
      0, 0].join(','),
    pauseD = 'M' + [
      0, 0,
      playWidth/3, 0,
      playWidth/3, playWidth,
      0, playWidth
    ].join(',') + 'Z M' + [
      (playWidth / 2) + 0, 0,
      (playWidth / 2) + playWidth/3, 0,
      (playWidth / 2) + playWidth/3, playWidth,
      (playWidth / 2) + 0, playWidth
    ].join(',');

    // scale function for the slider
    var timeScale = d3.time.scale()
      .domain([new Date('2008-01-02'), new Date('2009-01-01')])
      .range([0, width_s - 100])
      .clamp(true);

    // initial value at which the slider is placed after the animation
    var startValue = timeScale(new Date('2008-06-17'));
    startingValue = new Date('2008-06-17');

    // defines brush
    var brush = d3.svg.brush()
      .x(timeScale)
      .extent([startingValue, startingValue])
      .on("brush", brushed);

    var svgContainer = d3.select("body")
      .append("svg")
      .attr("class", "g6")
      .attr("width", width_s + 400)
      .attr("height", 100)//height_s + margin_t.top + margin_t.bottom)
      .append("g")
      // classic transform to position g
      .attr("transform", "translate(" + [100,height_s/3] + ")");  

    //This function creates a yellow bar under the time slider to show the times when summer vacations are on.
    var lineFunction = d3.svg.line()
     .x(function(d) { return d.x; })
     .y(function(d) { return d.y; })
     .interpolate("linear");
     
    var lineData = [ { "x": 289.589+100,   "y": height_s/2},  
      {"x": 466.02739726027403+100,  "y": height_s/2}];

    //The line SVG Path we draw to show the summer on the time slider
    svgContainer.append("path")
      .attr("d", lineFunction(lineData))
      .attr("stroke", "rgb(224, 227, 32)")
      .attr("stroke-width", 10)
      .attr("fill", "none"); 

    //Put "Summer Holidays" under the summer bar on the slider
    svgContainer.append("text")
      .attr("x", (466.02739726027403+289.589+200)/2)             
      .attr("y", 55)
      .attr("text-anchor", "middle") 
      .style("fill", "black") 
      .style("font-size", "16px")
      .text("Summer Holidays");

    //Put "Scroll" to let the user know there is something underneath
    svgContainer.append("text")
      .attr("x", 1000)             
      .attr("y", 60)
      .attr("text-anchor", "middle") 
      .style("fill", "black") 
      .style("font-size", "16px")
      .text("Scroll Down");

    //append the time time slider
    svgContainer.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" + [100,height_s/2] + ")")
      // inroduce axis
      .call(d3.svg.axis()
      .scale(timeScale)
      .orient("bottom")
      .tickFormat(function(d) {
        return formatDate(d);
      })
      .tickSize(0)
      .tickPadding(12)
      .tickValues([timeScale.domain()[0], timeScale.domain()[1]]))
      .select(".domain")
      .select(function() {
        console.log(this);
        return this.parentNode.appendChild(this.cloneNode(true));
      });

    var playButtonG = svgContainer.append('g')
      .attr('transform', 'translate(' + [20, 2] + ')');

    //append the play button
    var playIcon = playButtonG.append('path')
      .attr('transform', 'translate(' + [0,height_s/3] + ')')
      .attr('d', playD)
      .attr('class', 'play-button')
      .on('click', function() {
        //on click update the data and change the button to pause
        updateData();
        playIcon.attr('d', play ? pauseD : playD);
      });


    var slider = svgContainer
      .append("g")
      .attr("class", "slider")
      .attr("transform", "translate(" + [100,0] + ")")
      .call(brush);

    slider.selectAll(".extent,.resize")
      .remove();

    slider.select(".background")
      .attr("height", height_s);

    // Render the handle 
    var handle = slider.append("g")
      .attr("class", "handle")
    
    handle.append("path")
      .attr("stroke", "black")
      .attr("stroke-width", 0.8)
      .attr("transform", "translate(" + [0,height_s/2] + ")")
      .attr("d", "M 0 -20 V 20");

    handle.append('text')
      .text(startingValue)
      .attr("transform", "translate(" + (-25) + " ," + (height_s / 2 - 25) + ")");

    slider
      .call(brush.event)

    //When the handle is moved the it is updated through this function.    
    function brushed() {
      var value = brush.extent()[0];
      currentDate = value;

      //This function handles the checkbox clicks
      d3.selectAll(".mycheckbox").on("change", function(){
        update(+month_names.indexOf(String(getMonth(currentDate))), +getDay(currentDate));
      });

      //if the brush is moved this is triggered.
      if (d3.event.sourceEvent) { // not a programmatic event
        value = timeScale.invert(d3.mouse(this)[0]);
        brush.extent([value, value]);
        month_idx = +month_names.indexOf(String(getMonth(value)));
        day_selected = +getDay(value);
        currentDate = value;
        update(month_idx, day_selected);
        update_bars(month_idx, day_selected);
      }

      //update the attributes of the brush
      handle.attr("transform", "translate(" + timeScale(value) + ",0)");
      handle.select('text').text(formatDate(value));
    }

    //update slider for when buttons are clicked.
    function updateSlider(currentDate){
      handle.attr("transform", "translate(" + timeScale(currentDate) + ",0)");
      handle.select('text').text(formatDate(currentDate));
    }
  
  Slider.updateSlider = updateSlider;

}