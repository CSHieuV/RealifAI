import React, { createContext, useState } from "react";

export const MarkersContext = createContext();

export const MarkersProvider = ({ children }) => {
    const [markers, setMarkers] = useState([]);

    return (
        <MarkersContext.Provider value={{ markers, setMarkers }}>
            {children}
        </MarkersContext.Provider>
    );
};
