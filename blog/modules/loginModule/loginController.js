app.controller('loginController',['$rootScope', '$scope', 'loginService', '$cookieStore', '$location',

		function ($rootScope, $scope, loginService, $cookieStore, $location){

			//debugger;
			$scope.isLoggedIn = $cookieStore.get("isLoggedIn");
			$scope.loggedInUser = $cookieStore.get("loggedInUser");

			$scope.doLogin = function(){

				loginService.login($scope.username, $scope.password, function(status){

					$scope.isLoggedIn = status;
					$scope.loggedInUser = $scope.username;
					$cookieStore.put("loggedInUser", $scope.loggedInUser);
					$cookieStore.put("isLoggedIn", $scope.isLoggedIn);
					$location.url("/admin");
					return;
					
				})
			}

			$scope.doLogout = function(){

				$scope.isLoggedIn = false;
				
				$cookieStore.remove("isLoggedIn");
				$cookieStore.remove("loggedInUser");
				$location.url("/home");
				return;
			}

		}
]);

app.service('loginService', ['$http', function($http){
	
	var service = {

		isValidLogin: function(username, password, users){


			for (i=0; i<users.length; i++){
				if (username == users[i].username && password == users[i].password){			
					
					localStorage.setItem("logged_in_user", username);
					
					return true;
				}
			}

			return false;
		},

		login: function(username, password, callback){

			if (localStorage.getItem("users") === null) {

				$http.get('data/users.json').success(function(data){
					
					callback(this.isValidLogin(username, password, data.users));
				})
			}
			else{
				
				var users = JSON.parse(localStorage.getItem('users'));
				
				callback(this.isValidLogin(username, password, users));
			}			
		}
	}

	return service

}]);