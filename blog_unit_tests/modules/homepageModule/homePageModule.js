// var homePageModule = angular.module("homePageModule", []);

app.controller('homePageController', ['$scope', 'blogs', '$filter', function ($scope, blogs, $filter){


	$scope.showData = function(data){

		//console.log("blogs: "+ data);
		$scope.blogPosts = data;
		$scope.filteredBlogs = $filter("orderBy")($scope.blogPosts, "postedAt", true);
	} 

	blogs.getAllPosts($scope.showData);
}]);

