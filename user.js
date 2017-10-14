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
$("#signup").click(function(event){(
		event.preventDefault()
 var emailnew = email-signup.val
 var passwordnew = password-signup.val
 var auth = firebase.auth()
 var user = firebase.auth().currentUser
  )};

//Creates New User via Firebase Authentication
 var promise = auth.createUserWithEmailAndPassword(email, pass);
 promise.then(function(user) {
 user.sendEmailVerification().then(function() {
 // Email sent.
 }, function(error) {
 // An error happened.
 });

 //Sends User Info to firebase DB
user.updateProfile({
    Name: "#name"
    Email: "#emailnew"  
  }).then(function() {
  // Update successful.
  }, function(error) {
  // An error happened.
 });

// Clears all of the text-boxes for user signup
  $("#email-signup").val("");
  $("#password-signup").val("");


//User Login Event
var email-login = document.getElementById('email-login');
var password-login = document.getElementById('password-login');

$("#login").click(function(event){
		event.preventDefault();
 		

 var email = email-login.value;
 var password = password-login.value;
 var auth = firebase.auth();

 var promise = auth.signInWithEmailAndPassword(email, password);
 promise.catch(function (e) {
 return console.log(e.message);
  };

// Clears all of the text-boxes for user login
  $("#email-login").val("");
  $("#password-login").val("");