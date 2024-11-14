import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { saveReporte } from '../http';
import { LocationContext } from '../context/LocationContext';
import ImageUploader from '../components/ImageUploader';
import Footer from "../components/Footer";

function NewReporte({ onAddReporte }) {
    const [name, setName] = useState('');
    const { location, setLocation } = useContext(LocationContext);
    const [imageUrl, setImageUrl] = useState('');
    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        if (route.params?.pickedLocation) {
            setLocation(route.params.pickedLocation);
        }
    }, [route.params]);

    async function handleAddReporte() {
        if (!name || !location || !imageUrl) {
            alert('Por favor, descripción, ubicación e imagen son requeridos.');
            return;
        }

        const newReporte = {
            id: Date.now().toString(),
            name,
            date: new Date().toISOString(),
            location,
            imageUrl
        };

        try {
            await saveReporte(newReporte);
            if (onAddReporte) {
                onAddReporte(newReporte); 
            }
            navigation.navigate('ReportesScreen'); 
            setLocation(null);
        } catch (error) {
            console.error("Error al guardar el reporte:", error);
        }
    }

    function handleSelectLocation() {
        navigation.navigate('Map');
    }

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Text style={styles.text}>Nuevo Reporte</Text>
            <TextInput
                onChangeText={setName}
                value={name}
                style={styles.input}
                placeholder="Descripción de la incidencia"
                color="white"
            />
            <TouchableOpacity style={styles.button} onPress={handleSelectLocation}>
                <Text style={styles.buttonText}>Seleccionar Ubicación</Text>
            </TouchableOpacity>
            {location && (
                <Text style={styles.locationText}>
                    Ubicación seleccionada: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </Text>
            )}
            <ImageUploader onUploadSuccess={setImageUrl} />
            <TouchableOpacity style={styles.button} onPress={handleAddReporte}>
                <Text style={styles.buttonText}>Guardar Reporte</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('ReportesScreen')}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <Footer navigation={navigation} /> 
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#204C68",
        paddingHorizontal: 20,
        paddingTop: 40, 
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    input: {
        padding: 12,
        borderWidth: 1,
        borderColor: "#5499c7",
        width: "90%",
        marginVertical: 10,
        backgroundColor: "#5499c7",
        borderRadius: 10,
        color: "white",
        fontSize: 16
    },
    text: {
        color: "#E1E8ED",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
    },
    button: {
        backgroundColor: "#5499c7",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginVertical: 10,
        width: "90%",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600"
    },
    locationText: {
        color: "#E1E8ED",
        fontSize: 14,
        marginTop: 12,
        paddingHorizontal: 20,
        textAlign: 'center'
    },
    cancelButton: {
        backgroundColor: "#FF4B4B",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginVertical: 10,
        width: "90%",
        alignItems: "center",
    },
});

export default NewReporte;
