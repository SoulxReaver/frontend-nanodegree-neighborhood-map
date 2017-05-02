var locations = [
	{
		name: 'Seattle Public Library-Central Library',
		lat: 47.6067006,
		lng: -122.3325009,
        visible: true,
        index: 0
	},
	{
		name: 'Tacoma Done',
		lat: 47.2366694,
		lng: -122.4270299,
        visible: true,
        index: 1
	},
	{
		name: 'Microsoft Corporation',
		lat: 47.5556769,
		lng: -122.0495224,
        visible: true,
        index: 2
	},
	{
		name: 'Mount Rainier National Park',
		lat: 46.8799663,
		lng: -121.7269094,
        visible: true,
        index: 3
	},
	{
		name: 'Seattle Premium Outlets',
		lat: 48.093531,
		lng: -122.188311,
        visible: true,
        index: 4
	}

];
var clientId = 'KX5QOHCVYDOBKYCFM2FT3U5GXUOPKEAW20UUNBBTXYF11H44';
var clientSecret = 'U52N3NALZIHQSKJVA3NFXZTTUKZLCHA0JAUW5KNSE2OSAD5X';
var locMarker = [];
var searchStreet;
var map;
var filteredLocations = [];

function initMap() {
    ko.applyBindings(new AppViewModel());
    var uluru = {lat: 47.8104922, lng: -122.248259}; //seattle
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: uluru
    });
    
    filterList();
    setupLocMarker();
}

function AppViewModel() {
    searchStreet = ko.observable("");
    displayLocations = ko.observableArray();
}

function setupLocMarker() {
    locMarker = [];
    for(var i = 0; i <locations.length; i++) {
        var loc = locations[i];
        var marker = new google.maps.Marker({
            position: loc,
            map: map,
            title: loc.name
        });
        setupInfoWindow(loc, marker, locMarker, i);
    }
}

function setupInfoWindow(loc, marker, index) {
    var foursquareUrl = 'https://api.foursquare.com/v2/venues/search?client_id=' + 
    clientId +
    '&client_secret=' + clientSecret +
    '&v=20130815&ll=' + loc.lat + ',' + loc.lng + '&query=' + loc.name;
    var foursquareResult = {};
    $.getJSON(foursquareUrl).done(function(data) {
        var results = data.response.venues[0];
        foursquareResult.url = results.url;
        foursquareResult.street = results.location.formattedAddress[0];
        foursquareResult.city = results.location.formattedAddress[1];
        foursquareResult.phone = results.contact.phone;
        var contentString = 
        '<div>' +
            '<h3>' + loc.name + '</h3>' +
            '<div>url: ' + foursquareResult.url + '</div>' +
            '<div>street: ' + foursquareResult.street + '</div>' +
            '<div>city: ' + foursquareResult.city + '</div>' +
            '<div>phone: ' + foursquareResult.phone + '</div>' +
            '<div>latitude: ' + loc.lat + '</div>' +
            '<div>longitude: ' + loc.lng + '</div>' +
        '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        marker.infowindow = infowindow;

        marker.addListener('click', toggleBounce);
        
        marker.setMap(map);
        loc.marker = marker;
        filteredLocations[loc.index] = loc;
        locMarker[loc.index] = marker;
        displayLocations.push(loc);
    }).fail(function() {
        alert("There was an error with the Foursquare API call. Please Try again later.");
    });
}

function filterList() {
    ko.computed( function() {
		var filter = searchStreet().toLowerCase();
		if (!filter) {
            for (var i = 0; i < locations.length; i++) {
                locations[i].visible = true;
            }
		} else {
			ko.utils.arrayFilter(locations, function(locationItem) {
				var string = locationItem.name.toLowerCase();
				var result = (string.search(filter) >= 0);
				locationItem.visible = result;
			});
		}
        hideAndShowMarker();
	}, this);
}

function hideAndShowMarker() {
    displayLocations.removeAll();
    for (var i = 0; i < locMarker.length; i++) {
        if(locations[i].visible) {
            locMarker[i].setMap(map);
        }
        else {
            locMarker[i].setMap(null);
        }
        displayLocations.push(locations[i]);
    }
}

function locationsListClicked (place) {
    toggleBounce.call(place.marker);
}

function toggleBounce() {
    if (this.getAnimation() !== null) {
          this.setAnimation(null);
    } else {
        this.setAnimation(google.maps.Animation.BOUNCE);
        this.infowindow.open(map, this);
    }
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function errorHandling() {
	alert("Google Maps has failed to load. Please try again.");
}

function gm_authFailure() {
    errorHandling();
}