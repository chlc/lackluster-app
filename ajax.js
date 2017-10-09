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

// Currency converter array

var convertingCurrencies = ["AUD", "BRL", "CAD", "CHF", "CLP", "CNY", 
"CZK", "DKK", "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", 
"INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", 
"PKR", "PLN", "RUB", "SEK", "SGD", "THB", "TRY", "TWD", "ZAR"];

// Creating currency dropdown

var currencySelector = $("<div id='currency-selector'>")
var currencyLabel = $("<label for='currency-dropdown'>")
var currencyDropdown = $("<select id='currency-dropdown'>");


for (var i = 0; i < convertingCurrencies.length; i++) {
	var currencyDropdownOptions = $("<option>");
	currencyDropdownOptions.addClass("currency-dropdown-option");
	currencyDropdownOptions.attr("value", convertingCurrencies[i]);
	currencyDropdownOptions.text(convertingCurrencies[i]);
	currencyDropdown.append(currencyDropdownOptions);
}

currencySelector.append(currencyLabel);
currencySelector.append(currencyDropdown);

$("#header").append(currencySelector);

// Note: The dropdown is not yet connected to the API AJAX call, 
// that is the next step

// API AJAX call function

function tickerAJAXCall (currency){

var topNumber = "10"
var queryURL = "https://api.coinmarketcap.com/v1/ticker/?convert=" + currency + "&limit=" + topNumber;
// var otherCurrency = results[i].price_ + currency.toLowerCase();

		$("#footer").empty();

		$.ajax({
			url: queryURL,
			method: "GET"
		})
		.done(function(response) {

			console.log(response);

			var results = response;

			for (var i = 0; i < results.length; i++) {

				var tickerDiv = $("<div class='ticker'>");
				var ranking = "<p>" + results[i].rank + ". </p>";
				var currencyName = "<p>" + results[i].name + "  (" + results[i].symbol + ") </p>";
				var priceUSD = "<p>" + results[i].price_usd + "  USD  </p>";
				var priceOther = "<p>" + results[i].price_eur + "  Other  </p>";
				var changeOnehour = "<p>" + results[i].percent_change_1h + "%  </p>";
				var changeDay = "<p>" + results[i].percent_change_24h + "%  </p>";

				tickerDiv.append(ranking);
				tickerDiv.append(currencyName);
				tickerDiv.append(priceUSD);
				tickerDiv.append(priceOther);
				tickerDiv.append(changeOnehour);
				tickerDiv.append(changeDay);

				$("#footer").append(tickerDiv);
			}
		});
	}

// Call function to generate ticker when page loads

	tickerAJAXCall("EUR");

// Reload ticker when type of currency is changed in dropdown

$("#currency-dropdown").on("change", function(){
var getCurrency = $("#currency-dropdown").val();
console.log(getCurrency);
	tickerAJAXCall(getCurrency);

});

// Currency search box listener

$("#add-currency").on("click", function(event) {
	event.preventDefault();
	var cryptocurrencyType = $("#currency-input").val().trim();
	cryptocurrencies.push(cryptocurrencyType);
	renderButtons();
	$("#currency-input").val("");
});

