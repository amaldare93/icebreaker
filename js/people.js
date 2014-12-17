var load = function() {
	// API config
  var config = {
    apiKey: 'SSXHG3XZZNH25PGCJFR0N3WOT51BNHLRQ1HCMJDDKDXMUYCX',
    authUrl: 'https://foursquare.com/',
    apiUrl: 'https://api.foursquare.com/'
  };

  var token = getUrlVars()['token'];
	var venueID = getUrlVars()['venueID'];

  // check in to venue
  var xhr = new XMLHttpRequest();
  xhr.open("POST", config.apiUrl + 'v2/checkins/add?venueId=' + venueID + '&oauth_token=' + token + '&v=20141205');
  xhr.send();

  // 
  $.getJSON(config.apiUrl + 'v2/venues/' + venueID + '/herenow?oauth_token=' + token + '&v=20141205', {}, function(data) {
  	people = data['response']['hereNow'];
    console.log(people['count']);
    console.log(people['items']);
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
