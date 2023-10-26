import { useMemo } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

import classes from './GoogleMap.module.css';

export type mapProps = {
    lat: number,
    lng: number;
}

const Map: React.FC<{ coordinate: mapProps }> = (props) => {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyB6a2MFVneZ0UXjzQmklYb2gHU6d3ASxTE"
    })

    if (!isLoaded) return <div>Loading...</div>
    return <MapComponent coordinates={props.coordinate} />;
}

const MapComponent: React.FC<{ coordinates: mapProps }> = (props) => {

    const center = useMemo(() => ({ lat: props.coordinates.lat, lng: props.coordinates.lng }), [props.coordinates.lat, props.coordinates.lng])
    return <GoogleMap zoom={15} center={center} mapContainerClassName={classes.mapSize}>
        <MarkerF position={center}></MarkerF>
    </GoogleMap>

}

export default Map;