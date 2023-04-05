import { useState, useEffect } from 'react';
import styles from '../GMapComponent/GMapComponent.module.css'
import { GoogleMap, useLoadScript, Marker, MarkerClusterer, DirectionsRenderer } from '@react-google-maps/api';
import { Button } from 'react-bootstrap';
import { SphericalUtil } from "node-geometry-library";
import Form from 'react-bootstrap/Form'
import { shareLocation, userCoordinates } from '../../services/locationService';

export const GMapComponent = (
    { markers }
) => {
    var center = { lat: 42.866727397, lng: 25.493093396111 }

    const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyDLF9564iHLcICYZCN070CqwQoir-4pAOo" })
    const [distance, setDistance] = useState('0 km')
    const [duration, setDuration] = useState('0 mins')
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [isLocated, setIsLocated] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsLocated(userCoordinates())
        }, 200)
    }, [])

    const calculateRoute = async (selectedMarker) => {
        if (!isLocated || !isLoaded) return;
        const directionsService = new google.maps.DirectionsService() // eslint-disable-line no-undef

        const results = await directionsService.route({
            origin: isLocated,
            destination: selectedMarker,
            travelMode: google.maps.TravelMode.DRIVING, // eslint-disable-line no-undef
        })
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }

    const findClosestMarker = async () => {
        if (markers.length === 0 || !isLocated) return;
        var distances = [];
        var closest = -1;
        markers.forEach((latLng, index) => {
            var d = SphericalUtil.computeDistanceBetween(latLng, isLocated);
            distances[index] = d;
            if (closest === -1 || d < distances[closest]) {
                closest = index;
            }
        })
        calculateRoute(markers[closest])
    }

    if (!isLoaded) {
        return (<div>Loading...</div>)
    }

    var zoom;

    switch (true) {
        case (!!isLocated):
            zoom = 13
            break;
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

    const createKey = (location) => {
        return location.lat + location.lng
    }

    const componentTest = (target) => {
        shareLocation(target)
        setTimeout(() => {
            setIsLocated(userCoordinates())
        }, 200)
        if (target.checked) {
            return
        }
        setDirectionsResponse(null)
    }

    return (
        <div style={{ width: '100%' }}>
            <Form.Check
                style={{ backgroundColor: '#2c3034', color: 'white', height: '59px', fontSize: '18px', paddingTop: '13px', paddingLeft: '60px', marginBottom: '0' }}
                type="switch"
                id="location"
                label="Share your location to find the nearest Econt office"
                defaultChecked={!!userCoordinates()}
                onClick={(e) => componentTest(e.target)}
            />
            <GoogleMap
                options={{
                    mapTypeControl: false,
                    fullscreenControl: false,
                }}
                zoom={zoom}
                center={isLocated ? isLocated : markers[0] ? markers[0] : center}
                mapContainerClassName={styles.map}>
                {isLocated &&
                    <>
                        <div style={{ flexDirection: 'column', display: 'flex' }}>
                            <div style={{ marginTop: '', backgroundColor: 'lightgray', opacity: '0.9' }}>Distance: {distance} Duration: {duration} driving</div>
                            <div>
                                <Button className='pb-1 pt-1 m-1' variant='secondary' style={{ opacity: '0.8' }} onClick={findClosestMarker}>Find nearest office</Button>
                            </div>
                        </div>
                        <Marker
                            key={'user-location'}
                            position={isLocated}
                            animation={google.maps.Animation.DROP} // eslint-disable-line no-undef
                            icon={{
                                path: "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
                                fillColor: "yellow",
                                fillOpacity: 0.9,
                                scale: 2,
                                strokeColor: "gold",
                                strokeWeight: 2,
                            }} />
                    </>
                }
                {directionsResponse && (
                    <DirectionsRenderer directions={directionsResponse} />
                )}

                <MarkerClusterer averageCenter={true}>
                    {(clusterer) =>
                        markers.map((location) => (
                            <Marker onClick={(e) => calculateRoute({ lat: e.latLng.lat(), lng: e.latLng.lng() })} key={createKey(location)} position={location} clusterer={clusterer} />
                        ))
                    }
                </MarkerClusterer>
            </GoogleMap>
        </div>
    )
}