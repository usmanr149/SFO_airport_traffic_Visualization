function MakeButtons(){

	buttonNames = ["Memorial Day", "Independence Day", "Labor Day", "Christmas Day", "New Year's Eve"];
	id_names = ["Memorial", "Independence", "Labor", "Christmas", "NewYear"];

	d3.select("body").selectAll("label")
		.data(buttonNames)
		.enter()
		.append("input")
		.attr("type", "button")
		.attr("class", "option")
		.attr("id", function(d,i){
			return id_names[i];
		})
		.attr("value", function (d,i){
			return d;
		});

	var christmas = d3.select("#Christmas");
    christmas.on('click.Christmas', function(d){
    	currentDate = new Date('2008-12-26');
    	clickResponses();
    });

    var NewYear = d3.select("#NewYear");
    NewYear.on('click.NewYear', function(d){
    	currentDate = new Date('2009-01-01');
    	clickResponses();
    });

    var Memorial = d3.select("#Memorial");
    Memorial.on('click.Memorial', function(d){
    	currentDate = new Date('2008-06-01');
    	clickResponses();
    });

    var Independence = d3.select("#Independence");
    Independence.on('click.Independence', function(d){
    	currentDate = new Date('2008-07-05');
    	clickResponses();
    });

    var Labor = d3.select("#Labor");
    Labor.on('click.Labor', function(d){
    	currentDate = new Date('2008-09-06');
    	clickResponses();
    });

}