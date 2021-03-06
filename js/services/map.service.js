import { locService } from './loc.service.js'
export const mapService = {
    initMap,
    addMarker,
    panTo,
    // centerToMyLocation,
    // showLocation
    // setUserLocation
}

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            gMap.addListener("click", (ev) => { panTo(ev.latLng.lat(), ev.latLng.lng()), saveLocation(ev) })
            console.log('Map!', gMap);
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}

function saveLocation(ev) {
    var locName = prompt('Enter Location Name')
    locService.getCityByCoords(ev.latLng.lat(), ev.latLng.lng(), locName)
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyCz94MTPax3HBc_be3l_LOjwbB8oS0tB48'
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

// function _connectAdress() {
//     if (window.google) return Promise.resolve()
//     const API_KEY = 'AIzaSyCz94MTPax3HBc_be3l_LOjwbB8oS0tB48'
//     var elGoogleApi = document.createElement('script');
//     elGoogleApi.src = `https: //maps.googleapis.com/maps/api/geocode/json?address=${userInputAdress}&key=${API_KEY}`;
//     elGoogleApi.async = true;
//     document.body.append(elGoogleApi);

//     return new Promise((resolve, reject) => {
//         elGoogleApi.onload = resolve;
//         elGoogleApi.onerror = () => reject('Google script failed to load')
//     })

// }