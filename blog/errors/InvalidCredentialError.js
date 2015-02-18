function InvalidCredentialError(message){

	Error.apply(this, Array.prototype.slice.call(arguments,0));
	this.message = message;
	this.name = "InvalidCredentialError";


}

InvalidCredentialError.prototype = new Error();
InvalidCredentialError.prototype.constructor = InvalidCredentialError;