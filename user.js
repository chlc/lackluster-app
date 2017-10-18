//Todos 10.17.17
//Refine user-login so that created account can be used to login
//Change redirect link
//Create console log messages for sucessfull and unsuccessful login
//Create messages to populate in div inside modal if login is unsuccessful
//Send email verification link
//Store session in local storage / cache
//Add "logout" button


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


  // var firebaseref = new Firebase("https://lackluster-5966e.firebaseapp.com");
  var database = firebase.database();
  var auth = firebase.auth();
  var user = firebase.auth().currentUser;
  console.log(config);

//Collect User Data from Signup
$("#signupbutton").click(function(event){
   event.preventDefault();
emailnew = $("#emailSignup").val();
passwordnew = $("#passwordSignup").val();
database.ref().push({ email: emailnew, password: passwordnew });
console.log(emailnew);
console.log(passwordnew);
  });

//Collect User Data from Login
$("#login").click(function(event){
   event.preventDefault();
emailcurrent = $("#emailLogin").val();
passwordcurrent = $("#passwordLogin").val();
database.ref().push({ email: emailcurrent, password: passwordcurrent });
console.log(emailcurrent);
console.log(passwordcurrent);
  });

  //User signup function
 $('#signupbutton').click(function() {

        var email = $('#emailSignup');    
        var pass = $('#passwordSignup');      

      if(email.val() && pass.val()){

    firebase.auth().createUserWithEmailAndPassword(email.val(), pass.val()).then(function(user){
        console.log('everything went fine');
        console.log('user object:' + user);
        //you can save the user data here.
    }).catch(function(error) {
        console.log('there was an error');
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + ' - ' + errorMessage);
    });
    firebase.auth().onAuthStateChanged(user => {
  if(user) {
    window.location = 'homeApp.html'; //After successful login, user will be redirected to home.html
  }
});

} else {
    console.log('fill in both fields');
}
});

//User Login Function
 $('#login').click(function() {

        var email = $('#emailLogin');    
        var pass = $('#passwordLogin');      

      if(email.val() && pass.val()){

    firebase.auth().signInWithEmailAndPassword(email.val(), pass.val()).then(function(user){
        console.log('everything went fine');
        console.log('user object:' + user);
        //you can save the user data here.
        
    }).catch(function(error) {
        console.log('there was an error');
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + ' - ' + errorMessage);
    });
    firebase.auth().onAuthStateChanged(user => {
  if(user) {
    window.location = 'homeApp.html'; //After successful login, user will be redirected to home.html
  }
});

} else {
    console.log('fill in both fields');
}
});