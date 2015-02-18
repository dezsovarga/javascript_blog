function initializeAuthor(){

	var author = document.getElementById("author");
	author.value = localStorage.getItem("logged_in_user");

}
function addNewPost(){
	
	var allow_comments, visible;
	var title = document.getElementById("post_title");
	var author = document.getElementById("author");
	var date = document.getElementById("post_date");
	var description = document.getElementById("description");
	allow_comments = document.getElementById("allow_comments_checkbox").checked;
	visible = document.getElementById("visible_checkbox").checked;

	var loggedUser = localStorage.getItem("logged_in_user");
	
	if (validateAddnewPost(title, date, description) == true){		
			
		var allPosts = getAllPosts();
		var id = allPosts[allPosts.length -1].id + 1;
		
		allPosts.push(
			{id: id, summary: title.value, description: description.value, postedBy: loggedUser, postedAt:date.value, visible: visible, allowComments: allow_comments, comments:[]}
		)
		
		localStorage.setItem("blogs", JSON.stringify(allPosts));

		alert("New post was added succsesfully!")

		window.location.replace("http://localhost:8080/admin.html");

	}	

	
}



function getAllPosts(){
	var all_blogs = localStorage.getItem('blogs');
	var blogs = JSON.parse(all_blogs);
	return blogs;	
}