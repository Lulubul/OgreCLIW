jQuery(document).ready(function ($){
	Chart.Initial();
});


var Chart = {};
Chart.Initial = function () {

	$( "#menu" ).accordion({
      	collapsible: true,
      	heightStyle: "content",
      	active: false
    });

    $('#block-left .charts').scrollbar();

    $('#block-left #left-menu').on('click', function(){
		$('#block-left').toggleClass('open', 300);
	});

	$('.chart_type').on('click', function(){
		$('.chart_type').removeClass('selected');
		$(this).addClass('selected');
	});   

	document.querySelector('.upload_local_image').addEventListener('click', function(evt) {
		Chart.loadImages();
	}, false);

	document.querySelector('.upload_local_data').addEventListener('click', function(evt) {
		Chart.readLocalFile();
	}, false);

	$('.upload_web_data').on('click', function(){
		Chart.parseData();		
	});

	$('.create_chart').on('click', function(){
		Chart.xAxis = $('.x_axis').val();
		Chart.yAxis = $('.y_axis').val();
		Chart.chartWidth = $('#chartWidth').val();
		Chart.chartHeight = $('#chartHeight').val();

		Chart.chartType = $('.chart_type.selected').data();
		if (Chart.chartType.type == 'dimple.plot.bar')
			Chart.chartType.type = dimple.plot.bar;
		if (Chart.chartType.type == 'dimple.plot.area')
			Chart.chartType.type = dimple.plot.area;
		if (Chart.chartType.type == 'dimple.plot.pie')
			Chart.chartType.type = dimple.plot.pie;
		$('#infographic .part.active .block .items').append('<div class="chart ui-widget draggble"></div>');
		Chart.urlPath = '#infographic .part.active .block .items .chart:last-child';
		
		console.log(Chart.urlPath);
		console.log(Chart.chartType + " " + Chart.xAxis + " " + Chart.yAxis);
		
		Chart.createChart();
	});	
}

Chart.parseData = function() {
	if (Chart.dataUrl){
		if (Chart.dataUrl.search('tsv')) {
			// console.log(Chart.dataForChart);
			var tsv = $.tsv.parseRows(Chart.dataForChart);
  			var colHeaders = tsv[0]; // Assuming it has a header row
  			$.each(colHeaders, function(index, value){
				$('#x_axis, #y_axis').append($('<option>', { 
			        value: value,
			        text : value 
			    }));
			});
		} 
		else if (Chart.dataUrl.search('csv')) {
		
		}
		else if (Chart.dataUrl.search('json')) {

		}
	} else {
		Chart.dataUrl = jQuery('#data_url').val();
		console.log(Chart.dataUrl);

		jQuery.getJSON('http://websitescraper.heroku.com/?url=' + Chart.dataUrl + '&callback=?', function (csvdata) {
			data = $.csvIn.toJSON(csvdata);
			// console.log(data[0]);
			// console.log(data);
			$.each(data[0], function(index, value){
				$('#x_axis, #y_axis').append($('<option>', { 
			        value: index,
			        text : index 
			    }));
			});
		});
	}
}

Chart.readLocalFile = function() {
    var files = document.getElementById('files').files;
    if (!files.length) {
      	alert('Please select a file!');
      	return;
    }

    var file = files[0];
    var start = 0;
    var stop = file.size - 1;
    Chart.dataUrl = '../data_files/'+file.name;
    var reader = new FileReader();

    // If we use onloadend, we need to check the readyState.
    reader.onloadend = function(evt) {
      	if (evt.target.readyState == FileReader.DONE) { // DONE == 2
        	Chart.dataForChart = evt.target.result;
        	Chart.parseData();
      	}
    };
    reader.readAsText(file);
}

Chart.createChart = function () {
	//var svg = dimple.newSvg("#chartContainer", 590, 400);
	var svg = dimple.newSvg(Chart.urlPath, Chart.chartWidth, Chart.chartHeight);
	console.log(Chart.dataUrl);
	console.log(Chart.xAxis);
	console.log(Chart.yAxis);
	console.log(Chart.chartHeight);
	console.log(Chart.chartWidth);
	console.log(Chart.chartType);
	if (Chart.dataUrl.search('tsv')) {
		d3.tsv("../data_files/example_data.tsv", function (data) {
		// d3.tsv(Chart.dataUrl, function (data) {
			console.log(data);
			var myChart = new dimple.chart(svg, data);
		 	myChart.setBounds(60, 30, chartWidth-85, Chart.chartHeight-95 );
		 	var x = myChart.addCategoryAxis("x", Chart.xAxis);
		 	// x.addOrderRule("year");
		  	myChart.addMeasureAxis("y", Chart.yAxis);
		  	var s = myChart.addSeries(null, Chart.chartType);
		  	myChart.addLegend(60, 10, 500, 20, "right");
		  	myChart.draw();
		});
	}
	else if (Chart.dataUrl.search('csv')){
		d3.csv(data, function (data) {
		// d3.csv("http://ichart.finance.yahoo.com/table.csv", function (data){  

		  // data = dimple.filterData(data, "Owner", ["Aperture", "Black Mesa"])
		  var myChart = new dimple.chart(svg, data);
		  myChart.setBounds(60, 30, chartWidth-85, chartHeight-95 );
		  // myChart.setBounds(60, 30, 505, 305);

		  var x = myChart.addCategoryAxis("x", xAxis);
		  //x.addOrderRule(['Jan', 'Feb', 'Mar', 'Apr']);
		  x.addOrderRule("year");
		  myChart.addMeasureAxis("y", yAxis);
		  var s = myChart.addSeries(null, Chart.chartType);
		  myChart.addLegend(60, 10, 500, 20, "right");

		  // var x = myChart.addCategoryAxis("x", "Month");
		  // x.addOrderRule("Date");
		  // myChart.addMeasureAxis("y", "Unit Sales");
		  // var s = myChart.addSeries("Channel", dimple.plot.area);
		  // myChart.addLegend(60, 10, 500, 20, "right");
		  myChart.draw();
		});
	}
	else if(Chart.dataUrl.search('json')){
		d3.json(data, function (data) {
			var myChart = new dimple.chart(svg, data);
		 	myChart.setBounds(60, 30, chartWidth-85, chartHeight-95 );
		 	var x = myChart.addCategoryAxis("x", xAxis);
		 	x.addOrderRule("year");
		  	myChart.addMeasureAxis("y", yAxis);
		  	var s = myChart.addSeries(null, chartType);
		  	myChart.addLegend(60, 10, 500, 20, "right");
		  	myChart.draw();
		});
	}
	Items.initialization();
}

Chart.loadImages = function () {
	var files = document.getElementById('uploaded_image').files;
    if (!files.length) {
      	alert('Please select a file!');
      	return;
    }

    var file = files[0];
    Chart.imageUrl = 'images/vectors/' + file.name;
    $('#loaded_images').append('<img class="loaded_image" style="width:100px; height:auto;" id="" src="'+ Chart.imageUrl +'" />');
}