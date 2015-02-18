app.controller('postController', ['$scope', 'blogs', 'comment', '$routeParams', '$location',  function ($scope, blogs, comment, locationParams, angularLocation) {

	$scope.showData = function(data){

		console.log("blog posts: " +data);
		$scope.blogPosts = data;
	} 	

	$scope.blog = blogs.getPostById(locationParams.article_id);	

	if (!$scope.blog) {
		angularLocation.url('/home');
		return;
		
	}	

	$scope.addComment = function(){

		comment.addComment(locationParams.article_id);
		
	}	
}
]);

app.controller('editPostController', [
	'$scope', 
	'blogs', 
	'$routeParams', 
	'$location', 
	'$cookieStore', 
	'$filter', function ($scope, blogs, locationParams, angularLocation, $cookieStore, $filter) {

	if ( !$cookieStore.get("isLoggedIn") ){
		angularLocation.url('/home');
		return;
	}
					
}
]);

app.controller('adminProfileController', [
	'$scope', 
	'blogs', 
	'$routeParams', 
	'$location', 
	'$cookieStore', 
	'$filter', function ($scope, blogs, locationParams, angularLocation, $cookieStore, $filter) {

	if ( !$cookieStore.get("isLoggedIn") ){
		angularLocation.url('/home');
		return;
	}
					
}
]);

app.controller('adminPostController', [
	'$scope', 
	'blogs', 
	'$routeParams', 
	'$location', 
	'$cookieStore', 
	'$filter', function ($scope, blogs, locationParams, angularLocation, $cookieStore, $filter) {

	if ( !$cookieStore.get("isLoggedIn") ){
		angularLocation.url('/home');
		return;
	}
	
	blogs.getAllPosts(function(data){
		
		$scope.blogPosts = data;
		$scope.filteredBlogs = $filter("orderBy")($scope.blogPosts, "postedAt", false);
	});

	console.log("admin posts: "+ $scope.filteredBlogs);
				
}
]);


app.controller('addNewPostController', ['$scope', 'blogs', '$routeParams', '$location', '$cookieStore', function ($scope, blogs, locationParams, angularLocation, $cookieStore) {
	
	if ( !$cookieStore.get("isLoggedIn") ){
		angularLocation.url('/home');
		return;
	}

	$scope.formModel = {
		"title": "",
		"titleMin": 20,
		"descriptionMin": 400,
		"description": "",
		"date": "",
		"allowComments": "",
		"visible": ""
	};

	$scope.savePost = function(){

		alert("TODO: implement save");

	}

	$scope.cancel = function(){

		angularLocation.url('/admin');
		return;

	}
				
}
]);

app.directive("commentDirective", function(){

	return {
		restrict: "A",
		scope: {
			comment: "=" 
		},
	
		templateUrl: "templates/comment_template.html"	
	};
});

app.directive("postDirective", function(){

	return {
		"restrict": "A",
		"scope": {
			blog: "=",
			fullBlog: "=" 
		},

	
		"templateUrl": "templates/post_template.html",
		
		controller: function(){
			this.filterBlogItem = function(blog, isFull){
				if (isFull === "false"){
					blog.description = blog.description.substr(0,255);
				}
			}
		},

		"link": function (scope, elem, attributes, controller){

			controller.filterBlogItem(scope.blog, scope.fullBlog);
		} 	
	};
});

