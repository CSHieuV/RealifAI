import React, {useState} from 'react';
import ReactStreetview from 'react-streetview';
import getGoogleMapsAPIKey from './ApiKeys'
import {AppBar, IconButton, Toolbar} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Typography from "@mui/material/Typography";
import {ArrowBack} from "@mui/icons-material";
import {marker_ind} from "./OverallMapsPage";
import {markers} from "./SearchPage";
import { useNavigate } from 'react-router-dom';
import { query } from "./SearchPage";


function DescriptionBar(props) {
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
                    {props.description}
                </Typography>
                <IconButton edge="end" color="inherit" aria-label="back"
                onClick={(e) => navigate('/maps_overall')}>
                    <ArrowBack />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

function fetchFromBackend(house) {
    const apiURL = "http://localhost:5000/description_query?"
    console.log("fetching text: " + query + " house: " + JSON.stringify(house));
    return fetch(apiURL + new URLSearchParams({
        query_text: query,
        house: JSON.stringify(house)
    }), {
        options: 'GET',
    })
        .then(response => {
            console.log(response)
            return response.json()
        }).catch(error => {
            console.error('There was an error!', error);
        });
}

export default function StreetViewPage() {
    const googleMapsApiKey = getGoogleMapsAPIKey()
    // see https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewPanoramaOptions
    const [description, setDescription] = useState("Loading...");
    fetchFromBackend(markers[marker_ind].other_data).then(description_data => {
        console.log("fetched: " + description_data);
        setDescription(() => description_data["description"]);
        console.log(description)
    });

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
            <DescriptionBar description={description}/>
            <ReactStreetview
                apiKey={googleMapsApiKey}
                streetViewPanoramaOptions={streetViewPanoramaOptions}
            />
        </div>
    );
}