var BIGFUNCTON = function() {
///////////////////////////////////////////////////////////
var config = {
    apiKey: 'SSXHG3XZZNH25PGCJFR0N3WOT51BNHLRQ1HCMJDDKDXMUYCX',
    authUrl: 'https://foursquare.com/',
    apiUrl: 'https://api.foursquare.com/'
  };
  
 
  //<![CDATA[
 
  /* Attempt to retrieve access token from URL. */
  function doAuthRedirect() {
    var redirect = window.location.href.replace(window.location.hash, '');
    var url = config.authUrl + 'oauth2/authenticate?response_type=token&client_id=' + config.apiKey +
        '&redirect_uri=' + encodeURIComponent(redirect) +
        '&state=' + encodeURIComponent($.bbq.getState('req') || 'users/self');
    window.location.href = url;
  };
 
  if ($.bbq.getState('access_token')) {
    // If there is a token in the state, consume it
    var token = $.bbq.getState('access_token');
    $.bbq.pushState({}, 2)
  } else if ($.bbq.getState('error')) {
  } else {
    doAuthRedirect();
  }
 /////////////////////////////////////////////////////////

  /* HTML 5 geolocation. */
navigator.geolocation.getCurrentPosition(function(data) {
    var lat = data['coords']['latitude'];
    var lng = data['coords']['longitude'];
    /* Create map. */
    var map = new L.mapbox.map('map', 'hellayela.k81bj929')
      .setView(new L.LatLng(lat, lng), 15);

    /**
     * This is a sample map url that you need to change.
     * Sign up at http://mapbox.com/foursquare for a custom map url.
    
    var mapboxUrl = 'http://a.tiles.mapbox.com/v3/foursquare.map-b7qq4a62.jsonp';
???? wax.tilejson(mapboxUrl, function(tilejson) {
      map.addLayer(new wax.leaf.connector(tilejson)); */
    });

  /* Query foursquare API for venue recommendations near the current location. */
    $.getJSON(config.apiUrl + 'v2/venues/explore?ll=' + '40.7685' + ',' + '-73.9647' + '&oauth_token=' + 'FGMM54IS2LJSTW1MRKMR4ISX1X4NQCRWZWJWWNMSQO2MZDM5' + '&v=20140601', {}, function(data) {
      venues = data['response']['groups'][0]['items'];

      /* Place marker for each venue. */
      for (var i = 0; i < venues.length; i++) {
        /* Get marker's location */
        var latLng = new L.LatLng(
          venues[i]['venue']['location']['lat'],
          venues[i]['venue']['location']['lng']
        );
        /* Build icon for each icon */
        var fsqIcon = venues[i]['venue']['categories'][0]['icon'];
        var leafletIcon = L.Icon.extend({
          iconUrl: fsqIcon['prefix'] + '32' + fsqIcon['suffix'],
          shadowUrl: null,
          iconSize: new L.Point(32,32),
          iconAnchor: new L.Point(16, 41),
          popupAnchor: new L.Point(0, -51)
        });
     
        var icon = new leafletIcon();
        var marker = new L.Marker(latLng, {icon: icon})
          .bindPopup(venues[i]['venue']['name'], { closeButton: false })
          .on('mouseover', function(e) { this.openPopup(); })
          .on('mouseout', function(e) { this.closePopup(); });
        map.addLayer(marker);

        /*
var foursquarePlaces = L.layerGroup().addTo(map);
// Transform each venue result into a marker on the map.
    for (var i = 0; i < result.response.venues.length; i++) {
      var venue = result.response.venues[i];
      var latlng = L.latLng(venue.location.lat, venue.location.lng);
      var marker = L.marker(latlng, {
          icon: L.mapbox.marker.icon({
            'marker-color': '#BE9A6B',
            'marker-symbol': 'cafe',
            'marker-size': 'large'
          })
        })
      .bindPopup('<strong><a href="https://foursquare.com/v/' + venue.id + '">' +
        venue.name + '</a></strong>')
        .addTo(foursquarePlaces);
    }

        */



      }
    })
  }


window.onload = BIGFUNCTON;

