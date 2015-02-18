function UserController(){


	this.username = document.getElementById("username");
	this.password = document.getElementById("password");	

	this.user = new App.Models.User();

}

UserController.prototype.doLogin = function(){

	this.user.setProperties(username.value, password.value);

	try{

		this.user.logIn(username.value, password.value)
		
		window.location.replace("http://localhost:8080/admin.html");

	}
	catch(err){

		console.log(err);
		alert("Wrong username or password!");

	}
	
	/*if (this.user.logIn(this.username, this.password) === true){

		window.location.replace("http://localhost:8080/admin.html");
	}*/

}

UserController.prototype.doLogout = function(){

	this.user.logOut();
}

UserController.prototype.attachEvents = function(){

	var that = this;

	var loginBtn = document.getElementById("login_button");

	loginBtn.addEventListener("click", function(e) {
		that.doLogin();
		
	});
}

