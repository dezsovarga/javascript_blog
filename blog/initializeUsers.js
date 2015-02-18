function initializeUsers(){
	
	if (localStorage.getItem("users") === null) {
	
		localStorage.setItem("users", JSON.stringify(users));
	}
		
	//var retrieved_users = localStorage.getItem('users');
	
	//document.getElementById("local_Storage").innerHTML = JSON.parse(retrieved_users)[0].username;
	
	
}