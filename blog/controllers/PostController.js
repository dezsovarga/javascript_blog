App.Controllers.PostController = (function(){

	function PostController(){
	
		
		this.loggedUser = localStorage.getItem("logged_in_user");


	}

	PostController.prototype.getRequestParameter = function(count){

		var param = location.search;
		return param.split("=")[count + 1];

	}
	
	PostController.prototype.doDeletePost = function(id){

		
		$("#confirm_delete_dialog" ).dialog({
			title: "Are you sure you want to delete?",
		    resizable: false,
		    height:140,
		    modal: true,
		    buttons: {
		    	"Delete": function() {		
		    		$( this ).dialog( "close" );        	

		        	var post = new App.Models.Post();
					
					post.id = id;

					post.delete();
					
					window.location.href= "http://localhost:8080/#/admin";
										
		        },
		        Cancel: function() {
		        	$( this ).dialog( "close" );
		        }
		    }
		});

		

	}

	PostController.prototype.doEditPost = function(id){

		var postElement = new App.Models.Entity().getPostById(id);
		var post = new App.Models.Post(postElement.summary, postElement.description, postElement.postedBy, postElement.postedAt, postElement.visible, postElement.allowComments, postElement.comments);
		
		post.id = id;

		var title = $("#post_title");
		var description = $("#description");
		var author = $("#author");
		var date = $("#post_date");
		var visible = $("#visible_checkbox");
		var allow_comments = $("#allow_comments");

		post.summary = title.val();
		post.description = description.val();
		post.postedBy = author.val();
		post.postedAt = new Date(date.val());
		post.visible = visible.prop("checked");
		post.allowComments = allow_comments.prop("checked");

		post.id = id;

		try{

			if (App.Validators.PostValidator.isValidPost(post) == true){
				post.postedAt = new Date(date.val()).getTime();
				post.update();
				window.location.replace("http://localhost:8080/#/admin");
			}

		}
		catch(err){

			if (err instanceof InvalidBlogPostError){

				console.error(err.name + ": "+ err.message + " " + err.stack);
				
			}
			else{
					
				console.error(err.stack);	
				throw err;
			}
		}	

	}	

	PostController.prototype.doAddPost = function(){
		
		var title = $("#post_title");
		var description = $("#description");
		var author = $("#author");
		var date = $("#post_date");
		var visible = $("#visible_checkbox").prop("checked");
		var allow_comments = $("#allow_comments").prop("checked");
		
		this.post = new App.Models.Post(title.val(), description.val(), author.val(), new Date(date.val()), visible, allow_comments, []);

		try{
			

			if (App.Validators.PostValidator.isValidPost(this.post) == true){

				this.post.save();

				$("#post_dialog").dialog({
				    title: "New post was added sucessfully",
				    resizable: false,
				    height: 160,
				    modal: true,
				    buttons: {
				        "Ok" : function () {
				            $(this).dialog("close");
				            window.location.replace("http://localhost:8080/admin.html");
				        }
				    }
				});

			}
			
		}

		catch(err){

			if (err instanceof InvalidBlogPostError){

				console.error(err.name + ": "+ err.message + " " + err.stack);
				
			}
			else{
					
				console.error(err.stack);	
				throw err;
			}
		}
				
	}

	PostController.prototype.attachEvents = function(){

		$("button").button();	
		var that = this;

		//attach event to addNewButton
		var addNewButton = $("#add_new_post");

		if (addNewButton != null){

			addNewButton.button().click(function() {
				
				that.doAddPost();
			});

		}


		//attach event to delete buttons
		var deletePostButtons = document.getElementsByName("delete_post_button");
		var i;

		//debugger;

		for (i=0; i< deletePostButtons.length; i++){

			deletePostButtons[i].addEventListener("click", function() {

				var id = this.getAttribute("id");
				
				that.doDeletePost(id.split("_")[1]);
			});

			
		}

		
		//attach event to edit_post_button
		var editPostButton = $("#edit_post_button");

		if (editPostButton != null){

			editPostButton.button().click(function() {
				
				that.doEditPost(that.getRequestParameter(0));
			});

		}		

	}

	return PostController;

})();

	