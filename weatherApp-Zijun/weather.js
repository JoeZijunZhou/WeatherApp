/*Author: Zijun Zhou*/
/* called when button is pushed */

function gotNewPlace() {
	// get what the user put into the textbox
	var newPlace = document.getElementById("zipbox").value;

	// make a new script element
	var script = document.createElement('script');

	// start making the complicated URL
	script.src = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+newPlace+"')&format=json&callback=callbackFunction"
	script.id = "jsonpCall";

	// remove old script
	var oldScript = document.getElementById("jsonpCall");
	if (oldScript != null) {
		document.body.removeChild(oldScript);
	}

	// put new script into DOM at bottom of body
	document.body.appendChild(script);
}
/*code above quoted from weatherButton.js provided by Professor Amenta*/

/* called when new weather arrives */

function callbackFunction(data) {
  //sample
	//var pgh = document.getElementById("forecast");
  //  	pgh.textContent = JSON.stringify(data.query.results.channel.item.condition.code);
  //var response = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='davis, ca')&format=json&callback=callbackFunction";
  //get data for now
  //time & date == parse from lastBuildDate
  var parsed_str = JSON.stringify(data.query.results.channel.lastBuildDate).split(" ");
	var current_time = document.getElementById("current_time");
    	current_time.textContent = "Today "+parsed_str[4]+parsed_str[5];
	var current_date = document.getElementById("current_date");
			if(parsed_str[2]=="Apr"){
	    	current_date.textContent = parsed_str[2]+"il "+parsed_str[1]+", "+parsed_str[3];
			} else {
				current_date.textContent = parsed_str[2]+" "+parsed_str[1]+", "+parsed_str[3];
			}

	//image *need to slice str when cmp it with num
	var current_img = document.getElementById("current_img");
	var	img_code = JSON.stringify(data.query.results.channel.item.condition.code).slice(1,-1);
  if(31<=img_code&&img_code<=34){
		current_img.src="../WeatherApp/sunny.png";
	} else if(27<=img_code&&img_code<=30||img_code==44) {
		current_img.src="../WeatherApp/part-sun.png";
	} else if(img_code==26) {
		current_img.setAttribute("src","../WeatherApp/cloudy.png");
	} else if(img_code==11|| img_code==12|| img_code==14|| img_code==40||
			img_code==42|| img_code==45|| img_code==46|| img_code==47|| img_code==5||
			img_code==6|| img_code==10|| img_code==35) {
		current_img.setAttribute("src","../WeatherApp/rain.png");
	} else if(img_code==3|| img_code==4|| img_code==37|| img_code==38|| img_code==39) {
		current_img.setAttribute("src","../WeatherApp/thunder.png");
	} else if(img_code==7|| img_code==13|| img_code==15|| img_code==16|| img_code==43) {
		current_img.setAttribute("src","../WeatherApp/snow.png");
	}

	//location
	var current_location = document.getElementById("current_location");
    	current_location.textContent = JSON.stringify(data.query.results.channel.location.city + "," + data.query.results.channel.location.region).slice(1,-1);
	var current_location1 = document.getElementById("current_location1");
    	current_location1.textContent = JSON.stringify(data.query.results.channel.location.city + "," + data.query.results.channel.location.region).slice(1,-1);
	//degree
	var current_temp = document.getElementById("current_temp");
    	current_temp.textContent = JSON.stringify(data.query.results.channel.item.condition.temp+"°").slice(1,-1);
	//weather
	var current_weather = document.getElementById("current_weather");
    	current_weather.textContent = JSON.stringify(data.query.results.channel.item.condition.text).slice(1,-1);
	//wind
	var current_wind = document.getElementById("current_wind");
    	current_wind.textContent = JSON.stringify(data.query.results.channel.wind.speed + "mph").slice(1,-1);
	//humidity
	var current_humid = document.getElementById("current_humid");
    	current_humid.textContent = JSON.stringify(data.query.results.channel.atmosphere.humidity + "%").slice(1,-1);

	//use a for loop to get all forecast(array of obj) data
  for(i=0; i<10; i++){
	var forecast_day = document.getElementById("forecast_day"+(i+1));
    	forecast_day.textContent = JSON.stringify(data.query.results.channel.item.forecast[i].day).slice(1,-1);
  //use .setattri(src,"") and weather+".jpg" to set img ==>maybe create a new function to do img setting
	var forecast_img = document.getElementById("forecast_img"+(i+1));
	var	img_code = JSON.stringify(data.query.results.channel.item.forecast[i].code).slice(1,-1);
	if(31<=img_code&&img_code<=34){
		forecast_img.setAttribute("src","../WeatherApp/sunny.png");
	} else if((27<=img_code&&img_code<=30)||img_code==44) {
		forecast_img.setAttribute("src","../WeatherApp/part-sun.png");
	} else if(img_code==26) {
		forecast_img.setAttribute("src","../WeatherApp/cloudy.png");
	} else if(img_code==11|| img_code==12|| img_code==14|| img_code==40||
			img_code==42|| img_code==45|| img_code==46|| img_code==47|| img_code==5||
			img_code==6|| img_code==10|| img_code==35) {
		forecast_img.setAttribute("src","../WeatherApp/rain.png");
	} else if(img_code==3|| img_code==4|| img_code==37|| img_code==38|| img_code==39) {
		forecast_img.setAttribute("src","../WeatherApp/thunder.png");
	} else if(img_code==7|| img_code==13|| img_code==15|| img_code==16|| img_code==43) {
		forecast_img.setAttribute("src","../WeatherApp/snow.png");
	} else {
		forecast_img.setAttribute("src","../WeatherApp/wind.png");
		forecast_img.style.height="120px";
	}
  console.log(img_code);

	var forecast_weather = document.getElementById("forecast_weather"+(i+1));
	    forecast_weather.textContent = JSON.stringify(data.query.results.channel.item.forecast[i].text).slice(1,-1);

	var forecast_dhigh = document.getElementById("forecast_dhigh"+(i+1));
			forecast_dhigh.textContent = JSON.stringify(data.query.results.channel.item.forecast[i].high+"°").slice(1,-1);
	var forecast_dlow = document.getElementById("forecast_dlow"+(i+1));
		  forecast_dlow.textContent = JSON.stringify(data.query.results.channel.item.forecast[i].low+"°").slice(1,-1);
  }
}

/*slider onclick function*/
var current = 0;
function slider(direction){
	console.log(direction);
	//var width = document.getElementById("weatherWindow").offsetWidth;
  //console.log(width);
	//var space = (width - 10*200)/9;
	if(direction==1&&current>-100){
		var next = document.getElementById("weatherWindow");
		console.log(next);
		current = current - 20;
		next.style.left = current + "%";
	}
	if(direction==0&&current<0){
		var pre = document.getElementById("weatherWindow");
		console.log(pre);
		current = current + 20;
		pre.style.left = current + "%";
	}
}
