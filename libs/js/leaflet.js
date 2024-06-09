// import {mapData} from './script';

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

var leedsUnited = L.marker([53.777782, -1.573049]).bindPopup('Leeds United FC');
var liversedgeFc = L.marker([53.717252131, -1.70706217173]).bindPopup('Liversedge FC');

// Tile Groups

var stadiums = L.layerGroup([leedsUnited, liversedgeFc]);


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

var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(map);

var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
}).addTo(map);

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);


var baseLayers = {
    "OpenTopoMap": OpenTopoMap,
    "Stadia_AlidadeSmoothDark": Stadia_AlidadeSmoothDark,
    "Esri_WorldImagery": Esri_WorldImagery,
    "Open Map France": OpenStreetMap_France,
    "OpenStreetMap": osm,
     
    
};

var overlays = {
    "Grounds": stadiums
};

L.control.layers(baseLayers).addTo(map);
L.geoJSON()


