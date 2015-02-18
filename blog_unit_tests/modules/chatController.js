app.controller('chatController', ['$scope', 'blogs', 'comment', '$routeParams', '$location', '$cookieStore', 
	function ($scope, blogs, comment, locationParams, angularLocation, $cookieStore) {


	$scope.messages = [];
    $scope.sendMessage = function() {
        sock.send($scope.messageText);
        $scope.messageText = "";
    };

    sock.onmessage = function(e) {
    	var now = new Date();
    	var user;
    	if ($cookieStore.get("loggedInUser") ){

    		user = $cookieStore.get("loggedInUser");
    	}

        $scope.messages.push(now.toLocaleTimeString() + " "+ user + ": " + e.data);

        
        
        var chat_div = document.getElementById('chat_body');
        var onBottom = false;
       
        if (chat_div.scrollTop === chat_div.scrollHeight - chat_div.offsetHeight){
        	onBottom = true;
        	
        }

        $scope.$apply();
        if (onBottom) {
        	chat_div.scrollTop = chat_div.scrollHeight;
        }
    };
}
]);