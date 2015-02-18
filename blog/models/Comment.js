App.Models.Comment = (function(){
	

	function Comment(postedBy, postedAt, name, content){

		this.postedBy = postedBy;
		this.postedAt = postedAt;
		this.name = name;
		this.content = content;		

	}

	Comment.prototype = new App.Models.Entity();

	Comment.prototype.delete = function(){

	}

	Comment.prototype.update = function(data){

	}

	Comment.prototype.save = function(id){

		var postId = getRequestParameter(0) ? getRequestParameter(0) : id;

		var allPosts = this.getAllPosts();

		var thisPost = this.getPostById(postId);

		var commentId = thisPost.comments.length == 0 ? 1 : thisPost.comments[thisPost.comments.length -1].id + 1;
		
		var loggedUser = localStorage.getItem("logged_in_user");
		
		thisPost.comments.push(
			{id: commentId, postedBy: loggedUser, postedAt: new Date().getTime(), name: this.name, content:this.content}
		);

		
		allPosts[this.getPostIndexById(postId)] = thisPost;
		
		this.savePosts(allPosts);
			
		
	}

	Comment.prototype.getAuthor = function(){

	}

	return Comment;

})();
