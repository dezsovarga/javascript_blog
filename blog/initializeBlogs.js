function initializeBlogs(callback){
	
	if (localStorage.getItem("blogs") === null) {
	
		
		$.getJSON('data/blog.json', function(data){

			blog = data.blogs;	

			localStorage.setItem("blogs", JSON.stringify(blog));

			localStorage.setItem("post_count", data.blogs.length);

			if (callback){
				callback(data);
			}					
		});

	}
	else{
		if (callback){
			
			var blogs = JSON.parse(localStorage.getItem('blogs'));
			callback(blogs);
		}	
	}
	//var retrieved_users = localStorage.getItem('users');
	
	//document.getElementById("local_Storage").innerHTML = JSON.parse(retrieved_users)[0].username;	
	
}

function updatePosts(){

	if (localStorage.getItem("blogs") === null) {
	
		
		$.getJSON('data/blog.json', function(data){

			blog = data.blogs;	

			localStorage.setItem("blogs", JSON.stringify(blog));
				
		});

	}

}


function createBlog(blog){
	var blogs= "";
	var date = new Date(parseInt( blog.postedAt)).toLocaleDateString("en-US");
	//debugger;
		
	blogs = "<div class ='post'>";
	blogs = blogs.concat("<h2><a href='single_item.html?id="+blog.id+"'>"+blog.summary+"</a></h2>");
	blogs = blogs.concat("<p>	Date:"+ date + "</p>");
	blogs = blogs.concat("<p>	Author: "+blog.postedBy+"</p>");
	blogs = blogs.concat("<p>" + blog.description+ "</p>");
	blogs = blogs.concat("<p hidden>" + blog.id+ "</p>");

	if (localStorage.getItem("logged_in_user") != null) {

		blogs = blogs.concat(" <div class='right'> 	 <a href='admin_edit.html?id="+blog.id+"'><button type='button'>Edit</button></a> 	<button name='delete_post_button' id='deletePostButton_"+blog.id + "' type='button'>Delete</button>	</div> ");
	}
	else{

		blogs = blogs.concat("<a class='right' href='single_item.html?id="+blog.id+"'>View more</a>");
	}
	
	
	blogs = blogs.concat("<br>");
	blogs = blogs.concat("<br>");
	blogs = blogs.concat("<div> <hr> </div>");
	blogs = blogs.concat("</div>");
	
	return blogs;
}

// function populateBlogs(){
	
// 	//debugger;
// 	initializeBlogs(function(){

// 		var all_blogs = localStorage.getItem('blogs');
// 		var blogs = JSON.parse(all_blogs);
// 		var i, allBlogString="";
// 		for (i=0; i < blogs.length; i++){

// 			if (blogs[i].visible == true || localStorage.getItem("logged_in_user") != null ){
			
// 				allBlogString = allBlogString.concat(createBlog(blogs[i]));
// 			}
			
// 		}
	
// 		document.getElementById("post_container").innerHTML = allBlogString;
// 	});

// 	//debugger;
	
// 	//alert(blogs[0].summary)
	
// 	//document.getElementById("post_container").innerHTML = createBlogList();
	
// }

function populateBlogs(completeCallback){
	
	
	initializeBlogs(function(){

		var all_blogs = localStorage.getItem('blogs');
		var blogs = JSON.parse(all_blogs);
		var i, allBlogString="", addedBlogs = 0;
		var container = $("#post_container");
		var templateFile;

		if (localStorage.getItem("logged_in_user") === null) {
			templateFile = 'post_template_old.html';
		}
		else{
			templateFile = 'admin_template_old.html';	
		}
		
		for (i=0; i < blogs.length; i++) {

			if (blogs[i].visible == true || localStorage.getItem("logged_in_user") != null ){

				blogs[i].postedAt = new Date(parseInt(blogs[i].postedAt)).toLocaleDateString();
				(function(i) {
					
						TemplateModule.render(templateFile, blogs[i], function(blogHtml) {
							container.append(blogHtml);
							addedBlogs += 1;

							if (addedBlogs === blogs.length) {

								//alert("post len: " + blogs.length + " " + addedBlogs);
								completeCallback();
							}
						});
					
				}(i));
			}
			
		}

	});
	

}