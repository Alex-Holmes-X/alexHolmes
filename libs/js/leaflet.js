


// var map = L.map('map').setView([latt, long], 13); // This needs input, the below finds your location.

var map = L.map('map', {doubleClickZoom: false}).locate({setView: true, maxZoom: 13});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);




