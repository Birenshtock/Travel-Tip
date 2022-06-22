export const locService = {
    getLocs,
    getCityByCoords
}


const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function getCityByCoords(lat, lng) {
    console.log('lat, lng', lat, lng)
}

function _saveLoc(name, lat, lng, updatedAt) {
    return {
        id: _makeId(),
        name,
        lat,
        lng,
        createdAt,
        updatedAt
    }
}

function getGeoLocInfo(placeId) {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyCz94MTPax3HBc_be3l_LOjwbB8oS0tB48'
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}
    &key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}