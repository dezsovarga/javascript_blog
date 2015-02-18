App.Validators.LoginValidator = function LoginValidator(){



}

App.Validators.LoginValidator.prototype = new App.Validators.Validator();

App.Validators.LoginValidator.isValidLogin = function(username, password, loginFailed, loginOk){

	//users = JSON.parse(localStorage.getItem('users'));
	var valid_login = false;
	var users;
	$.getJSON('data/users.json', function(data){

		try{

			users = data.users;	
		
			for (i=0; i<users.length; i++){
				if (username == users[i].username && password == users[i].password){			
					
					localStorage.setItem("logged_in_user", username);

					loginOk();
					return true;
				}
			}
			
			loginFailed();
		}
		catch(err){

			if (err instanceof InvalidCredentialError){

				console.error(err.name +": "+ err.message);
				alert("Wrong username or password!");
			}
			else{
					
				console.error(err.stack);	
				throw err;
			}
		}		

	});

}