App.Controllers.CommentController = (function(){

	var comment_textarea;
	var author;
	var loggedUser = localStorage.getItem("logged_in_user");
	var comment;


	function CommentController(){
		
	
	}

	CommentController.prototype.doAddComment = function(){

		var comment_textarea =  document.getElementById("comment_textarea");
		var author = document.getElementById("comment_author");
		comment = new App.Models.Comment(loggedUser, new Date().getTime(), author.value, comment_textarea.value);

		try{			

			if (App.Validators.CommentValidator.isValidComment(comment) == true ){

				comment.save();
				window.location.replace("http://localhost:8080/single_item.html?id="+getRequestParameter(0));

			}	
		}
		catch(err){

			if (err instanceof InvalidCommentError){

				console.error(err.name + ": " + err.message + " " + err.stack);
		  		alert("Invalid commentttt!");
			}
			else {
				
				console.error(err.stack);	
				throw err;
			}
		  	
		}
		

	}

	CommentController.prototype.attachEvents = function(){

		var that = this;

		var addNewComment = document.getElementById("send_comment_button");

		if (addNewComment){
			addNewComment.addEventListener("click", function() {
				that.doAddComment();
			});	
		}
		
		//attach event to delete buttons
		// var deleteCommentButtons = document.getElementsByName("delete_comment_button");
		// var i;

		// for (i=0; i< deletePostButtons.length; i++){

		// 	deletePostButtons[i].addEventListener("click", function() {

		// 		var id = this.getAttribute("id");
				
		// 		that.doDeletePost(id.split("_")[1]);
		// 	});

			
		// }
	}

	return CommentController;

})();
