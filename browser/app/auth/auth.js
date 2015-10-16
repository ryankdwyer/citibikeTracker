app.directive('login', function(){
	return {
		restrict: 'E',
		templateUrl: '/app/auth/auth.html',
		controller: 'AuthController'
	};
});