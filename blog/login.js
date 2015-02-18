function login(){
	var succsesfull_login, i, userList, username = "", password = "";
	
	var username = document.getElementById("username");
	var password = document.getElementById("password");
	
	
	if (validateLogin(username, password) == false){

		//alert("Wrong username or password!");
		return false;
	}
	return true;
	
}

function logout(){
	localStorage.removeItem("logged_in_user");
	window.location.replace("http://localhost:8080/homepage.html");	
}

/*function initializeAuthentication(){

	var auth = document.getElementById("authentication");

	if (localStorage.getItem("logged_in_user") === null) {	

		
		var loginForm = "  <form  action='admin.html' onsubmit='return false'> "

		loginForm = loginForm.concat(" <input type='text' name='username' id='username' placeholder='Username' onload='updateLoginButton()'' onkeyup='updateLoginButton()'' value=''> ");
		loginForm = loginForm.concat(" <input type='password' name='password' id='password' placeholder='Password' onchange='updateLoginButton()'' onkeyup='updateLoginButton()'' value=''> ");
		loginForm = loginForm.concat(" <input id='login_button' type='submit' value='Login' disabled> ");
		
		loginForm = loginForm.concat(" </form> ");
		
	}
	else{

		var loginForm = " Welcome "
		loginForm = loginForm.concat(" <span class='user'>  <a id ='logged_in_user' href='admin_profile.html'></a> 	</span>  <a id='logoutButton' href='#'>Logout</a>" );
		
	}

	document.getElementById("authentication").innerHTML = loginForm;
	
}*/

function updateLoggedInUserName(){
	
	if (localStorage.getItem("logged_in_user") != null) {	

		document.getElementById("logged_in_user").innerText = localStorage.getItem("logged_in_user")
	}
	
}

function updateLoginButton(){

	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var login_button = document.getElementById("login_button");

	if (validateTextLength(username, 1, 20) == true && validateTextLength(password, 1, 20) == true){
		login_button.disabled = false;
	}
	else {
		login_button.disabled = true;
	}
}