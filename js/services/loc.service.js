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

function getCityByCoords(lat,lng) {
    console.log('lat, lng',lat, lng)
}

function _saveLoc(name, lat,lng,updatedAt ) {
    return {
        id: _makeId(),
        name, 
        lat,
         lng, 
         createdAt, 
         updatedAt}
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