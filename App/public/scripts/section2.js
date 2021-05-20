(function(){//firebase init 
	var db = firebase.firestore();
	var exam_second_question = db.collection("exam-second-question");
	var size_flush=null;
	var user_name = db.collection("students");
   
   loadQuestions();  //loading the questions from database
	   function loadQuestions(){
		 myQuestions = [];
		 exam_second_question.get().then(function(querySnapshot) {
		   
		   querySnapshot.forEach((doc) => {
			 var document = doc.data();
			 myQuestions.push(  {
			   question: document.question,
			   addAnswer: document.addAnswer});
			 })
		   }).then(function(){buildQuiz()});
		 }
   
   function saveExam(myQuestions, exam_second_question) {   //save the eaxm to the database
	exam_second_question.get().then((querySnapshot) => {
	   size_flush=querySnapshot.size;
	})
   for(let i =0 ; i< size_flush ; i++){
	exam_second_question.doc("question"+i).delete().then(function() {
	 // continue;
   }).catch(function(error) {
	 //  continue;
	 console.log(error);
   });
   }
	myQuestions.forEach(
	 (currentQuestion, questionNumber) => {
		exam_second_question.doc("question"+questionNumber).set( {
			question: currentQuestion.question,
			addAnswer: currentQuestion.addAnswer});
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
		  }
		}
   
   
		$("#admin-form-cancel-btn").click(function(){
			$("#admin-ques-form").hide()});
		
			

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
   
	   function addQuestion(myQuestions,question,addAnswer){   

		   if(question=="" && addAnswer != true){
			   alert("שאלה לא תקינה");}
		   else{
		   myQuestions.push( {
			   question: question,
			   addAnswer: addAnswer});
		   //before bulding the quiz i have to use swich case to check if the answer iis empty or not so i can know if i choose the right answer
   
	   buildQuiz();}}
   //this function for adding question and answers
	   
   //this function for deleting question and answers
	   function deleteQuestion(myQuestions,questionNumber){
   
		   if (isNaN(questionNumber) || questionNumber < 0 || questionNumber > myQuestions.length) {
			   alert("נא להוסיף מספר תקין");
		   }else{
		   myQuestions.splice(questionNumber,1);
		   buildQuiz();}
	   }
	   
   //this function for deleting question and answers
   //this function for editing question and answers
	   function editQuestion(myQuestions,questionNumber,question,addAnswer){
		   if(question=="" && addAnswer != true){
			alert("שאלה לא תקינה");}
		   else{
		   deleteQuestion(myQuestions,questionNumber);
		   myQuestions.splice(questionNumber,0,{
			question: question,
			addAnswer: addAnswer});
		   buildQuiz();}}
   //this function for editing question and answers
   
   
	 function buildQuiz(){
	   const output = [];
   
	   myQuestions.forEach(
		 (currentQuestion, questionNumber) => {
   
		   
		   const answers = [];
		   if(currentQuestion.addAnswer == true ){
			//this print what inside the answer letter
			 answers.push(
				 //<input id="textbox" type="text" name="question1">
			   `<input type="text"  name="question${questionNumber}">`
			   );}
			   


		   if (currentQuestion.question!== null && currentQuestion.question !== '') {  
		   
		   output.push(
			`<label> ${questionNumber}: رقم السؤال </label>
			<div class="question"> ( ${currentQuestion.question} </div>
			 <div class="answers"> ${answers.join('')} </div>`
		   );} 
		   else{
			output.push(
				`<div class="answers"> ${answers.join('')} </div>`
			  );

		   }
		 }
	   );
   
	   
	   quizContainer.innerHTML = output.join('');
	   printinfo();
	 }


   
	 const quizContainer = document.getElementById('quiz');
	 const saveExamBtn = document.getElementById('admin-save-exam-btn');
	 const submitAddQuestion = document.getElementById('submit-form-add-ques-btn');
	 const submitDeleteQuestion = document.getElementById('submit-form-del-ques-btn');
	 const submitEditQuestion = document.getElementById('submit-form-edit-ques-btn');
	 const adminSubmitButton = document.getElementById('admin-form-ques-btn');
	 var  myQuestions = [] ;
	
	 var curr_user = getCookie("curr_user");
	 window.onload = checkAdmin(curr_user);
   
	
	 submitAddQuestion.addEventListener('click', function() {addQuestion(myQuestions,
																		 document.getElementById("add-ques2-input").value,
																		 document.getElementById("add-answer-add").checked);});
	 submitDeleteQuestion.addEventListener('click',function(){deleteQuestion(myQuestions,document.getElementById("del-ques2-num-input").value);});
	 submitEditQuestion.addEventListener('click', function() {editQuestion(myQuestions,
																					   document.getElementById("edit-ques2-num-input").value,
																					   document.getElementById("edit-ques2-input").value,
																					   document.getElementById("add-answer-edit").checked);});
	 saveExamBtn.addEventListener('click',function(){saveExam(myQuestions, exam_second_question);});
   })();



   function upload() {
	//get your select image
	var image=document.getElementById("file").files[0];
	//now get your image name
	var imageName=image.name;
	let t=get_mail();
  	if(t!=-1)
  	{
    imageName="2"+"."+t;
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
  
  