import { locStorage } from './locStorage.service.js'
import { utilService } from './utils.service.js'
export const locService = {
    getLocs,
    getCityByCoords,
    showLocation,
    handleLocationError,
    deleteLoc,
}

const STORAGE_KEY = 'locsDB'

let gLocs = []

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gLocs);
        }, 2000)
    });
}

function getLocById(id) {
    const loc = gLocs.findIndex((loc) => id === loc.id)
}

function deleteLoc(id) {
    const locIndex = getLocById(id)
    gLocs.splice(locIndex,1)
    locStorage.saveToStorage(STORAGE_KEY, gLocs)
}

function getCityByCoords(lat, lng, name) {
    console.log('lat, lng', lat, lng)
    var newLoc = _saveLoc(name, lat, lng)
    gLocs.push(newLoc)
    locStorage.saveToStorage(STORAGE_KEY, gLocs)
    console.log('gLocs', gLocs)
    console.log(newLoc)
}

function _saveLoc(name, lat, lng) {
    return {
        id: utilService.makeId(),
        name,
        lat,
        lng,
        createdAt: utilService.getDate(),
    }
}


function showLocation(position) {
    console.log(position)

    const currLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    }
    console.log('sss', currLocation)
    const map = new google.maps.Map(document.querySelector("#map"), {
        zoom: 10,
        center: currLocation,
    });
    const marker = new google.maps.Marker({
        position: currLocation,
        map: map,
    });

}

function handleLocationError(error) {
    var locationError = document.getElementById("locationError");

    switch (error.code) {
        case 0:
            locationError.innerHTML = "There was an error while retrieving your location: " + error.message;
            break;
        case 1:
            locationError.innerHTML = "The user didn't allow this page to retrieve a location.";
            break;
        case 2:
            locationError.innerHTML = "The browser was unable to determine your location: " + error.message;
            break;
        case 3:
            locationError.innerHTML = "The browser timed out before retrieving the location.";
            break;
    }
}