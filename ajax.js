//Login Modal Trigger


// Custom cryptocurrency menu buttons array

var cryptocurrencies = [];

// Function to render cryptocurrency buttons for menu

function renderButtons() {

	$("#currency-buttons").empty();

	for (var i = 0; i < cryptocurrencies.length; i++) {

		var addButton = $("<button>");
		addButton.addClass("cryptocurrency btn");
		addButton.attr("data-name", cryptocurrencies[i]);
		addButton.text(cryptocurrencies[i]);
		$("#currency-buttons").append(addButton);
	}
}

// // Currency converter array

var convertingCurrencies = ["AUD", "BRL", "CAD", "CHF", "CLP", "CNY", 
"CZK", "DKK", "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", 
"INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD",  "PHP", 
"PKR", "PLN", "RUB", "SEK", "SGD", "THB", "TRY", "TWD", "ZAR"];

// // Creating currency dropdown

// var currencySelector = $("<div id='currency-selector'>")
// var currencyLabel = $("<label for='currency-dropdown'>")
// var currencyDropdown = $("<select id='currency-dropdown'>");


// for (var i = 0; i < convertingCurrencies.length; i++) {
// 	var currencyDropdownOptions = $("<option>");
// 	currencyDropdownOptions.addClass("currency-dropdown-option");
// 	currencyDropdownOptions.attr("value", convertingCurrencies[i]);
// 	currencyDropdownOptions.text(convertingCurrencies[i]);
// 	currencyDropdown.append(currencyDropdownOptions);
// }

// currencySelector.append(currencyLabel);
// currencySelector.append(currencyDropdown);

// $("#header").append(currencySelector);

// Note: The dropdown is not yet connected to the API AJAX call, 
// that is the next step
var getCurrency = $("#currency-dropdown").val();

$("#currency-dropdown").on("change", function(){
	getCurrency = $("#currency-dropdown").val();
	tickerAJAXCall(getCurrency);

});

// API AJAX call function

function tickerAJAXCall (currency){

var topNumber = "10"
var TickerQueryURL = "https://api.coinmarketcap.com/v1/ticker/?convert=" + "&limit=" + topNumber;

		$("#footer").empty();

		$.ajax({
			url: TickerQueryURL,
			method: "GET"
		})
		.done(function(response) {

			console.log(response);

			var results = response;

			$("#currency-dropdown").on("change", function(){
				getCurrency = $("#currency-dropdown").val();
				tickerAJAXCall(getCurrency);

			});


			for (var i = 0; i < results.length; i++) {

				var tickerDiv = $("<div class='ticker'>");
				var ranking = "<p>" + results[i].rank + ". </p>";
				var currencyName = "<p>" + results[i].name + "  (" + results[i].symbol + ") </p>";
				var priceUSD = "<p> $" + results[i].price_usd + "  USD  </p>";
				var priceOther = "<p>" + results[i].price_eur + "  Other  </p>";
				var changeOnehour = $("<p>");
				var changeDay = "<p>" + results[i].percent_change_24h + "%  in last 24 hours</p>";

				if (results[i].percent_change_1h > 0) {
					changeOnehour.attr("style", "color: green;");
				}
				else {
					changeOnehour.attr("style", "color: red;");
				}

				tickerDiv.append(ranking);
				tickerDiv.append(currencyName);
				tickerDiv.append(priceUSD);
				tickerDiv.append(Math.floor(getCurrency * results[i].price_usd));
				changeOnehour.html(results[i].percent_change_1h + "% in last hour");
				tickerDiv.append(changeOnehour);
				tickerDiv.append(changeDay);

				$("#footer").append(tickerDiv);
			}
		});
	}

// Call function to generate ticker when page loads

	tickerAJAXCall(getCurrency);

// Reload ticker when type of currency is changed in dropdown

$("#currency-dropdown").on("change", function(){
var getCurrency = $("#currency-dropdown").val();
	tickerAJAXCall(getCurrency);

});

// Currency search box listener

$("#add-currency").on("click", function(event) {
	event.preventDefault();
	var cryptocurrencyType = $("#currency-input").val().trim();
	cryptocurrencies.push(cryptocurrencyType);
	renderButtons();
	$("#currency-input").val("");
	searchCurrencyAJAXCall (cryptocurrencyType);
});

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

				searchedCurrencyDiv.attr("style", "color: blue;");
				
				searchedCurrencyDiv.append("<p>" + results[0].rank + ". </p>");
				searchedCurrencyDiv.append("<p> $" + results[0].price_usd + " USD</p>");
				searchedCurrencyDiv.append("<p>" + results[0].percent_change_1h + "% </p>");
				searchedCurrencyDiv.append("<p>" + results[0].percent_change_24h + "% </p>");

				$("#currency-description").append(searchedCurrencyDiv);
			
		});
	}






function converterAJAXCall (currency){

var converterQueryURL = "http://api.fixer.io/latest?base=USD";
var getCurrency = $("#currency-dropdown").val();
var currencySelector = $("<div id='currency-selector'>")
var currencyLabel = $("<label for='currency-dropdown'>")
var currencyDropdown = $("<select id='currency-dropdown'>");


		$.ajax({
			url: converterQueryURL,
			method: "GET"
		})
		.done(function(response) {

			console.log(response);

			$.each(response.rates, function (i, val) {
				


	var currencyDropdownOptions = $("<option>");
	currencyDropdownOptions.addClass("currency-dropdown-option");
	currencyDropdownOptions.attr("value", val);
	currencyDropdownOptions.attr("data-name", i);
	currencyDropdownOptions.text(i);
	currencyDropdown.append(currencyDropdownOptions);


currencySelector.append(currencyLabel);
currencySelector.append(currencyDropdown);

$("#header").append(currencySelector);
			})

			

			// var results = response;

			// for (var i = 0; i < results.length; i++) {

			// 	var tickerDiv = $("<div class='ticker'>");
			// 	var ranking = "<p>" + results[i].rank + ". </p>";
			// 	var currencyName = "<p>" + results[i].name + "  (" + results[i].symbol + ") </p>";
			// 	var priceUSD = "<p> $" + results[i].price_usd + "  USD  </p>";
			// 	var priceOther = "<p>" + results[i].price_eur + "  Other  </p>";
			// 	var changeOnehour = $("<p>");
			// 	var changeDay = "<p>" + results[i].percent_change_24h + "%  in last 24 hours</p>";

			// 	if (results[i].percent_change_1h > 0) {
			// 		changeOnehour.attr("style", "color: green;");
			// 	}
			// 	else {
			// 		changeOnehour.attr("style", "color: red;");
			// 	}

			// 	tickerDiv.append(ranking);
			// 	tickerDiv.append(currencyName);
			// 	tickerDiv.append(priceUSD);
			// 	tickerDiv.append(priceOther);
			// 	changeOnehour.html(results[i].percent_change_1h + "% in last hour");
			// 	tickerDiv.append(changeOnehour);
			// 	tickerDiv.append(changeDay);

			// 	$("#footer").append(tickerDiv);
		// 	}
		// });
	});
}

	converterAJAXCall ();

