app.service('comment', ['$cookieStore', '$location', function($cookieStore, angularLocation){

	var service = {

		addComment: function(id){

			var comment_textarea =  document.getElementById("comment_textarea");
			var author = document.getElementById("comment_author");

			var loggedInUser = $cookieStore.get("loggedInUser");
			comment = new App.Models.Comment(loggedInUser, new Date().getTime(), author.value, comment_textarea.value);

			try{
			

				if (App.Validators.CommentValidator.isValidComment(comment) == true ){

					comment.save(id);
					angularLocation.url('/admin');

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

	}

	return service;

}]);

app.service('blogs', ['$http', function($http){
	
	var service = {


		getAllPosts: function(callback){

			if (localStorage.getItem("blogs") === null) {

				$http.get('data/blog.json').success(function(data){
					localStorage.setItem("blogs", JSON.stringify(data.blogs));
					callback(data.blogs);
				})
			} else{
				
				callback(JSON.parse(localStorage.getItem('blogs')));
			}
			
		},

		getPostById: function(id){

			var posts;

			this.getAllPosts(function(data){
				posts = data;
			});

			
			var i;

			for (i=0; i<posts.length;i++){

				if (posts[i].id == id){
					return posts[i];
				}
				
			}
			return null;
		}

	};


	return service;


}]);