var load = function() {
	// API config
  var config = {
    apiKey: 'SSXHG3XZZNH25PGCJFR0N3WOT51BNHLRQ1HCMJDDKDXMUYCX',
    authUrl: 'https://foursquare.com/',
    apiUrl: 'https://api.foursquare.com/'
  };

  var token = getUrlVars()['token'];
	var venueID = getUrlVars()['venueID'];
  var venueName = getUrlVars()['venueName'].replace(/%20/g, ' ');

 navigator.geolocation.getCurrentPosition( function( position ){ 
  lat = position.coords.latitude;
  lng = position.coords.longitude;

  // check in to venue
  var xhr = new XMLHttpRequest();
  xhr.open("POST", config.apiUrl + 'v2/checkins/add?venueId=' + venueID + '&oauth_token=' + token + '&ll=' + lat + ',' + lng + '&llacc=1&m=swarm&v=20141217');
  xhr.send();

  // generate jumbotron
  document.getElementById('head1').innerHTML = '<small>You are now checked in to </small>' + venueName;

  // generate list of people in venue
  $.getJSON(config.apiUrl + 'v2/venues/' + venueID + '/herenow?oauth_token=' + token + '&m=swarm&v=20141217', {}, function(data) {
  	people = data['response']['hereNow'];
    //document.getElementById('people-list'). = num + ': ' + venues[i]['name'];
    console.log(people);
    for (var i = 0; i < people['count']; i++) {
       document.getElementById(i).style.display = 'block';
       document.getElementById(i).innerHTML = people['items'][i]['user']['firstName'] + ' ' + people['items'][i]['user']['lastName'];
    };

	})
 })

}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

window.onload = load;
