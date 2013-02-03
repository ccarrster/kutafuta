function offering(data_set){
	for(var i = 0; i < data_set.length; i++) {
		data_set[i].Price = sanitize_price(data_set[i].Price);
		data_set[i].Id = getAdIdFromUrl(data_set[i].url);
	}

	data_set.sort(function(a, b) {
    	return a.Price - b.Price;
	});

	offering_ads = data_set;
}

function wanted(data_set) {
	for(var i = 0; i < data_set.length; i++) {
		data_set[i].Price = sanitize_price(data_set[i].Price);
		data_set[i].Id = getAdIdFromUrl(data_set[i].url);
	}

	data_set.sort(function(a, b) {
    	return a.Price - b.Price;
	});

	data_set.reverse();

	wanted_ads = data_set;
}

function filter_matching(element, index, array) {
	return (
		((this.Make  && this.Make  == element.Make ) || this.Make == 'undefined' ) &&
		((this.Model && this.Model == element.Model) || this.Model == 'undefined') &&
		((this.Year  && this.Year  == element.Year ) || this.Year == 'undefined' )
	)
}

function sanitize_price(dirty_price) {
	var re = /[^0-9\.]/g;
	var clean_price = dirty_price.replace(re, "");
	
	return clean_price;
}

function sortPriceAsc(a, b) {
    return a.Price - b.Price;
}

function getAdIdFromUrl(url) {
	// format in url: AdIdZ<precious ID data>[QQ] (QQ occurs sometimes)
	var id = url.split("AdIdZ")[1];
	return id.split("QQ")[0];
}

wanted_selected = false;
offering_selected = false;

function match(item) {
	var data = (item.name == 'wanted_selected' ? wanted_ads : offering_ads);
	var selected = [];
	
	for (var i = 0; i < data.length; i++) {
		if (item.value == data[i].Id) {
			selected = data[i];
			break;
		}
	}
	
	draw_details(item.name, selected);
	if (item.name == 'wanted_selected') {
		wanted_selected = selected;
	} else {
		offering_selected = selected;
	}
	generate_profit();
}

function draw_details(type, data) {
	var name = "<span>" + data.name  + "</span>";
	var image = data.imageUrl == undefined ? '' : '<img src="' +  data.imageUrl + '" width="50" height="50" />';
	
	var html  = "<div>";
		html +=		'<div><a target="_blank" href="' + data.url   + '">' + name + '</a></div>';
		html +=		"<div>" + data.Make + "</div>";
		html +=		"<div>" + data.Model + "</div>";
		html +=		"<div>" + data.Year + "</div>";
		html +=		"<div>" + data.Price + "</div>";
		html +=		"<div>" + image + "</div>";
		html += "</div>";
	$("#"+type).html(html);
}

function generate_profit() {
	if(wanted_selected && offering_selected) {
		var profit = wanted_selected.Price - offering_selected.Price;
		
		var html  = "<h1>$$$ " + profit + " $$$</h1>";
		$("#profit").html(html);
		
	}
}

function draw_row(type, data) {
	var name = "<span>" + data.name  + "</span>";
	var image = data.imageUrl == undefined ? '' : '<img src="' +  data.imageUrl + '" width="50" height="50" />';
	
	var html  = "<div>";
		html +=		'<input type="radio" name="' + type + '_selected" value="' + data.Id + '" onclick="match(this)" />';
		html +=		'<span><a target="_blank" href="' + data.url   + '">' + name + '</a></span>';
		html +=		"<span>" + data.Price + "</span>";
		html +=		"<span>" + image + "</span>";
		html += "</div>";
	$("#"+type).append(html);
}

function render_column(type, data_set, selected_option) {
	data_set = data_set.filter(filter_matching, selected_option);
	console.log(data_set);
	
	$("#"+type).html("");
	for(var i = 0; i < data_set.length; i++) {
		draw_row(type, data_set[i]);
	}
}

function render(selected_option) {
	render_column('wanted',   wanted_ads,   selected_option);
	render_column('offering', offering_ads, selected_option);
}


var json;
var makes, models, years = "";
var make, model,year;

function show(){
    
    $.getJSON("kutafuta.json", function(data) {
	    json=data;
		//console.log(json);
	    // data is a JavaScript object now. Handle it as such
	    var itens_makes = [];
	    var itens_models = [];
	    var itens_years = [];
	    	    	    
	    for (var name in json){
	    	if(itens_makes.length == 0){
	    		itens_makes.push(json[name].Make);	    		
	    	}else{
	    		if(contains(itens_makes,json[name].Make)){
	    			itens_makes.push(json[name].Make);
	    		}
	    	}
	    	if(itens_models.length == 0){
	    		itens_models.push(json[name].Model);	    		
	    	}else{
	    		if(contains(itens_models,json[name].Model)){
	    			itens_models.push(json[name].Model);
	    		}
	    	}
	    	if(itens_years.length == 0){
	    		itens_years.push(json[name].Year);	    		
	    	}else{
	    		if(contains(itens_years,json[name].Year)){
	    			itens_years.push(json[name].Year);
	    		}
	    	}
	    }
	    
	    for(var key in itens_makes) {	    
	    	var selected = itens_makes[key] == undefined ? "selected" : "";
	    	makes += "<option " + selected + " value=" + itens_makes[key]  + ">" + itens_makes[key] + "</option>";	    	
	    }
	    for(var key in itens_models) {	    
	    	var selected = itens_models[key] == undefined ? "selected" : "";
	    	models += "<option " + selected + " value=" + itens_models[key]  + ">" + itens_models[key] + "</option>";	    	
	    }
	    for(var key in itens_years) {	    
	    	var selected = itens_years[key] == undefined ? "selected" : "";
	    	years += "<option " + selected + " value=" + itens_years[key]  + ">" + itens_years[key] + "</option>";	    	
	    }
	    document.getElementById("makes").innerHTML = makes;
	    document.getElementById("models").innerHTML = models;
	    document.getElementById("years").innerHTML = years;
	    
	});	
    
    
    function contains(a, obj) {    	
    	
        for (var i = 0; i < a.length; i++) {
            if (a[i] === obj) {
                return false;
            }
        }
        return true;
    }
    	
}

function makesValue(){
	make = document.getElementById("makes").value;
	//console.log(make);
}

function modelsValue(){
	model = document.getElementById("models").value;
	//console.log(model);
}

function yearsValue(){
	year = document.getElementById("years").value;
	//console.log(year);
}

function kutafuta(){
	//console.log('kutafuta');
		
	if(make==undefined){
		make = document.getElementById("makes").value;
	}
	if(model==undefined){
		model=document.getElementById("models").value;
	}
	if(year==undefined){
		year=document.getElementById("years").value;
	}
	
	var obj = {
		
		"Make": make,
		"Model": model,
		"Year": year    			
	}
	
	render(obj);
	console.log(obj);
	
}

// TEST
$(document).ready(function() {
	show();
});
