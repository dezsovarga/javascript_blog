describe('login', function() {

	var $injector, loginService, users;

	beforeEach(function(){
		$injector = angular.injector([ 'BlogApp' ]);
  		loginService = $injector.get( 'loginService' );

  		users = [
		    {
		      "username": "georgevasile",
		      "password": "ggvasile",
		      "name": "George Vasile",
		      "email": "gv@example.com"
		    },
		    {
		      "username": "mihaiion",
		      "password": "mmion",
		      "name": "Mihai Ion",
		      "email": "mm@example.com"
		    }
		]

	})  
  	

  it('valid login', function() {

    expect( loginService.isValidLogin("mihaiion","mmion", users) ).toEqual(true); 
  });

  it('invalid login', function() {

    expect( loginService.isValidLogin("mihaiion","wrongpassword", users) ).toEqual(false); 
  });
  

});