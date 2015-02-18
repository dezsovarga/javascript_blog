App.Models.Entity = (function(){

	function Entity(){

	
	}

	Entity.prototype.delete = function(){

	}

	Entity.prototype.update = function(){

	}

	Entity.prototype.savePosts = function(posts){

		localStorage.setItem("blogs", JSON.stringify(posts));
		
	}

	Entity.prototype.deletePostById = function(id){

		var posts = this.getAllPosts();

		var i;

		for (i=0; i<posts.length;i++){

			if (posts[i].id == id){
				posts.splice(i, 1);
			}
			
		}
		return posts;		
	}

	Entity.prototype.editPostById = function(id, post){

		var posts = this.getAllPosts();

		var i;

		for (i=0; i<posts.length;i++){

			if (posts[i].id == id){
				posts[i] = post;
			}
			
		}
		return posts;		
	}

	Entity.prototype.getAllPosts = function(){

		return JSON.parse(localStorage.getItem('blogs'));
	}


	Entity.prototype.getPostIndexById = function (id){

		var posts = this.getAllPosts();

		var i;

		for (i=0; i<posts.length;i++){

			if (posts[i].id == id){
				return i;
			}
			
		}
		return null;
	}

	Entity.prototype.getPostById = function (id){

		var posts = this.getAllPosts();
		var i;

		for (i=0; i<posts.length;i++){

			if (posts[i].id == id){
				return posts[i];
			}
			
		}
		return null;
	}

	return Entity;

})();
