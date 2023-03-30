import Figure from 'react-bootstrap/Figure';
import { Button } from 'react-bootstrap';
import { useMemo } from 'react';
import styles from '../GMapComponent/GMapComponent.module.css'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';


export const GMapComponent = () => {
    const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyDLF9564iHLcICYZCN070CqwQoir-4pAOo" })
    const center = useMemo(() => ({ lat: 42.866727397, lng: 25.493093396111 }), [])

    if (!isLoaded) {
        return (<div>Loading...</div>)
    }

    return <GoogleMap
        zoom={15}
        center={center}
        mapContainerClassName={styles.map}>
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
        />
    </GoogleMap>

}
