import React, { useState } from 'react';
import { Button, View, Alert, Text } from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

function LocationPicker({ onLocationSelected }) {
    const [location, setLocation] = useState(null);
    const navigation = useNavigation();

    async function verifyPermissions() {  //no se porque no entra a pedir los permisos, ver mas adelante no olvidar
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permiso denegado', 'Se necesita el permiso de ubicación.');
            return false;
        }
        return true; //falta revisar abajo porque el boton de "Usar ubicación del dispositivo"" ya no aparece y lo tenia funcionando,para la ubicacion en el momento
    }
    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) return;

        const currentLocation = await Location.getCurrentPositionAsync({ timeout: 5000 });
        const selectedLocation = {
            lat: currentLocation.coords.latitude,
            lng: currentLocation.coords.longitude,
        };
        setLocation(selectedLocation);
        onLocationSelected(selectedLocation); 
    }

    function pickOnMapHandler() { 
        navigation.navigate('Map', {
            onLocationSelected: onLocationSelected, 
        });
    }

    return (
        <View>
            <Button title="Usar ubicación del dispositivo" onPress={getLocationHandler} />  
            <Button title="Seleccionar en el mapa" onPress={pickOnMapHandler} />
            {location && <Text>Ubicación seleccionada: {location.lat}, {location.lng}</Text>}
        </View>
    );
}

export default LocationPicker;
