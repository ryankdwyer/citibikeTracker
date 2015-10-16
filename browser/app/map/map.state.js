app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('map', {
            url: '',
            templateUrl: "/app/map/map.html",
            controller: 'MapController',
            resolve: {
                stations: function (MapFactory) {
                    return MapFactory.getStations();
                },
                updates: function (MapFactory) {
                    return MapFactory.getUpdates();
                }
            }
        });
    $stateProvider
        .state('map.panel', {
            url: '/panel',
            templateUrl: '/app/panel/panel.html',
            controller: 'PanelController'
        });
    $urlRouterProvider.when('/api/auth/google', '/');
});
