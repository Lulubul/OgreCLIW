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

    $('#loaded_images .loaded_images').on('click', function(){
		$('.loaded_images').removeClass('selected');
		$(this).addClass('selected');
		$('button#add_image').show();
	});

    $('#block-left #types_charts, #loaded_images').scrollbar();

    $('#block-left #left-menu').on('click', function(){
		$('#block-left').toggleClass('open', 300);
	});

	$('.chart_type').on('click', function(){
		$('.chart_type').removeClass('selected');
		$(this).addClass('selected');
		Chart.chartType = $('.chart_type.selected').data();
		if (Chart.chartType.type == 'dimple.plot.bar'){
			$('#chart_sets .pie_charts').hide();
			$('#chart_sets .bar_charts').show();
			// Chart.chartType.type = dimple.plot.bar;
		}
		else if (Chart.chartType.type == 'dimple.plot.area'){
			$('#chart_sets .pie_charts').hide();
			$('#chart_sets .bar_charts').show();
			// Chart.chartType.type = dimple.plot.area;
		}
		else if (Chart.chartType.type == 'dimple.plot.pie'){
			$('#chart_sets .bar_charts').hide();
			$('#chart_sets .pie_charts').show();
			// Chart.chartType.type = dimple.plot.pie;
		}
	});   

	$('.upload_data #upload_local').on('click', function(){
    	$('.upload_data #upload_web_block').hide();
    	$('.upload_data #upload_local_block').show();
    });

    $('.upload_data #upload_web').on('click', function(){
    	$('.upload_data #upload_local_block').hide();
    	$('.upload_data #upload_web_block').show();
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
		Chart.createChart();
	});	
}

