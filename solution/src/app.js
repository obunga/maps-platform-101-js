/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import MarkerClusterer from '@google/markerclustererplus';

loadMapsJSAPI();

function runApp() {
  console.log('Maps JS API loaded');
  const map = displayMap();
  const markers = addMarkers(map);
  clusterMarkers(map, markers);
}

function loadMapsJSAPI() {
  const googleMapsAPIKey = 'AIzaSyAr3beVjCYqlA-UX6o6tUiQ9gmGFz1wIcc';
  const googleMapsAPIURI = `https://maps.googleapis.com/maps/api/js?key=${googleMapsAPIKey}&callback=runApp`;
  
  const script = document.createElement('script');
  script.src = googleMapsAPIURI;
  script.defer = true;
  script.async = true;

  window.runApp = runApp;
  
  document.head.appendChild(script);
}

function displayMap() {
  const mapOptions = {
    center: { lat: -2.278620, lng: 37.826038 },
    zoom: 14
  };
  const mapDiv = document.getElementById('map');
  const map = new google.maps.Map(mapDiv, mapOptions);
  return map;
}

function addMarkers(map) {
  const locations = {
    mbuinzau: { lat: -2.366600, lng: 37.900000 },
    kibwezi: { lat:  -2.410420, lng: 37.967819 },
    kiboko: { lat:  -2.211530, lng: 37.721111 },
    makindu: {lat:  -2.278620, lng: 37.826038 },
    kalulini: { lat:  -2.350000, lng: 37.983300 },
    chyuluHills: { lat:  -2.682527, lng: 37.893083 },
    sikhTempleMakindu: { lat:  -2.282070, lng: 37.821683 },
    jamiaMosqueMakindu: { lat:  -2.279509, lng: 37.820329 },
    makinduLawCourts: { lat:  -2.285469, lng: 37.819131 }
  }
  const markers = [];
  for  (const location in locations) {
    const markerOptions = {
      map: map,
      position: locations[location],
      icon: './img/custom_pin.png'
    }
    const marker = new google.maps.Marker(markerOptions);
    markers.push(marker);
  }
  return markers;
}

function clusterMarkers(map, markers) {
  const clusteredOptions = { imagePath: './img/m' }
  const markerCluster = new MarkerClusterer(map, markers, clusteredOptions);
}
