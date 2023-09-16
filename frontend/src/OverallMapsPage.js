import {
    GoogleMap,
    InfoWindow,
    MarkerF,
    useLoadScript,
  } from "@react-google-maps/api";
  import { useState } from "react";
  import "./OverallMapsPage.css";
  import getGoogleMapsAPIKey from "./ApiKeys";
  
  const App = () => {
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: getGoogleMapsAPIKey(),
    });
    const [mapRef, setMapRef] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [infoWindowData, setInfoWindowData] = useState();
    const markers = [
      { address: "Address1", lat: 1, lng: 3 },
      { address: "Address2", lat: 2, lng: 2 },
      { address: "Address3", lat: 3, lng: 1 },
    ];
  
    const onMapLoad = (map) => {
      setMapRef(map);
      const bounds = new window.google.maps.LatLngBounds();
      markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
      map.fitBounds(bounds);
    };
  
    const handleMarkerClick = (id, lat, lng, address) => {
      mapRef?.panTo({ lat, lng });
      setInfoWindowData({ id, address });
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
            {markers.map(({ address, lat, lng }, ind) => (
              <MarkerF
                key={ind}
                position={{ lat, lng }}
                onClick={() => {
                  handleMarkerClick(ind, lat, lng, address);
                }}
              >
                {isOpen && infoWindowData?.id === ind && (
                  <InfoWindow
                    onCloseClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <h3>{infoWindowData.address}</h3>
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