

// var map = L.map('map').setView([51.509865, -0.118092], 13); // This needs input, the below finds your location.

// var map = L.map('map', {
//     doubleClickZoom: false,
// }).locate({
//     setView: true, 
//     maxZoom: 13,
// });

var map = L.map('map').fitWorld();

map.locate({
  setView: true, 
  maxZoom: 15,
});


function onLocationFound(e) {
  var radius = e.accuracy;

  L.marker(e.latlng).addTo(map)
      .bindPopup("You are within " + radius + " meters from this point").openPopup();

  L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);


//Leaflet map modal buttons

var infoBtnWeather = L.easyButton("fa fa-sun-o", function (btn, map) {
    $("#mapModalWeather").modal("show");
  });

infoBtnWeather.addTo(map);

var infoBtnCurrentLocation = L.easyButton("fa fa-user", function (btn, map) {
    $("#countryCurrentLocation").modal("show");
  });

infoBtnCurrentLocation.addTo(map);


var countryData = L.easyButton("fa fa-globe", function (btn, map) {
  $('#countryInformation').modal('show');
});

countryData.addTo(map);

var countryFlagInfo = L.easyButton("fa fa-flag", function (btn, map) {
  $('#countryInfoModal').modal('show');
});

countryFlagInfo.addTo(map);

var countryCurrencyData = L.easyButton("fa fa-money", function (btn, map) {
  $('#countryCurrencyData').modal('show');
});

countryCurrencyData.addTo(map);


// Tiles

// var leedsUnited = L.marker([53.777782, -1.573049]).bindPopup('Leeds United FC');
// var liversedgeFc = L.marker([53.717252131, -1.70706217173]).bindPopup('Liversedge FC');

// Tile Groups

// var stadiums = L.layerGroup([leedsUnited, liversedgeFc]);


// Map Layers

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var OpenStreetMap_France = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
	maxZoom: 20,
	attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var Stadia_AlidadeSatellite = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'jpg'
}).addTo(map);


var baseLayers = {
    "Satalite": Stadia_AlidadeSatellite,
    "Open Map France": OpenStreetMap_France,
    "OpenStreetMap": osm, 
    
};

// var overlays = {
//     "Grounds": stadiums
// };

L.control.layers(baseLayers).addTo(map);



