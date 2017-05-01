var locations = [
	{
		name: 'Seattle Public Library-Central Library',
		lat: 47.6067006,
		lng: -122.3325009,
        visible: true
	},
	{
		name: 'Tacoma Done',
		lat: 47.2366694,
		lng: -122.4270299,
        visible: true
	},
	{
		name: 'Microsoft Corporation',
		lat: 47.5556769,
		lng: -122.0495224,
        visible: true
	},
	{
		name: 'Mount Rainier National Park',
		lat: 46.8799663,
		lng: -121.7269094,
        visible: true
	},
	{
		name: 'Seattle Premium Outlets',
		lat: 48.093531,
		lng: -122.188311,
        visible: true
	}

];

var locMarker = [];
var searchStreet;
var map;
var filteredLocations = [];

function setupLocMarker() {
    locMarker = [];
    locations.forEach(function (loc) {
        if (loc) {
            var marker = new google.maps.Marker({
                position: loc,
                map: map,
                title: loc.name
            });

            marker.addListener('click', toggleBounce);
            locMarker.push(marker);
        }
        else {
            loc.setMap(null);
        }
    });
}
function locationsListClicked (place) {
    toggleBounce.call(place.marker);
}

function toggleBounce() {
    if (this.getAnimation() !== null) {
          this.setAnimation(null);
    } else {
        this.setAnimation(google.maps.Animation.BOUNCE);
    }
}

function hideAndShowMarker() {    
    
    filteredLocations.removeAll();
    for (var i = 0; i < locMarker.length; i++) {
        if(locations[i].visible) {
            locMarker[i].setMap(map);
            locations[i].marker = locMarker[i];

            filteredLocations.push(locations[i]);
        }
        else {
            locMarker[i].setMap(null);
        }
    }
}

function filterList() {
    ko.computed( function() {
		var filter = searchStreet().toLowerCase();
		if (!filter) {
			locations.forEach(function(locationItem){
				locationItem.visible = true;
			});
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

function initMap() {
    ko.applyBindings(new AppViewModel());

    var uluru = {lat: 47.8104922, lng: -122.248259}; //seattle
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: uluru
    });
    
    setupLocMarker();
    filterList();
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function AppViewModel() {
    
    searchStreet = ko.observable("");
    filteredLocations = ko.observableArray(filteredLocations);

}