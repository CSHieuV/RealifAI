import React from 'react';
import ReactStreetview from 'react-streetview';
import getGoogleMapsAPIKey from './ApiKeys'
import {AppBar, IconButton, Toolbar} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Typography from "@mui/material/Typography";
import {ArrowBack} from "@mui/icons-material";
import {marker_ind} from "./OverallMapsPage";
import {markers} from "./SearchPage";
import { useNavigate } from 'react-router-dom';

function DescriptionBar() {
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton href={'.'} edge="start" color="inherit" aria-label="home">
                    <HomeIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    NLPRealEstate
                </Typography>
                <Typography variant="p" component="div" sx={{ flexGrow: 1, marginLeft:2, marginRight:2 }}>
                    {markers[marker_ind].description}
                </Typography>
                <IconButton edge="end" color="inherit" aria-label="back"
                onClick={(e) => navigate('/maps_overall')}>
                    <ArrowBack />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default function StreetViewPage() {
    const googleMapsApiKey = getGoogleMapsAPIKey()
    // see https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewPanoramaOptions
    const streetViewPanoramaOptions = {
        position: {lat: markers[marker_ind].latitude, lng: markers[marker_ind].longitude},
        pov: {heading: 100, pitch: 0},
        zoom: 1
    };

    return (
        <div style={{
            width: '100%',
            height: '91.3vh',
            backgroundColor: '#eeeeee'
        }}>
            <DescriptionBar/>
            <ReactStreetview
                apiKey={googleMapsApiKey}
                streetViewPanoramaOptions={streetViewPanoramaOptions}
            />
        </div>
    );
}