Chart.parseData = function() {
	if (Chart.dataUrl){
		if (Chart.dataUrl.search('tsv')) {
			// console.log(Chart.dataForChart);
			var tsv = $.tsv.parseRows(Chart.dataForChart);
  			var colHeaders = tsv[0]; // Assuming it has a header row
  			//empty the select boxes
  			$('#x_axis, #y_axis, #order_rule, #measure_axis, #series').empty();
  			// $('#series').append($('<option value="none">None</option>'));
  			$.each(colHeaders, function(index, value){
				$('#x_axis, #y_axis, #order_rule, #measure_axis, #series').append($('<option>', { 
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
			$('#x_axis, #y_axis, #order_rule, #measure_axis, #series').empty();
			// $('#series').append($('<option value="none">None</option>'));
			$.each(data[0], function(index, value){
				$('#x_axis, #y_axis, #order_rule, #measure_axis, #series').append($('<option>', { 
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
    Chart.dataUrl = '/data_files/'+file.name;
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
	Chart.chartWidth = 400;
	// Chart.chartWidth = $('#chartWidth').val();
	Chart.chartHeight = 300;
	// Chart.chartHeight = $('#chartHeight').val();
	$('#infographic .part.active .block .items').append('<div class="chart ui-widget draggble"></div>');
	Chart.urlPath = '#infographic .part.active .block .items .chart:last-child';

	var svg = dimple.newSvg(Chart.urlPath, Chart.chartWidth, Chart.chartHeight);
	//check the chart type
	if (Chart.chartType.type == "dimple.plot.bar"){
		Chart.xAxis = $('#x_axis').val();
		Chart.yAxis = $('#y_axis').val();
		Chart.orderRule = $('#order_rule').val();
		Chart.series = $('#series').val() || null;
		Chart.chartTypeId = $('.chart_type.selected').attr('id');
		Chart.chartType.type = dimple.plot.bar
		
		//check if tsv
		if (Chart.dataUrl.search('tsv') > 0) {
			console.log('tsv');
			//check if vertical
			if (Chart.chartTypeId == "bar_vertical"){
				d3.tsv(Chart.dataUrl, function (data) {
				// d3.tsv(Chart.dataUrl, function (data) {
					var myChart = new dimple.chart(svg, data);
				 	myChart.setBounds(60, 30, Chart.chartWidth-85, Chart.chartHeight-95 );
				 	var x = myChart.addCategoryAxis("x", Chart.xAxis);
				 	x.addOrderRule(Chart.orderRule);
				  	myChart.addMeasureAxis("y", Chart.yAxis);
				  	var s = myChart.addSeries(null, Chart.chartType.type);
				  	myChart.addLegend(60, 10, 500, 20, "right");
				  	myChart.draw();
				});
			} 
			//check if horizontal
			else if (Chart.chartTypeId == "bar_horizontal"){
				d3.tsv(Chart.dataUrl, function (data) {
				// d3.tsv(Chart.dataUrl, function (data) {
					var myChart = new dimple.chart(svg, data);
				 	myChart.setBounds(60, 30, Chart.chartWidth-85, Chart.chartHeight-95 );
				 	myChart.addMeasureAxis("x", Chart.xAxis);
				 	var y = myChart.addCategoryAxis("y", Chart.yAxis);
      				y.addOrderRule(Chart.orderRule);
				  	var s = myChart.addSeries(null, Chart.chartType.type);
				  	myChart.addLegend(60, 10, 500, 20, "right");
				  	myChart.draw();
				});
			}
			//end check if horizontal or vertical
		}
		//end tsv check csv
		else if (Chart.dataUrl.search('csv') > 0){
			console.log('csv');
			//check if vertical
			if (Chart.chartTypeId == "bar_vertical"){
				d3.csv(Chart.dataUrl, function (data) {
				// d3.tsv(Chart.dataUrl, function (data) {
					var myChart = new dimple.chart(svg, data);
				 	myChart.setBounds(60, 30, Chart.chartWidth-85, Chart.chartHeight-95 );
				 	var x = myChart.addCategoryAxis("x", Chart.xAxis);
				 	x.addOrderRule(Chart.orderRule);
				  	myChart.addMeasureAxis("y", Chart.yAxis);
				  	var s = myChart.addSeries(null, Chart.chartType.type);
				  	myChart.addLegend(60, 10, 500, 20, "right");
				  	myChart.draw();
				});
			} 
			//check if horizontal
			else if (Chart.chartTypeId == "bar_horizontal"){
				d3.csv(Chart.dataUrl, function (data) {
				// d3.tsv(Chart.dataUrl, function (data) {
					var myChart = new dimple.chart(svg, data);
				 	myChart.setBounds(60, 30, Chart.chartWidth-85, Chart.chartHeight-95 );
				 	myChart.addMeasureAxis("x", Chart.xAxis);
				 	var y = myChart.addCategoryAxis("y", Chart.yAxis);
      				y.addOrderRule(Chart.orderRule);
				  	var s = myChart.addSeries(null, Chart.chartType.type);
				  	myChart.addLegend(60, 10, 500, 20, "right");
				  	myChart.draw();
				});
			}
			//end check if horizontal or vertical
		}
		//end csv check json
		else if(Chart.dataUrl.search('json') > 0){
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
		//end json
	}//end chart type bar
	else if (Chart.chartType.type == "dimple.plot.pie"){
		Chart.measureAxis = $('#measure_axis').val();
		Chart.orderRule = $('#order_rule').val();
		Chart.series = $('#series').val();
		Chart.chartTypeId = $('.chart_type.selected').attr('id');
		
		//check if tsv
		if (Chart.dataUrl.search('tsv') > 0) {
			console.log('tsv');
			console.log(Chart.dataUrl);
			console.log(Chart.chartWidth);
			console.log(Chart.chartHeight);
			console.log(Chart.measureAxis);
			console.log(Chart.series);
			d3.tsv(Chart.dataUrl, function (data) {
			// d3.tsv(Chart.dataUrl, function (data) {
				var myChart = new dimple.chart(svg, data);
			 	myChart.setBounds(60, 30, Chart.chartWidth-85, Chart.chartHeight-95 );
			 	myChart.addMeasureAxis("p", "Unit Sales");
			  	myChart.addSeries('Owner', dimple.plot.pie);
			  	myChart.addLegend(60, 10, 500, 20, "right");
			  	myChart.draw();
			});
		}
		//end tsv check csv
		else if (Chart.dataUrl.search('csv') > 0){
			console.log('csv');
			d3.tsv(Chart.dataUrl, function (data) {
			// d3.tsv(Chart.dataUrl, function (data) {
				var myChart = new dimple.chart(svg, data);
			 	myChart.setBounds(60, 30, Chart.chartWidth-85, Chart.chartHeight-95 );
			 	myChart.addMeasureAxis("p", Chart.measureAxis);
			  	myChart.addSeries(Chart.series, dimple.plot.pie);
			  	myChart.addLegend(60, 10, 500, 20, "right");
			  	myChart.draw();
			});
		}
		//end csv check json
		else if(Chart.dataUrl.search('json') > 0){
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
		//end json
	}//end chart type pie
	else if (Chart.chartType.type == "dimmple.plot.area"){

	}//end chart type area
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