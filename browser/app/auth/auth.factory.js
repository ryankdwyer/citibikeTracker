app.factory('AuthFactory', function ($http, $state) {
    function toData(response) {
        return response.data;
    }
    return {
        login: function (credentials) {
            return $http.post('/api/login', credentials)
                .then(toData);
        },
        register: function (credentials) {
            return $http.post('api/register', credentials)
                .then(toData);
        },
        logout: function () {
            return $http.post('api/logout')
                .then(toData);
        },
        signInWithGoogle: function () {
            return $http.get('api/auth/google')
                .then(function (response) {
                    return response.data;
                });
        }
    };
});
