import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { locStorage } from './services/locStorage.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onDeleteLoc = onDeleteLoc
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;

window.onCenterToUserLoc = onCenterToUserLoc;
window.onGetUseInput = onGetUseInput;

function onInit() {
    onGetLocs()
    console.log('adi is testing');
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)

    })
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            renderLoc(locs)
        })
}

function renderLoc(locs) {
    var strHTML = locs.map(loc => {
        return `
        <div>
        Location name: ${loc.name}, created at: ${loc.createdAt}
        <button onclick="onPanTo(${loc.lat},${loc.lng})">GO</button>
        <button onclick="onDeleteLoc(${loc.id})">DELETE</button>
        </div>
        `
    })
    document.querySelector('.location-list').innerHTML = strHTML.join('')
}

function onDeleteLoc(locId) {
    locService.deleteLoc(locId)
    onGetLocs()
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

function onPanTo(lat, lng) {
    console.log('Panning the Map');
    mapService.panTo(lat, lng);
}



function onCenterToUserLoc() {
    if (!navigator.geolocation) {
        alert("HTML5 Geolocation is not supported in your browser")
        return
    }
    navigator.geolocation.getCurrentPosition(locService.showLocation, locService.handleLocationError)
}

function onGetUseInput(ev) {
    ev.preventDefault()
    const elAddress = document.querySelector('[name=address]')
    var address = elAddress.value
    console.log('address', address)
    getSearchedLoc(address)
        .then(res => {
            mapService.panTo(res.lat, res.lng)
            document.querySelector('.input-loc').innerHTML = `Location: ${res.name}`

        })
    // if (window.google) return Promise.resolve()
}


function getSearchedLoc(address) {
    const API_KEY = 'AIzaSyCz94MTPax3HBc_be3l_LOjwbB8oS0tB48'
    // var elGoogleApi = document.createElement('script');
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
        .then(
            (res) => ({
                lat: res.data.results[0].geometry.location.lat,
                lng: res.data.results[0].geometry.location.lng,
                name: res.data.results[0].formatted_address
            })
        )
}


// console.log('address.results', address.results)
// console.log('elGoogleApi', elGoogleApi.src)

// https: //maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCz94MTPax3HBc_be3l_LOjwbB8oS0tB48

// elGoogleApi.async = true;
// document.body.append(elGoogleApi);

// return new Promise((resolve, reject) => {
//     elGoogleApi.onload = resolve;
//     elGoogleApi.onerror = () => reject('Google script failed to load')
// })

// }