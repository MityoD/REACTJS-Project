const clearLocation = () => {
    if (localStorage.getItem("Lat") != null) {
        localStorage.removeItem("Lat");
        localStorage.removeItem("Lng");
    }
}

const getLocation = () => {
    if (!navigator.geolocation) {
        alert('Geolocation API not supported by this browser.');
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}
const success = (position) => {
    localStorage.setItem("Lat", position.coords.latitude);
    localStorage.setItem("Lng", position.coords.longitude);
}
const error = () => {
    alert("Geolocation permission has been blocked as the user has dismissed the permission prompt several times. This can be reset in Page Info which can be accessed by clicking the lock icon next to the URL.");
    document.getElementById("location").checked = false;
}

export const shareLocation = (switchElement) => {
    if (switchElement.checked) {
        getLocation();
    } else {
        clearLocation();
    }
}

export const userCoordinates = () => {
    if (localStorage.getItem("Lat") !== null) {
        const _lat = localStorage.getItem("Lat");
        const _lng = localStorage.getItem("Lng");
        const location = { lat: Number(_lat), lng: Number(_lng) };
        return location
    }
    return false;
}
