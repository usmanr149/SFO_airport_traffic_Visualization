//This adapted from 
//http://bl.ocks.org/zanarmstrong/ddff7cd0b1220bc68a58
function Slider(){

    //Slider
    formatDate = d3.time.format("%B %d");
    getMonth = d3.time.format("%B");
    getDay = d3.time.format("%d");
    var day_selected = 12

    var margin_t = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
      },
      width_s = 900 - margin_t.left - margin_t.right,
      height_s = 200 - margin_t.bottom - margin_t.top;


    // scale function
    var timeScale = d3.time.scale()
      .domain([new Date('2008-01-02'), new Date('2009-01-01')])
      .range([0, width_s-100])
      .clamp(true);

    // initial value
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
      .attr("width", width_s + 100)
      .attr("height", height_s + margin_t.top + margin_t.bottom)
      .append("g")
      // classic transform to position g
      .attr("transform", "translate(" + margin_t.left + "," + margin_t.top + ")");

    svgContainer.append("g")
      .attr("class", "x axis")
      // put in middle of screen
      .attr("transform", "translate(0," + height_s / 2 + ")")
      // inroduce axis
      .call(d3.svg.axis()
      .scale(timeScale)
      .orient("bottom")
      .tickFormat(function(d) {
        return formatDate(d);
      })
      .tickSize(0)
      .tickPadding(12)
      .tickValues([timeScale.domain()[0], new Date('2008-06-02'), timeScale.domain()[1]]))
      .select(".domain")
      .select(function() {
        console.log(this);
        return this.parentNode.appendChild(this.cloneNode(true));
      });

    var slider = svgContainer.append("g")
      .attr("class", "slider")
      .call(brush);

    slider.selectAll(".extent,.resize")
      .remove();

    slider.select(".background")
      .attr("height", height_s);

    var handle = slider.append("g")
      .attr("class", "handle")

    handle.append("path")
      .attr("stroke", "black")
      .attr("stroke-width", 0.8)
      .attr("transform", "translate(0," + height_s / 2 + ")")
      .attr("d", "M 0 -20 V 20")

    handle.append('text')
      .text(startingValue)
      .attr("transform", "translate(" + (-18) + " ," + (height_s / 2 - 25) + ")");

    slider
      .call(brush.event)

    function brushed() {
      var value = brush.extent()[0];

      d3.selectAll(".mycheckbox").on("change", function(){
        return update(month_idx, day_selected);
      });

      /*d3.select(".play_button").on("click", function(){
          d3.select(this).text(function(){
            if(d3.select(".play_button").text() == "Play"){
              play = true;
              return "Pause";}
            else{
              play = false;
              return "Play";}
          });
      });*/

      if (d3.event.sourceEvent) { // not a programmatic event
        value = timeScale.invert(d3.mouse(this)[0]);
        brush.extent([value, value]);
        month_idx = +month_names.indexOf(String(getMonth(value)));
        day_selected = +getDay(value);
        currentDate = value;
        update(month_idx, day_selected);
        update_bars(month_idx, day_selected);
      }

      handle.attr("transform", "translate(" + timeScale(value) + ",0)");
      handle.select('text').text(formatDate(value));
    }

    //update slider
    function updateSlider(currentDate){
      console.log("should update slider");
      console.log(currentDate);
      handle.attr("transform", "translate(" + timeScale(currentDate) + ",0)");
      handle.select('text').text(formatDate(currentDate));
    }
  Slider.updateSlider = updateSlider;
  }