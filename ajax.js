// Accounting.js for formatting currency

/*!
 * accounting.js v0.4.2, copyright 2014 Open Exchange Rates, MIT license, http://openexchangerates.github.io/accounting.js
 */
(function(p,z){function q(a){return!!(""===a||a&&a.charCodeAt&&a.substr)}function m(a){return u?u(a):"[object Array]"===v.call(a)}function r(a){return"[object Object]"===v.call(a)}function s(a,b){var d,a=a||{},b=b||{};for(d in b)b.hasOwnProperty(d)&&null==a[d]&&(a[d]=b[d]);return a}function j(a,b,d){var c=[],e,h;if(!a)return c;if(w&&a.map===w)return a.map(b,d);for(e=0,h=a.length;e<h;e++)c[e]=b.call(d,a[e],e,a);return c}function n(a,b){a=Math.round(Math.abs(a));return isNaN(a)?b:a}function x(a){var b=c.settings.currency.format;"function"===typeof a&&(a=a());return q(a)&&a.match("%v")?{pos:a,neg:a.replace("-","").replace("%v","-%v"),zero:a}:!a||!a.pos||!a.pos.match("%v")?!q(b)?b:c.settings.currency.format={pos:b,neg:b.replace("%v","-%v"),zero:b}:a}var c={version:"0.4.1",settings:{currency:{symbol:"$",format:"%s%v",decimal:".",thousand:",",precision:2,grouping:3},number:{precision:0,grouping:3,thousand:",",decimal:"."}}},w=Array.prototype.map,u=Array.isArray,v=Object.prototype.toString,o=c.unformat=c.parse=function(a,b){if(m(a))return j(a,function(a){return o(a,b)});a=a||0;if("number"===typeof a)return a;var b=b||".",c=RegExp("[^0-9-"+b+"]",["g"]),c=parseFloat((""+a).replace(/\((.*)\)/,"-$1").replace(c,"").replace(b,"."));return!isNaN(c)?c:0},y=c.toFixed=function(a,b){var b=n(b,c.settings.number.precision),d=Math.pow(10,b);return(Math.round(c.unformat(a)*d)/d).toFixed(b)},t=c.formatNumber=c.format=function(a,b,d,i){if(m(a))return j(a,function(a){return t(a,b,d,i)});var a=o(a),e=s(r(b)?b:{precision:b,thousand:d,decimal:i},c.settings.number),h=n(e.precision),f=0>a?"-":"",g=parseInt(y(Math.abs(a||0),h),10)+"",l=3<g.length?g.length%3:0;return f+(l?g.substr(0,l)+e.thousand:"")+g.substr(l).replace(/(\d{3})(?=\d)/g,"$1"+e.thousand)+(h?e.decimal+y(Math.abs(a),h).split(".")[1]:"")},A=c.formatMoney=function(a,b,d,i,e,h){if(m(a))return j(a,function(a){return A(a,b,d,i,e,h)});var a=o(a),f=s(r(b)?b:{symbol:b,precision:d,thousand:i,decimal:e,format:h},c.settings.currency),g=x(f.format);return(0<a?g.pos:0>a?g.neg:g.zero).replace("%s",f.symbol).replace("%v",t(Math.abs(a),n(f.precision),f.thousand,f.decimal))};c.formatColumn=function(a,b,d,i,e,h){if(!a)return[];var f=s(r(b)?b:{symbol:b,precision:d,thousand:i,decimal:e,format:h},c.settings.currency),g=x(f.format),l=g.pos.indexOf("%s")<g.pos.indexOf("%v")?!0:!1,k=0,a=j(a,function(a){if(m(a))return c.formatColumn(a,f);a=o(a);a=(0<a?g.pos:0>a?g.neg:g.zero).replace("%s",f.symbol).replace("%v",t(Math.abs(a),n(f.precision),f.thousand,f.decimal));if(a.length>k)k=a.length;return a});return j(a,function(a){return q(a)&&a.length<k?l?a.replace(f.symbol,f.symbol+Array(k-a.length+1).join(" ")):Array(k-a.length+1).join(" ")+a:a})};if("undefined"!==typeof exports){if("undefined"!==typeof module&&module.exports)exports=module.exports=c;exports.accounting=c}else"function"===typeof define&&define.amd?define([],function(){return c}):(c.noConflict=function(a){return function(){p.accounting=a;c.noConflict=z;return c}}(p.accounting),p.accounting=c)})(this);

// Empty array to push buttons that are generated by the searchbox
// for the specific currencies that the user wants to track.

var cryptocurrencies = [];

