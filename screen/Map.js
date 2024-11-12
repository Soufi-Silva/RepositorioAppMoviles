import React, { useContext, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { LocationContext } from '../context/LocationContext';

function Map({ navigation }) {
    const { setLocation } = useContext(LocationContext);
    const [selectedLocation, setSelectedLocation] = useState(null);

    function handleSelectLocation(event) {
        const location = {
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        };
        setSelectedLocation(location);
    }

    function handleConfirmLocation() {
        if (selectedLocation) {
            setLocation(selectedLocation); 
            navigation.goBack(); 
        }
    }

    const initialRegion = {
        latitude: -33.4489,
        longitude: -70.6693,
        latitudeDelta: 8.5,
        longitudeDelta: 8.5,
    };

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={initialRegion}
                onPress={handleSelectLocation}
            >
                {selectedLocation && (
                    <Marker
                        coordinate={{
                            latitude: selectedLocation.lat,
                            longitude: selectedLocation.lng,
                        }}
                    />
                )}
            </MapView>
            <View style={styles.buttonContainer}>
                <Button title="Confirmar Ubicación" onPress={handleConfirmLocation} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: '25%',
        right: '25%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default Map;
