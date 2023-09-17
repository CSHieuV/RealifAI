import React from 'react';
import ReactStreetview from 'react-streetview';
import getGoogleMapsAPIKey from './ApiKeys'

export default function StreetViewPage() {
    const googleMapsApiKey = getGoogleMapsAPIKey()
    // see https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewPanoramaOptions
    const streetViewPanoramaOptions = {
        position: {lat: 47.6168, lng: -122.045},
        pov: {heading: 100, pitch: 0},
        zoom: 1
    };

    return (
        <div style={{
            width: '100%',
            height: '100vh',
            backgroundColor: '#eeeeee'
        }}>
            <ReactStreetview
                apiKey={googleMapsApiKey}
                streetViewPanoramaOptions={streetViewPanoramaOptions}
            />
        </div>
    );
}