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

  //get picture & name
  $.getJSON(config.apiUrl + 'v2/users/self?' + '&oauth_token=' + token + '&v=20140601', {}, function(data) {
    //document.getElementById("name").innerHTML = data['response']['user']['firstName'];
    var picURL = data['response']['user']['photo']['prefix'] + '50x50' + data['response']['user']['photo']['suffix'];
    document.getElementById("picture").innerHTML = '<img class="img-circle" src="' + picURL + '">';
  })

 navigator.geolocation.getCurrentPosition( function( position ){ 
  lat = position.coords.latitude;
  lng = position.coords.longitude;

  // check in to venue
  var xhr = new XMLHttpRequest();
  xhr.open("POST", config.apiUrl + 'v2/checkins/add?venueId=' + venueID + '&oauth_token=' + token + '&ll=' + lat + ',' + lng + '&llacc=1&m=swarm&v=20141217');
  xhr.send();

  // generate jumbotron
  document.getElementById('head1').innerHTML = '<small>You are now checked in to </small>' + venueName;

  // see who is checked in
  $.getJSON(config.apiUrl + 'v2/venues/' + venueID + '/herenow?oauth_token=' + token + '&m=swarm&v=20141217', {}, function(data) {
  	people = data['response']['hereNow'];

    // generate message
    console.log(people);
    if(people['count'] == 0){
      document.getElementById('head4').innerHTML = 'It looks like noone else is here, try refreshing or try again later';
    } else if (people['count'] == 1 && people['items'][0]['user']['relationship'] == 'self') {
      document.getElementById('head4').innerHTML = 'It looks like noone else is here, at least nobody cool';
    } else {
      document.getElementById('head4').innerHTML = 'Look who else is checked in, say hello!';
    }

    // generate list of people that are checked in
    for (var i = 0; i < people['count']; i++) {
      if(people['items'][i]['user']['relationship'] == 'self'){
        // do nothing
      } else {
        var imgURL = people['items'][i]['user']['photo']['prefix'] + '50x50' + people['items'][i]['user']['photo']['suffix'];
        var imgObj = '<img src="' + imgURL + '" class="img-rounded"><b>    ';
        document.getElementById(i).style.display = 'block';
        document.getElementById(i).innerHTML =  imgObj + people['items'][i]['user']['firstName'] + ' ' + people['items'][i]['user']['lastName'] + '</b>';
      }
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
