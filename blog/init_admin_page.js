updateLoggedInUserName();
populateBlogs(function() {

	 new App.Controllers.PostController().attachEvents();
	 new UserController().attachEvents();
});