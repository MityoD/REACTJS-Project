export const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    resolve(userLocation);
                },
                (error) => {
                    document.getElementById("location").checked = false;
                    alert(error.message + '\nGeolocation permission has been blocked as the user has dismissed the permission prompt several times. This can be reset in Page Info which can be accessed by clicking the lock icon next to the URL.');
                    resolve(false);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            resolve(false);
        }
    });
};