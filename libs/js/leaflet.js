


// var map = L.map('map').setView([51.509865, -0.118092], 13); // This needs input, the below finds your location.

var map = L.map('map', {
    doubleClickZoom: false,
}).locate({
    setView: true, 
    maxZoom: 13,
});



// Everything below here is test data - Everything above is running the map

var infoBtn = L.easyButton("fa-info", function (btn, map) {
    $("#mapModal").modal("show");
  });

infoBtn.addTo(map);

var infoBtnAirport = L.easyButton("fa-plane", function (btn, map) {
    $("#countryAirports").modal("show");
  });

infoBtnAirport.addTo(map);

var infoBtnFootball = L.easyButton("fa-futbol-o", function (btn, map) {
    $("#countryFootball").modal("show");
  });

infoBtnFootball.addTo(map);


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


var baseLayers = {
    "Satalite": Stadia_AlidadeSatellite,
    "Open Map France": OpenStreetMap_France,
    "OpenStreetMap": osm, 
    
};

var overlays = {
    "Grounds": stadiums
};

L.control.layers(baseLayers, overlays).addTo(map);




function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
}

var someFeatures = [{
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "show_on_map": true
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
}, {
    "type": "Feature",
    "properties": {
        "name": "Busch Field",
        "show_on_map": true
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-103.98404, 38.74621]
    }
}];



function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
}

L.geoJSON(geojsonFeature, {
    onEachFeature: onEachFeature
}).addTo(map);

L.geoJSON(someFeatures, {
    filter: function(feature, layer) {
        return feature.properties.show_on_map;
    }
}).addTo(map);
