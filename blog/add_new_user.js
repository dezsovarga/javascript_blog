function addNewUser(){
	var username = document.getElementById("username");
	var password = document.getElementById("password");
	var name = document.getElementById("name");
	var email = document.getElementById("email");
	
	if (validateAddNewUser(username, password, name, email) == true ){

		var allUsers = localStorage.getItem('users');
		allUsers = JSON.parse(allUsers);
		allUsers.push(
			{username: username.value, password: password.value, name: name.value, email: email.value}
		);
		
		localStorage.setItem("users", JSON.stringify(allUsers));
		
		alert("New user added succsesfully!");
		window.location.replace("http://localhost:8080/#admin");
	}
		
}
