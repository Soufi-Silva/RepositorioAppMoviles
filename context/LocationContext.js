// LocationContext.js
import React, { createContext, useState, useEffect } from "react";
import * as Location from "expo-location";

export const LocationContext = createContext();

export function LocationProvider({ children }) {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        async function verifyPermissions() {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.error("Permiso de ubicación denegado.");
            }
        }
        verifyPermissions();
    }, []);

    return (
        <LocationContext.Provider value={{ location, setLocation }}>
            {children}
        </LocationContext.Provider>
    );
}
