//initializeAuthentication();
updateLoggedInUserName();
showEditPost();

window.onload = function() {

	 new App.Controllers.PostController().attachEvents();
	 new App.Controllers.CommentController().attachEvents();
	 new UserController().attachEvents();
}
