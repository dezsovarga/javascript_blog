var app = angular.module("BlogApp", ['ngCookies', 'ngRoute']);

app.config(function($routeProvider){

	$routeProvider.when('/home', {
		templateUrl: 'templates/homepage_template.html',
		controller: 'homePageController'
	}).when('/article/create',{
		templateUrl: 'templates/admin_new_template.html',
		controller: 'addNewPostController'
	}).when('/article/:article_id',{
		templateUrl: 'templates/single_item_template.html',
		controller: 'postController'
	}).when('/admin',{
		templateUrl: 'templates/post_template_admin.html',
		controller: 'adminPostController'
	}).when('/admin/profile',{
		templateUrl: 'templates/admin_profile_template.html',
		controller: 'adminProfileController'
	}).otherwise('/home',{
		templateUrl: 'templates/homepage_template.html',
		controller: 'homePageController'
	});
	
})
.run(function(){

	
});