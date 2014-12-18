var BIGFUNCTON = function() {
  
  // API config
  var config = {
    apiKey: 'SSXHG3XZZNH25PGCJFR0N3WOT51BNHLRQ1HCMJDDKDXMUYCX',
    authUrl: 'https://foursquare.com/',
    apiUrl: 'https://api.foursquare.com/'
  };
 
  // Attempt to retrieve access token from URL
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

  //get picture & name
  $.getJSON(config.apiUrl + 'v2/users/self?' + '&oauth_token=' + token + '&v=20140601', {}, function(data) {
    //document.getElementById("name").innerHTML = data['response']['user']['firstName'];
    var picURL = data['response']['user']['photo']['prefix'] + '50x50' + data['response']['user']['photo']['suffix'];
    document.getElementById("picture").innerHTML = '<img class="img-circle" src="' + picURL + '">';
  })
  

  // load map and venues
  navigator.geolocation.getCurrentPosition( function( position ){ 
    lat = position.coords.latitude;
    lng = position.coords.longitude;

    // get list of venues
    $.getJSON(config.apiUrl + 'v2/venues/search?ll=' + lat + ',' + lng + '&oauth_token=' + token + '&v=20141205', {}, function(data) {
      venues = data['response']['venues'];

      // Create map.
      var map = new L.mapbox.map('map', 'hellayela.k81bj929').setView(new L.LatLng(lat, lng), 17);

      // marker for user location
      var redMarker = L.icon({
        iconUrl: 'images/marker-icon-red.png'
      })
      L.marker([lat, lng], {icon:redMarker}).addTo(map);

      // message
      document.getElementById('head4').innerHTML = 'check-in to a venue';

      // populate map with venue markers and list with venues
      for(var i = 0; i < 4; i++){
        // list
        var num = i+1;
        document.getElementById(i).style.display = 'block';
        document.getElementById(i).innerHTML = num + ': ' + venues[i]['name'];
        document.getElementById(i).href = 'people.html?venueID=' + venues[i]['id'] + '&venueName=' + venues[i]['name'] + '&token=' + token;

        // pins
        var latLng = new L.LatLng(
          venues[i]['location']['lat'],
          venues[i]['location']['lng']
        );
        L.marker(latLng).addTo(map);
      }
    })
  })

}



window.onload = BIGFUNCTON;

