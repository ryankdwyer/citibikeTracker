app.controller('PanelController', function ($scope, MapFactory) {
    var origin = document.getElementById('pac-input-origin');
    var originBox = new google.maps.places.Autocomplete(origin);
    var destination = document.getElementById('pac-input-destination');
    var destinationBox = new google.maps.places.Autocomplete(destination);

    originBox.addListener('place_changed', function () {
        MapFactory.origin = originBox.getPlace();
    });

    destinationBox.addListener('place_changed', function () {
        MapFactory.destination = destinationBox.getPlace();
    });

    function newLatLngObj(locationObj) {
        return new google.maps.LatLng(
            locationObj.geometry.location.G,
            locationObj.geometry.location.K
            );
    }

    $scope.setBounds = function () {
        var bounds = new google.maps.LatLngBounds();
        origin = newLatLngObj(MapFactory.origin);
        destination = newLatLngObj(MapFactory.destination);
        bounds.extend(origin);
        bounds.extend(destination);
        MapFactory.map.fitBounds(bounds);
    };

    $scope.getTravelTime = function () {
        var service = new google.maps.DistanceMatrixService;
        var infowindow = new google.maps.InfoWindow();

        service.getDistanceMatrix({
            origins: [newLatLngObj(MapFactory.origin)],
            destinations: [newLatLngObj(MapFactory.destination)],
            travelMode: google.maps.TravelMode.BICYCLING,
        }, function (response, status) {
            if (status === google.maps.DistanceMatrixStatus.OK) {
                console.log(response);
                console.log(response.rows[0].elements[0].duration.text);
                infowindow.setContent(response.rows[0].elements[0].duration.text);
            }
        });
    };

    $scope.calcAndDisplayRoute = function () {
        var directionsService = new google.maps.DirectionsService;
        $scope.getTravelTime();
        directionsService.route({
            origin: newLatLngObj(MapFactory.origin),
            destination: newLatLngObj(MapFactory.destination),
            travelMode: google.maps.TravelMode.BICYCLING,
            provideRouteAlternatives: true
        }, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                for (var i = 0; i < response.routes.length; i++) {
                    var color = (i === 0) ? 'DodgerBlue' : 'DarkGray';
                    var zIndex = (i === 0) ? 1000 : null;
                    var directions = new google.maps.DirectionsRenderer({
                        map: MapFactory.map,
                        directions: response,
                        routeIndex: i,
                        polylineOptions: {
                            strokeColor: color, 
                            zIndex: zIndex, 
                            strokeWeight: 5
                        }
                    });
                    if (i === 0) directions.setPanel(document.getElementById('directionsPanel'));
                }
            } else {
                window.alert('Directions request failed due to: ', status);
            }
        });
    };
});
