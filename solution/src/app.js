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
  addPanToMarker(map, markers);
  infowindow.open(map, markers);
}

function loadMapsJSAPI() {
  const googleMapsAPIKey = 'YOUR API KEY';
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

function addPanToMarker(map, markers) {
  let circle;
  markers = markers.map(marker => {
    marker.addListener('click', event => {
      const location = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      map.panTo(location);
      if (circle) {
	circle.setMap(null);
      }
      circle = drawCircle(map, location);
    });
  });
  return markers;
}

function drawCircle(map, location) {
  const circleOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 1,
    map: map,
    center: location,
    radius: 600
  }
  const circle = new google.maps.Circle(circleOptions);
  return circle;
}

function initMap() {
  var makinduAirStrip = { lat: -2.287126, lng: 37.821984 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: makinduAirStrip
  });

  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Makindu</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Makindu</b> is a small town in Makueni County of Kenya, on the Nairobi-Mombasa highway. ' +
      'The settlement was established as a base for railway construction.'+
      'The Sikh Temple in Makindu was built at that time.'+
      '<b>Points of Interest</b>'+
      'The offices of Makindu Town Council.'+
      'The offices of Makindu sub-county. '+
      'The Shushan Palace Hotel. '+
      'Makindu Sikh Temple. '+
      'Makindu General Hospital. '+
      'Kenya Commercial Bank.</p>'+
      '<p>Attribution: Makindu <a href="https://asili.photos">'+
      'https://asili.photos/category/plants.html '+
      '(last visited September 22, 2020).</p>'+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: makindu,
    map: map,
    title: 'Makindu, My Home'
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}



