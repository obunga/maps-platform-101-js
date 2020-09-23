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

loadMapsJSAPI();

function runApp() {
  console.log('Maps JS API loaded');
  const map = displayMap();
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
