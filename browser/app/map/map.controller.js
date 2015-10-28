app.controller('MapController', function ($scope, MapFactory, stations, updates) {
    var map;
    $scope.initMap = function () {
        var home = {
            lat: 40.729546,
            lng: -73.98569
        };
        
        map = new google.maps.Map(angular.element('#map-canvas')[0], {
            center: home,
            zoom: 13
        });
        MapFactory.map = map;

        var bikeLayer = new google.maps.BicyclingLayer();
        bikeLayer.setMap(map);

        var bounds = new google.maps.LatLngBounds();
        
        var infowindow = new google.maps.InfoWindow();
        map.addListener('click', function () {
            infowindow.close();
        });
        
        stations.data.forEach(function (el) {
            var marker = $scope.drawLocation([el.latitude, el.longitude], {});
            MapFactory.markers.push(marker);
            marker.addListener('click', function () {
                infowindow.close();
                var contentString;
                contentString = "<p>Station: " + el.label + "</p>" +
                    "<p>Bikes: " + updates.data[el.stationId][0] + '</p>' +
                    "<p>Docks: " + updates.data[el.stationId][1] + '</p>' +
                    "<p>Active: " + el.status + '</p>' +
                    "<p>Last Update: " + $scope.setDate(updates.data[el.stationId][2]) + '</p>';
                infowindow.setContent(contentString);
                infowindow.open(map, marker);
            });
        });
    };

    $scope.updater = function () {
        MapFactory.getUpdates()
            .then(function (response) {
                updates = response;
                $scope.initMap();
            });
    };

    $scope.removeMarkers = function () {
        MapFactory.markers.forEach(function (el) {
            el.setMap(null);
        });
    };

    $scope.showMarkers = function () {
        MapFactory.markers.forEach(function (el) {
            el.setMap(MapFactory.map);
        });
    };

    $scope.setDate = function (unix) {
        var date = new Date(unix * 1000);
        var hours = date.getHours();
        var ampm = (date.getHours() > 12) ? 'PM' : 'AM';
        hours = hours % 12;
        hours = (hours) ? hours : 12;
        var minutes = date.getMinutes();
        minutes = (minutes < 10) ? '0' + minutes : minutes;
        return 'Today @ ' + hours + ':' + minutes + ' ' + ampm;
    };

    $scope.drawLocation = function (location, opts) {
        if (typeof opts !== 'object') {
            opts = {};
        }
        opts.icon = '/images/bike.png';
        opts.position = new google.maps.LatLng(location[0], location[1]);
        opts.map = map;
        return new google.maps.Marker(opts);
    };

    $scope.setMapCenter = function (locationObj) {
        var center = new google.maps.LatLng(locationObj[0].lat, locationObj[1].lng);
        MapFactory.map.setCenter(center);
    };

    $scope.initMap();
});
