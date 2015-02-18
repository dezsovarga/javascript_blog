showDetailedPost();
initializeAuthentication();
updateLoggedInUserName();


window.onload = function() {

	new UserController().attachEvents();
	new App.Controllers.CommentController().attachEvents();
	new UserController().attachEvents();
}