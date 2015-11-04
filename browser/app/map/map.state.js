app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('map', {
            abstract: true,
            url: '/s',
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
        })
        .state('map.panel', {
            url: '',
            templateUrl: '/app/panel/panel.html',
            controller: 'PanelController'
        });
    $urlRouterProvider.when('/api/auth/google', '/');
});
