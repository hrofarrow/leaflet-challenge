// create map object 
var myMap = L.map("map", {
    center: [40.7128, -74.0059], 
    zoom: 4
});

// Add tile layer 
L.tileLayer ("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512, 
    maxZoom: 18, 
    zoomOffset: -1, 
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

// link to get the json data 
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// grab the json data 
d3.json(link, function(data) {
    function styleData(feature) {
        return {
            opacity: 1, 
            fillOpacity: 1, 
            fillColor: getColor(feature.properties.mag), 
            color: "#000000", 
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }

    // define marker color based on earthquake magnitude
    function getColor(magnitude) {
    switch (true) {
        case magnitude > 5:
            return "#ea2c2c";
        case magnitude > 4:
            return "#ea822c";
        case magnitude > 3:
            return "#ee9c00";
        case magnitude > 2:
            return "#eecc00";
        case magnitude > 1:
            return "#d4ee00";
        default:
            return "#98ee00";
        }    
    }

    // define radius based on earthquake magnitude 
    function getRadius (magnitude) {
        if (magnitude === 0 ) {
            return 1;
        }
        return magnitude * 3;
    }

    // add layer to map 
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng);
        },
        style: styleData,
        onEachFeature: function(feature, layer) {
          layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    
    }).addTo(myMap);
    
});