function CheckBox(){

	var form = d3.select("body").append("div")
				.attr("width", 200)
		    	.attr("height", 100);
	
	labels = form.selectAll("label")
	    .data(shapeData)
	    .enter()
	    .append("label")
	    .text(function(d) {
	    	return d;
	    })
	    .insert("input")
	    .attr("type", "checkbox")
	    .attr("class", "mycheckbox")
	    .attr("checked", true);
}