// Initialize Firebase
  var config = {
    apiKey: 'AIzaSyBU1fYqhQrVskqgA0Okr3ZStPfYz0s3QWQ',
    authDomain: "https://lackluster-5966e.firebaseapp.com",
    databaseURL: 'https://lackluster-5966e.firebaseio.com',
    projectId: "lackluster-5966e",
    storageBucket: 'https://lackluster-5966e.appspot.com',
    messagingSenderId: "489067404953"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  console.log(config);


//Collect User Data from Signup
$("#signup").click(function(event){
		event.preventDefault();
		var email-signup = $('#email-signup').val().trim();
		var password-signup = $("#password-signup").val().trim();

		var newuser = {
    email: email-signup
    password: password-signup
  };

// Uploads new user data to the database
  database.ref().push(newuser);

// Logs everything to console
  console.log(newuser.email);
  console.log(newuser.password);

// Clears all of the text-boxes
  $("#email-signup").val("");
  $("#password-signup").val("");