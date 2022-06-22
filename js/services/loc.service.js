export const locService = {
    getLocs,
    getCityByCoords
}


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
    console.log('gLocs',gLocs)
    console.log(newLoc)
}

function _getDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return today = mm + '/' + dd + '/' + yyyy;
}



function _saveLoc(name, lat, lng) {
    return {
        id:  _makeId(),
        name,
        lat,
        lng,
        createdAt: _getDate() 
    }
}

function _makeId(length = 6) {
    // const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const possible = '0123456789'
    var txt = ''
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
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