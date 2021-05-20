(function(){//firebase init 
 var db = firebase.firestore();
 var exam_first_question = db.collection("exam-fourth-question");
 var size_flush=null;
 



loadQuestions();  //loading the questions from database

    function loadQuestions(){   
      myQuestions = [];
      
      exam_first_question.get().then(function(querySnapshot) {
        
        querySnapshot.forEach((doc) => {
          var document = doc.data();
          myQuestions.push(  {
            question: document.question,
            answers: {
            أ : document.answers["أ"],
            ب : document.answers["ب"],
            ج : document.answers["ج"],
            د : document.answers["د"],
            ه : document.answers["ه"],
            و : document.answers["و"]},
            correctAnswer: document.correctAnswer});
          })
        }).then(function(){buildQuiz()});
      }

function saveExam(myQuestions, exam_first_question) {   //save the eaxm to the database
  exam_first_question.get().then((querySnapshot) => {
    size_flush=querySnapshot.size;
 })
for(let i =0 ; i< size_flush ; i++){
  exam_first_question.doc("question"+i).delete().then(function() {
   //continue;
}).catch(function(error) {
    //continue;
    console.log(error);
});
}
 myQuestions.forEach(
  (currentQuestion, questionNumber) => {
    exam_first_question.doc("question"+questionNumber).set({
        answers : {
          أ:currentQuestion.answers["أ"],
          ب:currentQuestion.answers["ب"],
          ج:currentQuestion.answers["ج"],
          د:currentQuestion.answers["د"],
          ه:currentQuestion.answers["ه"],
          و:currentQuestion.answers["و"]
        },
        correctAnswer : currentQuestion.correctAnswer,
        question : currentQuestion.question
    });
  });

  alert("המבחן נשמר בהצלחה!");
}

  function getCookie(cname) {          //get the uid to check the user
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  function checkAdmin(curr_user) {    //check if the user is an admin
    if(curr_user !== "wlZmkJiQeDOUXqlxJk9c10hZ0P72" || curr_user == null ){
        $( ".admin-btn-group" ).remove()
        $(".form-popup").remove()
       }
    if(curr_user == "wlZmkJiQeDOUXqlxJk9c10hZ0P72"){
      $("#submit").remove()
      $(".submit-ques-form").remove()
    }//make an popup for the admin to be sure saving the exam before continue
}

$("#admin-form-cancel-btn").click(function(){
  $("#admin-ques-form").hide()});


$("#submit").click(function(){
  $("#submit-ques-form").toggle()
  });

  $("#close-form-ques-btn").click(function(){
    $("#submit-ques-form").hide()});
    
    
//this function for the add question button and form
	$("#admin-add-ques-btn").click(function(){
		$("#add-ques-form").toggle()
		$("#del-ques-form").hide()
		$("#edit-ques-form").hide()});
	
	$("#close-form-add-ques-btn").click(function(){
		$("#add-ques-form").hide()});
//####################################
//this function for the delete question button and form	
	$("#admin-del-ques-btn").click(function(){
		$("#del-ques-form").toggle()
		$("#add-ques-form").hide()
		$("#edit-ques-form").hide()});
	
	$("#close-form-del-ques-btn").click(function(){
		$("#del-ques-form").hide()});
//####################################
//this function for the edit question button and form
	$("#admin-edit-ques-btn").click(function(){
		$("#edit-ques-form").toggle()
		$("#add-ques-form").hide()
		$("#del-ques-form").hide()});
	
	$("#close-form-edit-ques-btn").click(function(){
		$("#edit-ques-form").hide()});
//####################################	
//this function for adding question and answers

	function addQuestion(myQuestions,question,a,b,c,d,e,f,corrAnswer){   
	    if(question=="" || a=="" || b=="" || corrAnswer==""){
          alert("שדה חובה נשאר ריק!");}
        else if (corrAnswer==1){corrAnswer='أ'}
        else if (corrAnswer==2){corrAnswer='ب'}
        else if (corrAnswer==3){corrAnswer='ج'}
        else if (corrAnswer==4){corrAnswer='د'}
        else if (corrAnswer==5){corrAnswer='ه'}
        else if (corrAnswer==6){corrAnswer='و'}
          
	      if (corrAnswer !='أ' && corrAnswer !='ب' && corrAnswer !='ج' && corrAnswer !='د' && corrAnswer !='و' && corrAnswer !='ه'){
	        alert("שדה התשובה הנכונה בפורמט לא נכון!");
        }
	    else{
	    myQuestions.push({
      question:question ,
      answers: {
        أ : a,
        ب : b,
        ج : c,
		د : d,
		ه : e,
		و : f
      },
      correctAnswer: corrAnswer
    });
		//before bulding the quiz i have to use swich case to check if the answer iis empty or not so i can know if i choose the right answer

	buildQuiz();}}
//this function for adding question and answers
	
//this function for deleting question and answers
	function deleteQuestion(myQuestions,questionNumber){

		if (isNaN(questionNumber) || questionNumber < 0 || questionNumber > myQuestions.length) {
			alert("נא להוסיף מספר תקין!");
		}else{
		myQuestions.splice(questionNumber,1);
		buildQuiz();}
	}
	
//this function for deleting question and answers
//this function for editing question and answers
	function editQuestion(myQuestions,questionNumber,question,a,b,c,d,e,f,corrAnswer){
	    if(question=="" || a=="" || b=="" || corrAnswer=="" || questionNumber ==""){
          alert("שדה חובה חסר");}
          else if (corrAnswer==1){corrAnswer='أ'}
          else if (corrAnswer==2){corrAnswer='ب'}
          else if (corrAnswer==3){corrAnswer='ج'}
          else if (corrAnswer==4){corrAnswer='د'}
          else if (corrAnswer==5){corrAnswer='ه'}
          else if (corrAnswer==6){corrAnswer='و'}
	     if (corrAnswer !='أ' && corrAnswer !='ب' && corrAnswer !='ج' && corrAnswer !='د' && corrAnswer !='و' && corrAnswer !='ه'){
	        alert("התשובה הנכונה בפורמט לא תקין");
        }
	    else{
	    deleteQuestion(myQuestions,questionNumber);
	    myQuestions.splice(questionNumber,0,{
      question:question ,
      answers: {
        أ : a,
        ب : b,
        ج : c,
		د : d,
		ه : e,
		و : f
      },
      correctAnswer: corrAnswer
    });
	
	    buildQuiz();}}
//this function for editing question and answers


  function buildQuiz(){
    const output = [];

    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

         
        const answers = [];

        
        for(letter in currentQuestion.answers){
			if(currentQuestion.answers[letter]!== null && currentQuestion.answers[letter] !== ''){
         //this print what inside the answer letter
          answers.push(
          `
          <label class="container">
          ${letter}
          :${currentQuestion.answers[letter]}        
          <input type="radio" name="question${questionNumber}" value="${letter}">
			     <span class="checkmark"></span>
            </label>            
            `
			);}
			else{
				continue;
			}
        }

        

        
        output.push(
          `<label> ${questionNumber}: رقم السؤال </label>
          <div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join('')} </div>`
        );
      }
    );

    
    quizContainer.innerHTML = output.join('');
    printinfo();
  }

  function showResults(){

    
    const answerContainers = quizContainer.querySelectorAll('.answers');

    
    let numCorrect = 0;

    
    myQuestions.forEach( (currentQuestion, questionNumber) => {

    
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      
      if(userAnswer === currentQuestion.correctAnswer){
        
        numCorrect = numCorrect +5;

        
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      
      else{
       
        answerContainers[questionNumber].style.color = 'red';
      }
    });
    
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length*5}`;
  }


  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const adminSubmitButton = document.getElementById('admin-form-ques-btn');
  const saveExamBtn = document.getElementById('admin-save-exam-btn');
  const submitAddQuestion = document.getElementById('submit-form-add-ques-btn');
  const submitDeleteQuestion = document.getElementById('submit-form-del-ques-btn');
  const submitEditQuestion = document.getElementById('submit-form-edit-ques-btn');
  var user_info= document.getElementById('username_id');
  var  myQuestions = [] ;


  var curr_user = getCookie("curr_user");
  window.onload = checkAdmin(curr_user);
  
  submitButton.addEventListener('click', showResults);
  submitAddQuestion.addEventListener('click', function() {addQuestion(myQuestions,
                                                                      document.getElementById("add-ques-input").value,
                                                                      document.getElementById("add-ans-a-input").value,
                                                                      document.getElementById("add-ans-b-input").value,
                                                                      document.getElementById("add-ans-c-input").value,
                                                                      document.getElementById("add-ans-d-input").value,
                                                                      document.getElementById("add-ans-e-input").value,
                                                                      document.getElementById("add-ans-f-input").value,
                                                                      document.getElementById("add-corr-ans-input").value,);});
  submitDeleteQuestion.addEventListener('click',function(){deleteQuestion(myQuestions,document.getElementById("del-ques-num-input").value);});
  submitEditQuestion.addEventListener('click', function() {editQuestion(myQuestions,
                                                                                    document.getElementById("edit-ques-num-input").value,
                                                                                    document.getElementById("edit-ques-input").value,
                                                                                    document.getElementById("edit-ans-a-input").value,
                                                                                    document.getElementById("edit-ans-b-input").value,
                                                                                    document.getElementById("edit-ans-c-input").value,
                                                                                    document.getElementById("edit-ans-d-input").value,
                                                                                    document.getElementById("edit-ans-e-input").value,
                                                                                    document.getElementById("edit-ans-f-input").value,
                                                                                    document.getElementById("edit-corr-ans-input").value);});
  saveExamBtn.addEventListener('click',function(){saveExam(myQuestions, exam_first_question);});
})();


function upload() {
  //get your select image
  var image=document.getElementById("file").files[0];
  //now get your image name
  var imageName=image.name;
  let t=get_mail();
  if(t!=-1)
  {
  imageName="4"+"."+t;
  }
  //firebase  storage reference
  //it is the path where yyour image will store
  var storageRef=firebase.storage().ref('studentsrecords/'+imageName);
  //upload image to selected storage reference
  var uploadTask=storageRef.put(image);

  uploadTask.on('state_changed',function (snapshot) {
      //observe state change events such as progress , pause ,resume
      //get task progress by including the number of bytes uploaded and total
      //number of bytes
      var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
      console.log("upload is " + progress +" done");
  },function (error) {
      //handle error here
      console.log(error.message);
  },function () {
     //handle successful uploads on complete

      uploadTask.snapshot.ref.getDownloadURL().then(function (downlaodURL) {
          //get your upload image url here...
alert("המבחן נשלח בהצלחה!");
      });
  });
}
function get_mail(){
	var user = firebase.auth().currentUser;
	var email;
	if (user != null) {
	  email = user.email;
	  return email;
	}
	return -1;
	}
  
/******************************************************************************************************/
var db = firebase.firestore();
var recorded = db.collection("exam-third-test2");
var url = "";
var url2="";
function loadrecord(){
recorded.get().then((querySnapshot) => {
querySnapshot.forEach((doc) => {
var document = doc.data();
var url1 = document.recordurl;
url2 = url1;
})
}).then(() =>{
document.getElementById('audio1').src = url2;
})
}
$("#changebtn").click(function(){
url = document.getElementById("input0").value;
recorded.doc("teacher-record").set( {
recordurl : url
});
document.getElementById('audio1').src = url2;
});
window.onload = loadrecord();
/******************************************************************************************************/

function changeAr() {
  document.getElementById("submit").innerHTML = "!خزن الإمتحان";
  document.getElementById("send").innerHTML = "PDF أرسل ملف ال ";
}
function changeHe() {
  document.getElementById("submit").innerHTML = "!שמור מבחן";
  document.getElementById("send").innerHTML = "PDF-שלח קובץ ה";
}
function changeEn() {
  document.getElementById("submit").innerHTML = "Save!";
  document.getElementById("send").innerHTML = "Send PDF file";
}

