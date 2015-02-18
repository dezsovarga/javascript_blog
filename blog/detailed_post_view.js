function getRequestParameter(count){
	var param = location.search;
	return param.split("=")[count + 1];
	//alert(id);
}

function getPostIndexById(id){

	var all_posts = localStorage.getItem('blogs');
	var posts = JSON.parse(all_posts);
	var i;

	for (i=0; i<posts.length;i++){

		if (posts[i].id == id){
			return i;
		}
		
	}
	return null;
}

function getPostById(id){

	var all_posts = localStorage.getItem('blogs');
	var posts = JSON.parse(all_posts);
	var i;
	if (posts){

		for (i=0; i<posts.length;i++){

			if (posts[i].id == id){
				return posts[i];
			}
			
		}
	}
	
	return null;
}

function addNewComment(){

	var comment = document.getElementById("comment_textarea");
	var name = document.getElementById("author");
		
	if (validateComment(name, comment) == true ){

		var postId = getRequestParameter(0);
		var allPosts = JSON.parse(localStorage.getItem('blogs'));

		var thisPost = getPostById(postId);

		var commentId = thisPost.comments.length == 0 ? 1 : thisPost.comments[thisPost.comments.length -1].id + 1;
		var loggedUser = localStorage.getItem("logged_in_user");
		
		thisPost.comments.push(
			{id: commentId, postedBy: loggedUser, postedAt: new Date().getTime(), name: name.value, content:comment.value}
		);

		allPosts[getPostIndexById(postId)] = thisPost;
		localStorage.setItem("blogs", JSON.stringify(allPosts));

		window.location.replace("http://localhost:8080/single_item.html?id="+postId);

		
	}
		
}
function createEditPost(blog){

	var blogs= "", i;
	
	blogs = "<div class ='edit_post'>";
		blogs = blogs.concat("<div class='edit_post'>");

			blogs = blogs.concat("<div class='edit_element'>");

				blogs = blogs.concat("<label class='edit_element_label' for='post_title'>	Title </label> ");
				blogs = blogs.concat("<input id='post_title' class='edit_element_data' type='text' id='post_title' name='post_title' value='"+blog.summary+"'> ");
				

			blogs = blogs.concat("</div>");

			blogs = blogs.concat("<div class='edit_element'>");

				blogs = blogs.concat("<label class='edit_element_label' for='author'>	Author </label>  ");
				blogs = blogs.concat("<input id='author' type='text' id='author' disabled name='author' value='"+blog.postedBy+"'>");
				

			blogs = blogs.concat("</div>");

			blogs = blogs.concat("<div class='edit_element'>");

				blogs = blogs.concat("<label class='edit_element_label' for='post_date'>	Date </label>   ");
				blogs = blogs.concat("<input id='post_date'  value='"+ new Date(parseInt(blog.postedAt)).toLocaleDateString()+"'>");
				

			blogs = blogs.concat("</div>");

			blogs = blogs.concat("<div class='edit_element'>");

				blogs = blogs.concat("<label class='edit_element_label'>	Description </label>  ");
				blogs = blogs.concat('<textarea id="description" class="edit_element_data" rows="4" cols="50" >'+blog.description+'</textarea>');
				

			blogs = blogs.concat("</div>");

			blogs = blogs.concat("<div class='edit_element_settings'>");

				if (blog.allowComments === true){
					blogs = blogs.concat('<input id="allow_comments" type="checkbox" checked/> ');
				}
				else{
					blogs = blogs.concat('<input id="allow_comments" type="checkbox" /> ');
				}

				
				blogs = blogs.concat('<label class="edit_element_label">	Allow Comments </label>  ');
				

			blogs = blogs.concat("</div>");

			blogs = blogs.concat("<div class='edit_element_settings'>");

				if (blog.visible === true){
					blogs = blogs.concat('<input id="visible_checkbox" type="checkbox" checked/> ');
				}
				else{
					blogs = blogs.concat('<input id="visible_checkbox" type="checkbox" /> ');
				}
				
				blogs = blogs.concat('<label class="edit_element_label">	Visible </label> ');
				

			blogs = blogs.concat("</div>");

			blogs = blogs.concat("<div class='edit_element_settings'>");

				blogs = blogs.concat('<span class="left">	<button id="edit_post_button" type="button">Save</button>	<button type="button">Cancel</button> </span> ');
				blogs = blogs.concat('<span class="right">	<button id="deletePostButton_'+blog.id+'" name="delete_post_button" type="button">Delete</button>	</span>');
				

			blogs = blogs.concat("</div>");

		blogs = blogs.concat("</div>");

		blogs = blogs.concat("<br>");
		
		
		blogs = blogs.concat("<div class='comment_section'>");
			blogs = blogs.concat("<div class='comments_container'>");

			for (i=0; i<blog.comments.length; i++){

				blogs = blogs.concat("<div class='comment'>	<div class='avatar'>	<img src='avatar.jpg' />	  <button id='deleteCommentButton_"+blog.id+"_"+blog.comments[i].id+"' name='delete_comment_button' type='button'>Delete</button>  </div>"); 	 	

				blogs = blogs.concat("<div class='comment_text'> <p> " + blog.comments[i].name + ": </p> 	<p>" + blog.comments[i].content + " </p> 	</div>");
				
				blogs = blogs.concat("</div> <hr>");
			}

			blogs = blogs.concat("</div>");

			blogs = blogs.concat("<div class='write_comment'>");

			blogs = blogs.concat("<div class='comment_area'>   <p> Write Comment: </p>  	<textarea id='comment_textarea' class='comment_textarea' rows='4' cols='50'></textarea> </div>"); 

			blogs = blogs.concat("<label class='comment_area'>	Name: </label> 		<input id='comment_author' type='text' name='author'> 	<button id='send_comment_button' type='button'>Send</button>"); 

			blogs = blogs.concat("</div>");

		blogs = blogs.concat("</div>");

	blogs = blogs.concat("</div>");

	blogs = blogs.concat('<div id="confirm_delete_dialog">');
	blogs = blogs.concat("</div>");
	
	return blogs;

}


