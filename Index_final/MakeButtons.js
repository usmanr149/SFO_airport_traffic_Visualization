//Creates 8 buttons for selecting some of the important days of the year.
function MakeButtons(){

    //Define the name for the buttons and their id in array. This allows for ease in making them later.
	buttonNames = ["Memorial Day", "Independence Day", "Labor Day", "Thanksgiving", "Presidential Election", "Christmas Day", "Busiest Day", "Slowest Day"];
	id_names = ["Memorial", "Independence", "Labor", "Thanksgiving", "Presidential", "Christmas", "Busy", "Slowest"];

    var day_max,
        month_max,
        day_min,
        month_min;


    //append a div to body
    var buttons = d3.select("body").append("div")

    //create the buttons
	buttons.selectAll("input")
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

    //find the busiest day of the year. This information is needed for one of the buttons to work correctly.
    var sum_max = 0;
    for(var i = 0; i < logi_data.length; i++){
        if(sum_max < (+logi_data[i].Origin)+(+logi_data[i].Dest)){
            sum_max = (+logi_data[i].Origin)+(+logi_data[i].Dest);
            day_max = +logi_data[i].DayofMonth;
            month_max = +logi_data[i].Month;
        }
    }

    var sum_min = sum_max;
    for(var i = 0; i < logi_data.length; i++){
        if(sum_min > (+logi_data[i].Origin)+(+logi_data[i].Dest)){
            sum_min = (+logi_data[i].Origin)+(+logi_data[i].Dest);
            day_min = +logi_data[i].DayofMonth;
            month_min = +logi_data[i].Month;
        }
    }

    //respond to button clicks. Each button changes the date and updates everything.
	var christmas = d3.select("#Christmas");
    christmas.on('click.Christmas', function(d){
    	currentDate = new Date('2008-12-26');
    	clickResponses();
    });

    var Slowest = d3.select("#Slowest");
    Slowest.on('click.Slowest', function(d){
    	currentDate = new Date("2008-" + month_min + "-" + (day_min+1));
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
    	currentDate = new Date('2008-09-02');
    	clickResponses();
    });

    var Thanksgiving = d3.select("#Thanksgiving");
    Thanksgiving.on('click.Thanksgiving', function(d){
        currentDate = new Date("2008-10-15");
        clickResponses();
    });

    var Presidential = d3.select("#Presidential");
    Presidential.on('click.Presidential', function(d){
        currentDate = new Date("2008-11-05");
        clickResponses();
    });

    var Busy = d3.select("#Busy");
    Busy.on('click.Busy', function(d){
        currentDate = new Date("2008-" + month_max + "-" + day_max);
        clickResponses();
    });

}