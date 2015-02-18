function UserController(){


	this.username = document.getElementById("username");
	this.password = document.getElementById("password");	

	this.user = new App.Models.User();

}

UserController.prototype.doLogin = function(){

	this.user.setProperties(username.value, password.value);

	//try{

		this.user.logIn(username.value, password.value)
		
		

	// }
	// catch(err){

	// 	if (err instanceof InvalidCredentialError){

	// 		console.error(err.name +": "+ err.message);
	// 		alert("Wrong username or password!");
	// 	}
	// 	else{
				
	// 		console.error(err.stack);	
	// 		throw err;
	// 	}
	// }
	
	/*if (this.user.logIn(this.username, this.password) === true){

		window.location.replace("http://localhost:8080/admin.html");
	}*/

}

UserController.prototype.doLogout = function(){

	this.user.logOut();
}

UserController.prototype.attachEvents = function(){

	var that = this;

	/*var loginBtn = document.getElementById("login_button");

	
	if (loginBtn != null){

		loginBtn.addEventListener("click", function(e) {

			that.doLogin();
		
		});
	}*/

	var logoutButton = $("#logoutButton");

	if (logoutButton != null){

		logoutButton.click(function() {
				
			that.doLogout();
		});
	}

	var admin_profile_cancel_button = $("#admin_profile_cancel_button");

	if (admin_profile_cancel_button != null){

		admin_profile_cancel_button.click(function() {
				
			window.location.replace("http://localhost:8080/admin.html");
		});
	}

	
}

