app.factory('MapFactory', function($http){
	return {
		stations: [],
		updates: {},
		origin: null,
		destination: null,
		map: null,
		userHome: null,
		markers: [],
		getStations: function(){
			return $http.get('/api/stations')
			.then(function(response){
				return response;
			});
		},
		getUpdates: function(){
			return $http.get('/api/update')
			.then(function(response){
				return response;
			});
		},
		setCenter: function (locationObj) {
		    var center = new google.maps.LatLng(locationObj[0].lat, locationObj[1].lng);
		    this.map.setCenter(center);
		}
	};
});