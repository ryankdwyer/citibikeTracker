app.controller('AuthController', function ($scope, AuthFactory, MapFactory) {
    var home = document.getElementById('pac-input-home');
    var homeBox = new google.maps.places.Autocomplete(home);
    var location;

    homeBox.addListener('place_changed', function () {
        location = parseLocation(homeBox.getPlace());
    });

    function parseLocation(placesObj) {
        return [
            {lat: placesObj.geometry.location.G},
            {lng: placesObj.geometry.location.K}
            ];
    }

    $scope.signUp = function (credentials) {
        if (location) {
            credentials.home = location;
            AuthFactory.register(credentials)
            .then(function(){
                $scope.closeModal();
            });
        } else {
            alert("Please enter a valid address");
        }
    };

    $scope.signInWithGoogle = function () {
        AuthFactory.signInWithGoogle()
        .then(function(user){
            $scope.closeModal();
            MapFactory.userHome = user.home;
            MapFactory.setCenter(MapFactory.userHome);
            alert('Welcome ' + user.name + '!');
        });
    };

    $scope.loginSubmit = function (credentials) {
        console.log($scope.loginForm);
        AuthFactory.login(credentials)
        .then(function(user){
            $scope.closeModal();
            MapFactory.userHome = user.home;
            console.log('user home', MapFactory.userHome);
            MapFactory.setCenter(MapFactory.userHome);
            alert('Welcome ' + user.name + '!');
        }); 
    };

    $scope.logOut = function () {
        AuthFactory.logOut();
    };

    $scope.showLogin = function () {
        var modal = angular.element('#loginModal');
        modal.removeClass('hide');
        modal.addClass('show');
    };

    $scope.showSignup = function () {
        var modal = angular.element('#signupModal');
        modal.removeClass('hide');
        modal.addClass('show');
    };

    $scope.closeModal = function () {
        angular.element('#loginModal').addClass('hide');
        angular.element('#loginModal').removeClass('show');
        angular.element('#signupModal').addClass('hide');
        angular.element('#signupModal').removeClass('show');
    };
});
