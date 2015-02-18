App.Validators.PostValidator = function PostValidator(){

	
}

App.Validators.PostValidator.prototype = new App.Validators.Validator();

App.Validators.PostValidator.isValidPost = function (postObj){
	$("#post_title").css('background-color', 'white');
	$("#description").css('background-color', 'white');
	$("#post_date").css('background-color', 'white');

	if (App.Validators.Validator.isBetween(postObj.summary, 10, 40) == false){

		$("#post_title").css('background-color', light_red_color);
		throw new InvalidBlogPostError("Invalid post summary");

	}

	if (App.Validators.Validator.isEmpty(postObj.description) == true ){

		$("#description").css('background-color', light_red_color);
		throw new InvalidBlogPostError("Invalid post description");
	}

	if (App.Validators.Validator.isBetween(postObj.postedAt, new Date("02/04/2015") , new Date() ) == false ){

		$("#post_date").css('background-color', light_red_color);
		throw new InvalidBlogPostError("Invalid post date");
	}

	return true;

} 