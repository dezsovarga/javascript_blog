App.Validators.CommentValidator = (function CommentValidator(){

	function CommentValidator(){

	}

	CommentValidator.prototype = new App.Validators.Validator();

	CommentValidator.isValidComment = function(comment){
		
		var valid_comment = true;

		if (App.Validators.Validator.isEmpty(comment.name) ==true ){

			valid_comment = false;
		}

		if (App.Validators.Validator.isEmpty(comment.content) == true){

			valid_comment = false;
		}

		if (valid_comment == false){

			throw new InvalidCommentError("Invalid comment!");
		}


		return true;
	}

	return CommentValidator;

})();