import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import React, { useState } from "react";
import "./OverallMapsPage.css";
import getGoogleMapsAPIKey from "./ApiKeys";
import {markers, query} from "./SearchPage.js"
import {useNavigate} from "react-router-dom";
import {AppBar, IconButton, Toolbar} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Typography from "@mui/material/Typography";

export let marker_ind = 0;

const App = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: getGoogleMapsAPIKey(),
  });
  const [mapRef, setMapRef] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();
  const navigate = useNavigate();

  function QueryBar() {
    return (
        <AppBar position="static">
          <Toolbar>
            <IconButton href={'.'} edge="start" color="inherit" aria-label="home">
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              NLPRealEstate
            </Typography>
            <Typography variant="p" component="div" sx={{ flexGrow: 1, marginLeft:10, marginRight:10}}>
              {query}
            </Typography>
          </Toolbar>
        </AppBar>
    );
  }

  // const markers = [
  //   {
  //       "latitude": 47.5112,
  //       "longitude": -122.257,
  //       "other_data": {
  //           "FIREPLACES": "nan",
  //           "KITCHENS": "nan",
  //           "ROOMS": "nan",
  //           "STYLE": "nan",
  //           "Yr_changed": "nan",
  //           "bathrooms": "1.0",
  //           "bedrooms": "3",
  //           "ocean_proximity": "0",
  //           "price": "221900.0",
  //           "sqft_living": "1180",
  //           "yr_changed": "1955.0"
  //       }
  //   },
  //   {
  //       "latitude": 47.721,
  //       "longitude": -122.319,
  //       "other_data": {
  //           "FIREPLACES": "nan",
  //           "KITCHENS": "nan",
  //           "ROOMS": "nan",
  //           "STYLE": "nan",
  //           "Yr_changed": "nan",
  //           "bathrooms": "2.25",
  //           "bedrooms": "3",
  //           "ocean_proximity": "0",
  //           "price": "538000.0",
  //           "sqft_living": "2570",
  //           "yr_changed": "1991.0"
  //       }
  //   },
  // ]

  const onMapLoad = (map) => {
    setMapRef(map);
    const bounds = new window.google.maps.LatLngBounds();
    markers?.forEach(({ latitude, longitude }) => bounds.extend({ lat:latitude, lng:longitude }));
    map.fitBounds(bounds);
  };

  const handleMarkerClick = (id, latitude, longitude) => {
    mapRef?.panTo({ lat:latitude, lng:longitude });
    setInfoWindowData({ id });
    setIsOpen(true);
  };

  const style = {
      maxWidth: "100%",
      maxHeight: "91.3vh"
  }

  return (
    <div className="App">
      <QueryBar />
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap mapContainerStyle={style}
          mapContainerClassName="map-container"
          onLoad={onMapLoad}
          onClick={() => setIsOpen(false)}
        >
          {markers.map(({ latitude, longitude }, ind) => (
            <MarkerF
              key={ind}
              position={{ lat:latitude, lng:longitude }}
              defaultClickable={false}
              onClick={() => {
                handleMarkerClick(ind, latitude, longitude);
              }}
            >
              {isOpen && infoWindowData?.id === ind && (
                <InfoWindow
                  onCloseClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <div>
                    <h1>Property at {longitude} {latitude}</h1>
                    <p>Price: ${markers[ind].other_data.price}</p>
                    <p>Bedrooms: {markers[ind].other_data.bedrooms} bedrooms</p>
                    <p>Square Footage: {markers[ind].other_data.sqft_living} feet squared</p>
                    <a style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={()=>{
                      console.log("clicked lat" + latitude + " long: " + longitude);
                      marker_ind = ind;
                      navigate("/street_view");
                    }}>Click to view!</a>
                  </div>
                </InfoWindow>
              )}
            </MarkerF>
          ))}
        </GoogleMap>

      )}
    </div>
  );
};

export default App;