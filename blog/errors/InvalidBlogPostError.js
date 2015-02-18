function InvalidBlogPostError(message){

	Error.apply(this, Array.prototype.slice.call(arguments,0));
	this.message = message;
	this.name = "InvalidBlogPostError";


}

InvalidBlogPostError.prototype = new Error();
InvalidBlogPostError.prototype.constructor = InvalidBlogPostError;