var myTotalBalance = 0;
// =========================================================================================
// Function to render cryptocurrency buttons for personalized menu
// ==========================================================================================
// function renderButtons() {

// 	for (var i = 0; i < cryptocurrencies.length; i++) {

// 		var addButton = $("<button>");
// 		addButton.addClass("cryptocurrency btn button");
// 		addButton.attr("data-name", cryptocurrencies[i]);
// 		addButton.text(cryptocurrencies[i]);
// 		$(".portfolio").append(addButton);
// 	}
// }

var getCurrency = 0;
var getCurrencyName;



// =====================================================================================
// Foreign currency converter API that pulls up-to-date information
// on exchange rates between USD and other foreign currencies.
// ======================================================================================
function converterAJAXCall (){

	var converterQueryURL = "http://api.fixer.io/latest?base=USD";

	// var getCurrency = $("#currency-dropdown").val();
	// var getCurrencyName = $('#currency-dropdown').attr("data-name");
	var currencySelector = $("<div id='currency-selector'>")
	var currencyLabel = $("<span for='currency-dropdown'>")
	var currencyDropdown = $("<select id='currency-dropdown'>");

	$.ajax({
		url: converterQueryURL,
		method: "GET"
	})
	.done(function(response) {

		console.log(response);

			// Creating foreign currency dropdown with API info

			$.each(response.rates, function (i, val) {
				
				var currencyDropdownOptions = $("<option>");
				currencyDropdownOptions.addClass("currency-dropdown-option");
				currencyDropdownOptions.attr("value", val);
				currencyDropdownOptions.attr("data-name", i);
				currencyDropdownOptions.text(i);
				currencyDropdown.append(currencyDropdownOptions);
				currencySelector.append(currencyLabel);
				currencySelector.append(currencyDropdown);

				$("#button-holder").append(currencySelector);
			});
		})
}

// Calling the converter function
converterAJAXCall();

// ===================================================================================



// ===================================================================================
// CoinMarketCap API AJAX call function to generate the ticker sidebar
// ===================================================================================
function tickerAJAXCall (){

	var topNumber = "10"
	var TickerQueryURL = "https://api.coinmarketcap.com/v1/ticker/?convert=" + "&limit=" + topNumber;


	$.ajax({
		url: TickerQueryURL,
		method: "GET"
	})
	.done(function(response) {



		$("#tickerList").empty();

		var results = response;




			// This for loop takes the info from the API call
			// and pushes it to the DOM
	for (var i = 0; i < results.length; i++) {

                var tickerDiv = $("<div class='ticker'>");
                var currencyName =  results[i].name + "  (" + results[i].symbol + ") @ $" + accounting.formatNumber(results[i].price_usd, 2) + "  USD  <br>";
                var ranking =  "Currency Rank: " + results[i].rank + "<br>";
                var priceOther = "<p>" + results[i].price_eur + "  Other  </p>";
                var changeOnehour = $("<span>");
                var lineBreak = ("<br>");
                var changeDay = $("<span>");
                var foreignCurrencyMultiplier = (getCurrency * results[i].price_usd).toFixed(2);
                console.log("Currency name" + getCurrencyName);

                if (results[i].percent_change_1h > 0) {
                    changeOnehour.attr("style", "color: green;");
                }
                else {
                    changeOnehour.attr("style", "color: red;");
                }

                if (results[i].percent_change_24h > 0) {
                    changeDay.attr("style", "color: green;");
                }
                else {
                    changeDay.attr("style", "color: red;");
                }
                
                tickerDiv.append(currencyName);
                tickerDiv.append(ranking);
                tickerDiv.append(changeOnehour);
                tickerDiv.append(lineBreak);
                changeOnehour.html(results[i].percent_change_1h + "% in last hour");
                changeDay.html(results[i].percent_change_24h + "%  in last 24 hours");
                tickerDiv.append(changeDay);
                tickerDiv.append(lineBreak);
                // changeOnehour.html(results[i].percent_change_1h + "% in last hour");
                tickerDiv.append(accounting.formatNumber(foreignCurrencyMultiplier, 2));
                tickerDiv.append(lineBreak);
                tickerDiv.append(lineBreak);

                

                // appending the the Main body - Ticker Section. 
                $("#tickerList").append(tickerDiv);

            }


			// This listener changes the ticker when the 
			// foreign currency dropdown is changed

			$("#currency-dropdown").on("change", function(){
				getCurrency = $("#currency-dropdown").val();
				getCurrencyName = $(this).attr("data-name");
				$("#tickerList").empty();
				tickerAJAXCall();

			});

			
		});
}



