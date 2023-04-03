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
    document.getElementById("location").checked = false; //??
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

export const isLocated = Boolean(localStorage.getItem("Lat"))
// function loadMarkers() {

//     var isLocated = Boolean(localStorage.getItem("Lat"));
//     var select = document.getElementById("office");
//     var values = select.options;
//     var count = values.length;

//     if (count == 0) {
//         alert("Select city..");
//         return false;
//     }

//     var data = values[0].value.split("-");
//     var zoom;

//     switch (true) {
//         case (count < 5):
//             zoom = 14
//             break;
//         case (count < 10):
//             zoom = 13
//             break;
//         default:
//             zoom = 12
//     }

//     var center = { lat: Number(data[0]), lng: Number(data[1]) };

//     if (isLocated) {
//         var _lat = localStorage.getItem("Lat");
//         var _lng = localStorage.getItem("Lng");
//         center = { lat: Number(_lat), lng: Number(_lng) };
//         zoom = 14;
//     }

//     const map = new google.maps.Map(document.getElementById("map"), {
//         zoom: zoom,
//         center: center,
//     });

//     if (isLocated) {
//         const svgMarker = {
//             path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
//             fillColor: "blue",
//             fillOpacity: 0.6,
//             strokeWeight: 0,
//             rotation: 0,
//             scale: 2,
//             anchor: new google.maps.Point(15, 30),
//         };
//         var marker = new google.maps.Marker({
//             position: center,
//             map: map,
//             icon: svgMarker,
//             title: "You are here.",
//         });
//     }


//     for (var i = 0; i < count; i++) {
//         var data = values[i].value.split("-");
//         var title = data[2].split(' ').slice(2).join(' ');
//         var marker = new google.maps.Marker({
//             position: { lat: Number(data[0]), lng: Number(data[1]) },
//             map: map,
//             title: title,
//         });
//     }
// }