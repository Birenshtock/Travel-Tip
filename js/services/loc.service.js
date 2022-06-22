import { locStorage } from './locStorage.service.js'
import { utilService } from './utils.service.js'
export const locService = {
    getLocs,
    getCityByCoords
}

const STORAGE_KEY ='locsDB'

let gLocs = []

function getLocs() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(gLocs);
            }, 2000)
        });
    }


function getCityByCoords(lat, lng, name) {
        console.log('lat, lng', lat, lng)
        var newLoc = _saveLoc(name, lat, lng)
        gLocs.push(newLoc)
        locStorage.saveToStorage(STORAGE_KEY, gLocs)
        console.log('gLocs',gLocs)
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


// function getGeoLocInfo(placeId) {
//     if (window.google) return Promise.resolve()
//     const API_KEY = 'AIzaSyCz94MTPax3HBc_be3l_LOjwbB8oS0tB48'
//     var elGoogleApi = document.createElement('script');
//     elGoogleApi.src = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}
//     &key=${API_KEY}`;
//     elGoogleApi.async = true;
//     document.body.append(elGoogleApi);

//     return new Promise((resolve, reject) => {
//         elGoogleApi.onload = resolve;
//         elGoogleApi.onerror = () => reject('Google script failed to load')
//     })
// }