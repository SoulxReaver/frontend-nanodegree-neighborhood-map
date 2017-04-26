
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

function initMap() {
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

/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}