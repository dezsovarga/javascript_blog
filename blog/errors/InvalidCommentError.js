function InvalidCommentError(message){

	Error.apply(this, Array.prototype.slice.call(arguments,0));
	this.message = message;
	this.name = "InvalidCommentError";


}

InvalidCommentError.prototype = new Error();
InvalidCommentError.prototype.constructor = InvalidCommentError;