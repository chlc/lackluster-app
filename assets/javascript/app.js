   
    // Test of the API Connection
    var queryURL = "https://api.coinmarketcap.com/v1/ticker/";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      // console load API call. 
      console.log(response);
     
    });