var locations = [
	{
		name: 'Seattle Public Library-Central Library',
		lat: 47.6067006,
		long: -122.3346896
	},
	{
		name: 'Benaroya Hall',
		lat: 47.6080842,
		long: -122.339159
	},
	{
		name: 'Town Hall Seattle',
		lat: 47.6090662,
		long: -122.3323566
	},
	{
		name: 'Columbia Center',
		lat: 47.6043696,
		long: -122.332687
	},
	{
		name: 'Metropolitan Grill',
		lat: 47.3595322,
		long: -123.4806067
	}

];

function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var url = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + $('#street').val() + "," + $('#city').val()
    $body.append('<img class="bgimg" ');
    $('.bgimg').attr('src', url);
    return false;
};

$('#form-container').submit(loadData);

function setupList() {
    
    var keylocationCollection = $('.keyLocations')
    locations.forEach(function (loc) {
        keylocationCollection.append('<div>' + loc.name +'</div>')
    })
}

function initMap() {
    ko.applyBindings(new AppViewModel());
    setupList();
    var uluru = {lat: 47.8104922, lng: -122.248259};
    var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: uluru
});

var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    title: 'Hello World!'
  });
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function AppViewModel() {
}