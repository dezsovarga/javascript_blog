var light_red_color = "#FFCCCC";

function validateTextLength(text, minLength, maxLength){

	if (typeof maxLength === 'undefined'){
		maxLength = Infinity;
	}
	if (text.length < minLength || text.length > maxLength){
		return false;
	}
	

	return true;
}

function validateEmail(email){

	if (email.indexOf('@') === -1 || email.indexOf('.') === -1){
		return false;
	}

	return true;
}

function validateDate(date, minDays, maxDays){

	var today = new Date().getTime();

	var enteredDate = new Date(date).getTime();

	//alert(today + " " + enteredDate);

	if (isNaN(enteredDate) == true){
		return false;
	}

	if (today - enteredDate < 0){
		return false;
	}

	return true;


}

function validateComment(name, comment){

	name.style.backgroundColor = "white";
	comment.style.backgroundColor = "white";

	var errors = true;

	if (validateTextLength(name.value,1,20) == false ){

		name.style.backgroundColor = light_red_color;
		errors = false;
	}

	if (validateTextLength(comment.value,1) == false ){

		comment.style.backgroundColor = light_red_color;
		errors = false;
	}

	if (errors == false){
		return false;
	} 

	return true;
}

function validateAddnewPost(title, date, description){

	title.style.backgroundColor = "white";
	description.style.backgroundColor = "white";
	date.style.backgroundColor = "white";

	var errors = true;

	if (validateTextLength(title.value,10,40) == false){ 
		
		title.style.backgroundColor = light_red_color;
		errors = false;
	}	

	if (validateDate(date.value) == false){

		date.style.backgroundColor = light_red_color;
		errors = false;
	}

	if (validateTextLength(description.value,1) == false ){ 
		
		description.style.backgroundColor = light_red_color;
		errors = false;
	}	

	if (errors == false){
		return false;
	} 

	return true;


}

function validateAddNewUser(username, password, name, email){

	username.style.backgroundColor = "white";
	password.style.backgroundColor = "white";
	name.style.backgroundColor = "white";
	email.style.backgroundColor = "white";

	var errors = true;

	if (validateTextLength(username.value,3,20) == false || username.value.indexOf(" ") != -1 ){ 
		
		username.style.backgroundColor = light_red_color;
		errors = false;
	}	

	if (validateTextLength(password.value,3,20) == false || password.value.indexOf(" ") != -1 ) {

		password.style.backgroundColor = light_red_color;
		errors = false;

	}

	if (validateTextLength(name.value,1,20) == false ){
		
		name.style.backgroundColor = light_red_color;
		errors = false;
	}

	if (validateEmail(email.value) == false ){

		email.style.backgroundColor = light_red_color;
		errors = false;
	}

	if (errors == false){
		return false;
	} 

	return true;

}

function validateLogin(username, password){
	username.style.backgroundColor = "white";
	password.style.backgroundColor = "white";

	var lengthvalidation = true;

	if (validateTextLength(username.value, 3, 20) === false){

		username.style.backgroundColor = light_red_color;
		lengthvalidation = false;

	} 

	if (validateTextLength(password.value, 3, 20) === false){

		password.style.backgroundColor = light_red_color;
		lengthvalidation = false;
	}

	if (lengthvalidation == false){
		return false;
	} 

	username = username.value;
	password = password.value;

	users = JSON.parse(localStorage.getItem('users'));
			
	succsesfull_login = false;
	
	for (i=0; i<users.length; i++){
		if (username == users[i].username && password == users[i].password){
			
			succsesfull_login = true;
			localStorage.setItem("logged_in_user", username);
			
			//alert(localStorage.getItem("logged_in_user"))
			return true;
		}
	}

	if (succsesfull_login == false){

		alert("Wrong username or password!");
	}

	return false;
	
}