initializeUsers();

//updateLoginButton();
//new UserController().attachEvents();
/*populateBlogs(function(){
	
	new UserController().attachEvents();
});*/
window.onload = function() {

	 new App.Controllers.PostController().attachEvents();
	 new App.Controllers.CommentController().attachEvents();
	
}




