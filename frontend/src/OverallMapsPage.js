import {
    GoogleMap,
    InfoWindow,
    MarkerF,
    useLoadScript,
  } from "@react-google-maps/api";
  import { useState } from "react";
  import "./OverallMapsPage.css";
  import getGoogleMapsAPIKey from "./ApiKeys";
  import { markers } from "./SearchPage.js"
  
  const App = () => {
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: getGoogleMapsAPIKey(),
    });
    const [mapRef, setMapRef] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [infoWindowData, setInfoWindowData] = useState();
    const markers = [
        {
            "latitude": 47.5112,
            "longitude": -122.257,
            "other_data": {
                "FIREPLACES": "nan",
                "KITCHENS": "nan",
                "ROOMS": "nan",
                "STYLE": "nan",
                "Yr_changed": "nan",
                "bathrooms": "1.0",
                "bedrooms": "3",
                "ocean_proximity": "0",
                "price": "221900.0",
                "sqft_living": "1180",
                "yr_changed": "1955.0"
            }
        },
        {
            "latitude": 47.721,
            "longitude": -122.319,
            "other_data": {
                "FIREPLACES": "nan",
                "KITCHENS": "nan",
                "ROOMS": "nan",
                "STYLE": "nan",
                "Yr_changed": "nan",
                "bathrooms": "2.25",
                "bedrooms": "3",
                "ocean_proximity": "0",
                "price": "538000.0",
                "sqft_living": "2570",
                "yr_changed": "1991.0"
            }
        },
        {
            "latitude": 47.7379,
            "longitude": -122.233,
            "other_data": {
                "FIREPLACES": "nan",
                "KITCHENS": "nan",
                "ROOMS": "nan",
                "STYLE": "nan",
                "Yr_changed": "nan",
                "bathrooms": "1.0",
                "bedrooms": "2",
                "ocean_proximity": "0",
                "price": "180000.0",
                "sqft_living": "770",
                "yr_changed": "1933.0"
            }
        },
        {
            "latitude": 47.5208,
            "longitude": -122.393,
            "other_data": {
                "FIREPLACES": "nan",
                "KITCHENS": "nan",
                "ROOMS": "nan",
                "STYLE": "nan",
                "Yr_changed": "nan",
                "bathrooms": "3.0",
                "bedrooms": "4",
                "ocean_proximity": "0",
                "price": "604000.0",
                "sqft_living": "1960",
                "yr_changed": "1965.0"
            }
        },
        {
            "latitude": 47.6168,
            "longitude": -122.045,
            "other_data": {
                "FIREPLACES": "nan",
                "KITCHENS": "nan",
                "ROOMS": "nan",
                "STYLE": "nan",
                "Yr_changed": "nan",
                "bathrooms": "2.0",
                "bedrooms": "3",
                "ocean_proximity": "0",
                "price": "510000.0",
                "sqft_living": "1680",
                "yr_changed": "1987.0"
            }
        },
        {
            "latitude": 47.6561,
            "longitude": -122.005,
            "other_data": {
                "FIREPLACES": "nan",
                "KITCHENS": "nan",
                "ROOMS": "nan",
                "STYLE": "nan",
                "Yr_changed": "nan",
                "bathrooms": "4.5",
                "bedrooms": "4",
                "ocean_proximity": "0",
                "price": "1225000.0",
                "sqft_living": "5420",
            }
        }
    ]

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
  
    return (
      <div className="App">
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            mapContainerClassName="map-container"
            onLoad={onMapLoad}
            onClick={() => setIsOpen(false)}
          >
            {markers.map(({ latitude, longitude }, ind) => (
              <MarkerF
                key={ind}
                position={{ lat:latitude, lng:longitude }}
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
                    <h3>{infoWindowData.id}</h3>
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