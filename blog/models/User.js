App.Models.User = (function(){

	function User(username, password, name, email, role){

		this.username = username;
		this.password = password;
		this.namee = name;
		this.email = email;
		this.role = role;

	
	}

	User.prototype.setProperties = function(username, password, name, email, role){

			this.username = username;
			this.password = password;
			this.namee = name;
			this.email = email;
			this.role = role;
		}

	User.prototype.logIn = function(username, password){

		//var loginValidator = new App.Validators.LoginValidator(); 
		
		App.Validators.LoginValidator.isValidLogin(
			username, 
			password, 
			function(){

				throw new InvalidCredentialError("Invalid credentials!");
			}, 
			function(){
				window.location.replace("http://localhost:8080/admin.html");	
			}

		);
		
	}

	User.prototype.logOut = function (){

		logout();
	}

	return User;

})();