// ==================================================================================================
// ================================End of TICKER AJAX CALL FUNCTION==================================
// ==================================================================================================
	var time = 1000*300;
// Call function to generate ticker when page loads
	tickerAJAXCall();

 	 setTimeout(function(){
			  	tickerAJAXCall();
  				},time);



// =================================================================================================
// Currency search box listener that also calls the renderButtons
// function, which makes a button based on the search and also
// writes that info to the DOM
// =================================================================================================

$(document).on("click", "#add-currency", function(event) {
	event.preventDefault();
	var cryptocurrencyType = $("#currency-input").val().trim();
	cryptocurrencies.push(cryptocurrencyType);
	$("#currency-input").val("");
	searchCurrencyAJAXCall (cryptocurrencyType);
});

// CoinMarketCap API AJAX call that pulls the information for
// a specific currency. This is different from the ticker AJAX
// call because the ticker only pulls a set amount of info (limit)
// but this call will search all 1100+ currencies on CoinMarketCap.

function searchCurrencyAJAXCall (currency){

	var searchQueryURL = "https://api.coinmarketcap.com/v1/ticker/" + currency + "/";

	$.ajax({
		url: searchQueryURL,
		method: "GET"
	})
	.done(function(response) {

		console.log(response);
		var results = response;
		var searchedCurrencyDiv = $("<div class='searched'>");
		// var USDConverterForm = $("<form class='usd-to-crypto'>");
		var USDConverterFormLabel = $("<span class='searchedDetails'>");
		var USDConverterFormInput = $("<input type='number' class='usd-to-crypto-box'>");
		var converterResults = $("<span class='converter-result'>");
		

		searchedCurrencyDiv.attr("style", "color: black;");
		searchedCurrencyDiv.attr("data-conversion", results[0].price_usd);

		
		converterResults.attr("data-name", results[0].name);
		USDConverterFormInput.attr("data-name", results[0].name);
		searchedCurrencyDiv.append("<span id= 'crypto-name' >" + results[0].name + "</span><br>");
		searchedCurrencyDiv.append("<span class='searchedDetails'>Current Price -- $" + results[0].price_usd + " USD</span><br>");
		searchedCurrencyDiv.append("<span class='searchedDetails id='percentChange'>" + "<span id='dayPriceChange'>" + results[0].percent_change_24h + "</span>" + "% in last 24 hours</span><br>")
		USDConverterFormLabel.html("My " + results[0].name + " balance $");
		searchedCurrencyDiv.append(USDConverterFormLabel);
		USDConverterFormInput.attr("placeholder", "Convert " + results[0].name + " to USD");
		searchedCurrencyDiv.append(USDConverterFormInput);
		USDConverterFormLabel.append(converterResults);
		USDConverterFormLabel.append("<br>");

 

		$("#portfolio").append(searchedCurrencyDiv);

			});

		}




			$(document).on("change", ".usd-to-crypto-box", function(event){


					event.preventDefault();
					var userUSD = $(this).val();
					console.log(userUSD);
					// ading the user input value of their currencyValue. 
					var userMoneyConverter = $(this).closest(".searched").attr("data-conversion");
					// $(converterResults).text("$" + userMoneyConverter.toFixed(2) + " USD");
					console.log(userMoneyConverter);
					var resultDiv = $(this).closest(".searched").find(".converter-result");
					console.log(resultDiv);
					resultDiv.text(accounting.formatNumber(userMoneyConverter * userUSD, 2));

					var myCurrencyValue = userMoneyConverter * userUSD;

					myTotalBalance += myCurrencyValue;
					console.log("my total Blance " + myTotalBalance);
					$('#myValue').html(accounting.formatNumber(myTotalBalance, 2));



					if (userUSD < 0) {
                        $(this).val("");
                        resultDiv.empty();
                        $(this).attr("style", "border-color: red");
                        $(this).attr("placeholder", "Please enter positive number");
                        $(this).animate({left: "+=20px"}, 100);
                        $(this).animate({left: "-=40px"}, 100);
                        $(this).animate({left: "+=30px"}, 100);
                        $(this).animate({left: "-=10px"}, 100);

                    }
                    else {
                        $(this).attr("style", "border-color: none");
                        $(this).attr("placeholder", "");

                    }

                      if(myTotalBalance <= 0){
                     	$('.balance').attr("style", "opacity: 0");
                     } 
                     else{
                     	$('.balance').attr("style", "opacity: 1");
                     }
 
				});


 				  if(myTotalBalance <= 0){
                     	$('.balance').attr("style", "opacity: 0");
                     } 
                     else{
                     	$('.balance').attr("style", "opacity: 1");
                     }



