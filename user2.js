//Set global user
myUser = -1;
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

var ref = Firebase("https://lackluster-5966e.firebaseapp.com");

//Link to Login Form
$("#login").on('click', function() 
{
        var email = $("#emailLogin").val();
        var password = $("#passwordLogin").val();
        firebaseref.authWithPassword({
            email: email,
            password: password
        }, 
        function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
            }
        });
});

//Link to Signup Form
$("#signupbutton").on('click', function() 
{
  var email = $("#email-signup").val();
  var password = $("#password-signup").val();
  firebaseref.createUser({
    email: email,
    password: password
  },function(error, userData) {
    if (error) {
      console.log("Error creating user:", error);
    } 
    else {
      console.log("Successfully created user account with uid:", userData.uid);              
    }
  });
});


//Try this if other thing doesnt work
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

} else {
    console.log('fill in both fields');
}  





// var emailnew;
// var passwordnew;





// //Creates New User via Firebase Authentication
//  var promise = auth.createUserWithEmailAndPassword(emailnew, passwordnew);
//  promise.then(function(user) {
//  user.sendEmailVerification().then(function() {
//  // Email sent.
//  }, function(error) {
//  // An error happened.
//  });

//  //Sends User Info to firebase DB
// user.updateProfile({
//     Name: name,
//     Email: emailnew  
//   }).then(function() {
//   // Update successful.
//   }, function(error) {
//   // An error happened.
//  });


// // Clears all of the text-boxes for user signup
//   $("#emailSignup").val("");
//   $("#passwordSignup").val("");


// //User Login Event
// var emailLogin = document.getElementById('emailLogin');
// var passwordLogin = document.getElementById('passwordLogin');

// $("#login").click(function(event){
//    event.preventDefault();
    

//  var email = emailLogin.value;
//  var password = passwordLogin.value;
//  var auth = firebase.auth();

//  var promise = auth.signInWithEmailAndPassword(email, password);
//  promise.catch(function (e) {
//  return console.log(e.message);
//   });

// // //Page redirect
// // firebase.auth().onAuthStateChanged(user => {
// //   if(user) {
// //     window.location = 'index.html';
// //   }
// //   else{
// //     //Do nothing.
// //   }
// // });

// // Authentication Listner
// // Verifies that login credentials are correct otherwise returns error message
//  var Message = "<div class=\"loginmessage\">" + "Login Unsuccessful" + "</div>";
//  firebase.auth().onAuthStateChanged(function (firebaseUser) {
//  if (firebaseUser) {
//  console.log(firebaseUser);
//  } else {
//   $('#loginmessage').append(Message);
//  console.log('not logged in');
//  } // end else statement
//  }); // end function
//  });

// // Clears all of the text-boxes for user login
//   $("#emailLogin").val("");
//   $("#passwordLogin").val("")
// });