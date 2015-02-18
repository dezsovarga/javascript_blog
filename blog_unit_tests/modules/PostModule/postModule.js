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
	$scope.blog = blogs.getPostById(locationParams.article_id);	
	var blog = $scope.blog;

	if (!$scope.blog) {
		angularLocation.url('/home');
		return;
		
	}	

	//$("#post_date").datepicker();

	$scope.formModel = {
		"title": blog.summary,
		"postedBy": blog.postedBy,
		"titleMin": 20,
		"descriptionMin": 400,
		"description": blog.description,
		"date": $filter("date")(blog.postedAt),
		"allowComments": blog.allowComments,
		"visible": blog.visible
	};
	$scope.events = {};

	$scope.events.savePost = function(){
		var id = locationParams.article_id;
		blog.summary = $scope.formModel.title;
		blog.postedBy = $scope.formModel.postedBy;
		blog.description = $scope.formModel.description;
		blog.postedAt = new Date($scope.formModel.date).getTime();
		blog.allowComments = $scope.formModel.allowComments;
		blog.visible= $scope.formModel.visible;
		
		blogs.editPostById(id, blog);
		angularLocation.url('/admin');
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
		$scope.filteredBlogs = $filter("orderBy")($scope.blogPosts, "postedAt", true);
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


app.directive('datepicker', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
            $(function(){
                $(element).datepicker({
                    dateFormat:'MM dd, yy',
                    onSelect:function (date) {
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(date);
                        });
                    }
                });
            });
        }
    }
});
