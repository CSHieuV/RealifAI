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