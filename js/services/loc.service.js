export const locService = {
    getLocs,
    getCityByCoords,
    showLocation,
    handleLocationError

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
    console.log('gLocs', gLocs)
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
        id: _makeId(),
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