function createDetailedPost(blog){
	
	var blogs= "", i;
	 
	
	blogs = "<div class ='post'>";
		blogs = blogs.concat("<h2><a href='single_item.html?id="+blog.id+"'>"+blog.summary+"</a></h2>");
		blogs = blogs.concat("<p>	Date: "+ new Date(blog.postedAt).toLocaleDateString("en-US") + " </p>");
		blogs = blogs.concat("<p>	Author: "+blog.postedBy+"</p>");
		blogs = blogs.concat("<p>" + blog.description+ "</p>");
		blogs = blogs.concat("<p hidden>" + blog.id+ "</p>");
	//	blogs = blogs.concat("<a class='right' href='single_item.html?id="+blog.id+"'>View more</a>");
		
		blogs = blogs.concat("<br>");
		
		blogs = blogs.concat("<div class='comment_section'>");
			blogs = blogs.concat("<div class='comments_container'>");

			for (i=0; i<blog.comments.length; i++){

				blogs = blogs.concat("<div class='comment'>	<div class='avatar'>	<img src='avatar.jpg' />	</div>"); 	 	

					blogs = blogs.concat("<div> ");

						blogs = blogs.concat("<div class='comment_header'>"); 

							blogs = blogs.concat("<div class='left'> <p > " + blog.comments[i].name + ": </p> </div>"); 

							blogs = blogs.concat("<div class='right'> <p > " + new Date(parseInt(blog.comments[i].postedAt)).toLocaleDateString() + " </p> </div>"); 

						blogs = blogs.concat("</div>");

						blogs = blogs.concat("<br>");
						blogs = blogs.concat("<div class='comment_body'> <p>" + blog.comments[i].content + " </p> 	</div>");	
						
				
					blogs = blogs.concat("</div>");
				
				blogs = blogs.concat("</div> <hr>");
			}

			blogs = blogs.concat("</div>");

			if (blog.allowComments){

				blogs = blogs.concat("<div class='write_comment'>");

				blogs = blogs.concat("<div class='comment_area'>   <p> Write Comment: </p>  	<textarea id='comment_textarea' class='comment_textarea' rows='4' cols='50'></textarea> </div>"); 

				blogs = blogs.concat("<label class='comment_area'>	Name: </label> 		<input id='comment_author' type='text' name='author'> 	<button id='send_comment_button' type='button'>Send</button>"); 

				blogs = blogs.concat("</div>");
			}

			

		blogs = blogs.concat("</div>");

	blogs = blogs.concat("</div>");
	
	
	return blogs;
	
}

function showEditPost(){

	var id = getRequestParameter(0);
	
	var all_blogs = localStorage.getItem('blogs');
	var blogs = JSON.parse(all_blogs);
	//alert(createDetailedPost(blogs[0]));

	if (getPostById(id)){
		document.getElementById("post_container").innerHTML = createEditPost(getPostById(id));
	}
	
	$("#post_date").datepicker();
}

function showDetailedPost(){

	var id = getRequestParameter(0);
	
	var all_blogs = localStorage.getItem('blogs');
	var blogs = JSON.parse(all_blogs);

	// var post = new App.Models.Entity().getPostById(id) 
	// post.postedAt = new Date(parseInt(post.postedAt)).toLocaleDateString();

	// var container = $("#post_container");

	// TemplateModule.render("detailed_post_template.html", post , function(blogHtml) {

	// 	container.append(blogHtml);
	// 	addedBlogs += 1;

	// 	/*if (addedBlogs === blogs.length - 1) {
	// 		completeCallback();
	// 	}*/
	// });
	if (getPostById(id)){
		document.getElementById("post_container").innerHTML = createDetailedPost(getPostById(id));
	}
}

