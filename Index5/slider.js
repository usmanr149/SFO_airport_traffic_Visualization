//This adapted from 
//http://bl.ocks.org/zanarmstrong/ddff7cd0b1220bc68a58
function Slider(){

    //Slider
    formatDate = d3.time.format("%B %d");
    var day_selected = 12

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

    // scale function
    var timeScale = d3.time.scale()
      .domain([new Date('2008-01-02'), new Date('2009-01-01')])
      .range([0, width_s - 100])
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
      .attr("width", width_s + 200)
      .attr("height", height_s + margin_t.top + margin_t.bottom)
      .append("g")
      // classic transform to position g
      .attr("transform", "translate(" + [100,height_s/2] + ")");  

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

    var playIcon = playButtonG.append('path')
      .attr('transform', 'translate(' + [0,height_s/3] + ')')
      .attr('d', playD)
      .attr('class', 'play-button')
      .on('click', function() {
        console.log("Play Clicked");
        updateData();
        playIcon.attr('d', play ? pauseD : playD);
      });
    
    /*var playRect = playButtonG.append('rect')
      .attr('fill', 'green')
      .attr('pointer-events', 'visible')
      .attr('width', 15)
      .attr('height', 15)
      .on('click', function() {
    */    /*updateData();*/
    /*    console.log("Play Clicked");
        updateData();
        playIcon.attr('d', play ? pauseD : playD);
      });
*/
    var slider = svgContainer.append("g")
      .attr("class", "slider")
      .attr("transform", "translate(" + [100,0] + ")")
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
      .attr("transform", "translate(" + [0,height_s/2] + ")")
      .attr("d", "M 0 -20 V 20");

    handle.append('text')
      .text(startingValue)
      .attr("transform", "translate(" + (-18) + " ," + (height_s / 2 - 25) + ")");

    slider
      .call(brush.event)

    function brushed() {
      var value = brush.extent()[0];
      currentDate = value;

      d3.selectAll(".mycheckbox").on("change", function(){
        return update(month_idx, day_selected);
      });

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