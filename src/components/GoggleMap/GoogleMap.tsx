import { useMemo } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

import classes from './GoogleMap.module.css';

export default function Map() {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyB6a2MFVneZ0UXjzQmklYb2gHU6d3ASxTE"
    })

    if (!isLoaded) return <div>Loading...</div>
    return <MapComponent />;
}

function MapComponent() {

    const center = useMemo(() => ({ lat: 42.654712, lng: 23.315988 }), [])
    return <GoogleMap zoom={14} center={center} mapContainerClassName={classes.mapSize}>
        <MarkerF position={center}></MarkerF>
    </GoogleMap>

}