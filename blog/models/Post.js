App.Models.Post = (function() {

	function Post(summary, description, postedBy, postedAt, visible, allowComments, comments ){

		this.summary = summary;
		this.description = description;
		this.postedBy = postedBy;
		this.postedAt = postedAt;
		this.visible = visible;
		this.allowComments = allowComments;
		this.comments = comments;		

	}

	Post.prototype = new App.Models.Entity();
	
	Post.prototype.delete = function(){

		var posts = this.deletePostById(this.id);
		this.savePosts(posts);


	}

	Post.prototype.update = function(){

		var posts = this.editPostById(this.id, this);

		this.savePosts(posts);
	}

	Post.prototype.save = function(){

		var allPosts = this.getAllPosts();

		var id = allPosts[allPosts.length -1].id + 1;

		
		allPosts.push(
			{id: id, summary: this.summary, description: this.description, postedBy: this.postedBy, postedAt:this.postedAt.getTime(), visible: this.visible, allowComments: this.allowComments, comments:this.comments }
		)
		
		this.savePosts(allPosts);
		
		
		
	}

	Post.prototype.getComments = function(){

	}

	Post.prototype.getAuthor = function(){

	}

	


	return Post;

})();





