// import { useMemo } from 'react';
import styles from '../GMapComponent/GMapComponent.module.css'
import { GoogleMap, useLoadScript, Marker, MarkerClusterer } from '@react-google-maps/api';


export const GMapComponent = (
    { markers, sharedLocation }
) => {

    const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyDLF9564iHLcICYZCN070CqwQoir-4pAOo" })
    // const center = useMemo(() => ({ lat: 42.866727397, lng: 25.493093396111 }), [])
    var center = { lat: 42.866727397, lng: 25.493093396111 }

    if (!isLoaded) {
        return (<div>Loading...</div>)
    }

    var zoom;

    switch (true) {

        case (markers.length > 20):
            zoom = 11
            break;
        case (markers.length > 15):
            zoom = 12
            break;
        case (markers.length > 10):
            zoom = 13
            break;
        case (markers.length > 5):
            zoom = 14
            break;
        case (markers.length > 0):
            zoom = 16
            break;
        default:
            zoom = 6
    }

    function createKey(location) {
        return location.lat + location.lng
      }

    return <GoogleMap
        zoom={zoom}
        center={sharedLocation ? sharedLocation : markers[0] ? markers[0] : center}
        mapContainerClassName={styles.map}>

        <MarkerClusterer >
            {(clusterer) =>
                markers.map((location) => (
                    <Marker key={createKey(location)} position={location} clusterer={clusterer}/>
                ))
            }
        </MarkerClusterer>

        {/* 
        <Marker
            icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}

            // icon={{
            //     path:
            //         "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
            //     fillColor: "yellow",
            //     fillOpacity: 0.9,
            //     scale: 2,
            //     strokeColor: "gold",
            //     strokeWeight: 2,
            // }}
            position={{ lat: 42.866727397, lng: 25.493093396111 }}
        /> */}

    </GoogleMap>

}
