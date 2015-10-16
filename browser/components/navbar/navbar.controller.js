app.controller('NavbarController', function($scope, $http, AuthFactory){
	$scope.showLogin = function() {
		var modal = angular.element('#loginModal');
		if (modal.hasClass('show')) {
			modal.removeClass('show');
			modal.addClass('hide');
		} else {
			modal.removeClass('hide');
			modal.addClass('show');
		}
	};

	$scope.logout = function () {
		AuthFactory.logout();
	};

	$scope.closeModal = function(){
		angular.element('#loginModal').addClass('hide');
		angular.element('#loginModal').removeClass('show');
	};
});