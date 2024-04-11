'use strict';


mapboxgl.accessToken = 'pk.eyJ1IjoiZ3VybGlua2F1ciIsImEiOiJjbHExYjM4cHUwNzE3MnBud25qNDlmc2VjIn0.Jeu9BD0h1vILAwXce8dQqw';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-74.006, 40.7128],
    zoom: 12
});

const marker = new mapboxgl.Marker({
    color: 'orange',
    draggable: true
})
    .setLngLat([-74.006, 40.7128])
    .addTo(map);

  document.getElementById('locate-us').addEventListener('click', function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      const userLocation = [position.coords.longitude, position.coords.latitude];
      map.flyTo({
        center: userLocation,
        zoom: 12
      });
      marker.setLngLat(userLocation).addTo(map); // Add marker to the map at user's location

      // Reverse geocoding to get the address
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
      });
      geocoder.reverseGeocode({ 
        query: userLocation 
      }, function(error, result) {
        if (error) {
          console.error(error);
          return;
        }
        const address = result.features[0].place_name;
        console.log(address);
        // Display the address in an element with id 'address'
        document.getElementById('address').textContent = address;
      });
    });
  });