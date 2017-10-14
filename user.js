//Todo's as of 10.14.17
//Figure out why data is not pushing to authentication server firebase
//Figure out how to have both forms work independently of eachother -- DONE
//Figure out re-directs for when buttons are set
//Figure out how to get data in both DB and authentication
//Figure out email authentication
//Figure out localstorage / saving user settings 
//Stylistic bs
//Cleanup





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
  var auth = firebase.auth();
  var user = firebase.auth().currentUser;
  console.log(config);

var emailnew;
var passwordnew;

//Collect User Data from Signup
$("#signupbutton").click(function(event){
		event.preventDefault();
emailnew = $("#emailSignup").val();
passwordnew = $("#passwordSignup").val();
database.ref().push(emailnew, passwordnew);
console.log(emailnew);
console.log(passwordnew);
  });



//Creates New User via Firebase Authentication
 var promise = auth.createUserWithEmailAndPassword(emailnew, passwordnew);
 promise.then(function(user) {
 user.sendEmailVerification().then(function() {
 // Email sent.
 }, function(error) {
 // An error happened.
 });

 //Sends User Info to firebase DB
user.updateProfile({
    Name: name,
    Email: emailnew  
  }).then(function() {
  // Update successful.
  }, function(error) {
  // An error happened.
 });


// Clears all of the text-boxes for user signup
  $("#emailSignup").val("");
  $("#passwordSignup").val("");


//User Login Event
var emailLogin = document.getElementById('emailLogin');
var passwordLogin = document.getElementById('passwordLogin');

$("#login").click(function(event){
		event.preventDefault();
 		

 var email = emailLogin.value;
 var password = passwordLogin.value;
 var auth = firebase.auth();

 var promise = auth.signInWithEmailAndPassword(email, password);
 promise.catch(function (e) {
 return console.log(e.message);
  });

// //Page redirect
// firebase.auth().onAuthStateChanged(user => {
//   if(user) {
//     window.location = 'index.html';
//   }
//   else{
//     //Do nothing.
//   }
// });

// Authentication Listner
// Verifies that login credentials are correct otherwise returns error message
 var Message = "<div class=\"loginmessage\">" + "Login Unsuccessful" + "</div>";
 firebase.auth().onAuthStateChanged(function (firebaseUser) {
 if (firebaseUser) {
 console.log(firebaseUser);
 } else {
  $('#loginmessage').append(Message);
 console.log('not logged in');
 } // end else statement
 }); // end function
 });

// Clears all of the text-boxes for user login
  $("#emailLogin").val("");
  $("#passwordLogin").val("")
});