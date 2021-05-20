/*---------------------------------------------------------------------------------------------------------*/
var curr_user=" ";
var db = firebase.firestore();
 var students = db.collection("students");
var first_exam = 0 ,third_exam = 0 , second_exam = 0 ;
var total_marks = (first_exam+second_exam+third_exam)/3;
/*---------------------------------------------------------------------------------------------------------*/
function register(email, password ,fname , lname) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function(user) {
        verifyUser(email);
       
        students.doc(firebase.auth().currentUser.uid).set({
          exams : {
            firstexam: first_exam ,
            socondexam: second_exam ,
            thirdexam: third_exam,
            totalmarks : total_marks
          },
          info : {
            useremail : email,
            firstname : fname,
            lastname : lname,
            isverified : firebase.auth().currentUser.emailVerified
          }
      });
        alert("User account created");
      })
      .catch(function(error) {
        alert(error);
      });
  }
/*---------------------------------------------------------------------------------------------------------*/ 
  function logIn(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function(user) {
        if (firebase.auth().currentUser !== null) 
          if(firebase.auth().currentUser.emailVerified == true){
        curr_user=firebase.auth().currentUser.uid;
        setCookie("curr_user", curr_user, 1);
        location.href = "./section1.html";}else{
          alert("you email is not verified! check your email !");
        }
      })
      .catch(function(error) {
        alert(error);
      });
  }
  /*---------------------------------------------------------------------------------------------------------*/
  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 2 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
/*---------------------------------------------------------------------------------------------------------*/
function  signOut() {
    firebase.auth().signOut().then(function () {
        alert("User signed out !"); 
        location.href = "./index.html";       
    }).catch(function (error) {
        alert("Something wrong!");  
    })    
}
/*---------------------------------------------------------------------------------------------------------*/
 function printinfo(){
  var user = firebase.auth().currentUser;
 username_id.innerHTML = user.email;
 }
/*---------------------------------------------------------------------------------------------------------*/
   function verifyUser() {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function(){
      alert(" Verification Email sent! ");
    }).catch("Email not sent!"); 
  }
/*---------------------------------------------------------------------------------------------------------*/
function resetPassword(email) { 
    firebase.auth().sendPasswordResetEmail(email).then(function(){
        alert(" Reset Password Email Sent !");
    }).catch("Email not Sent !");    
}    
/*---------------------------------------------------------------------------------------------------------*/
