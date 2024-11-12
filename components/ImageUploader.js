import React, { useState } from "react";
import { Button, Text, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImageUploader = ({ onUploadSuccess }) => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [url, setUrl] = useState('');

    const handleImageUpload = async () => {
        if (!image) {
            alert("Por favor, selecciona una imagen primero.");
            return;
        }

        try {
            setUploading(true);
            const result = await uploadImageToCloudinary(image.uri);
            if (result && result.secure_url) {
                setUrl(result.secure_url);
                onUploadSuccess(result.secure_url);
                setImage(null); 
            } else {
                alert("No se pudo obtener la URL de la imagen.");
            }
        } catch (error) {
            console.log("Error al subir la imagen", error);
            alert("Hubo un error al subir la imagen.");
        } finally {
            setUploading(false);
        }
    };

    const uploadImageToCloudinary = async (uri) => {
        const cloudName = "dp7chjr9b"; //datos de cloudinary
        const uploadPreset = "ml_default";
        const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

        const data = new FormData();
        data.append('file', {
            uri,
            type: 'image/jpeg',
            name: 'image.jpg',
        });
        data.append('upload_preset', uploadPreset);

        const response = await fetch(apiUrl, { method: 'POST', body: data });
        const responseData = await response.json();
        return responseData;
    };

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permission.granted) {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            });
            if (!result.canceled) {
                setImage(result.assets[0]);
            }
        } else {
            alert("Se necesita permiso para acceder a la galería.");
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Seleccionar Imagen" onPress={pickImage} style={styles.button} />
            {image && (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: image.uri }} style={styles.image} />
                    <Button title="Añadir Imagen" onPress={handleImageUpload} disabled={uploading} style={styles.button} />
                </View>
            )}
            {uploading && <Text>Cargando...</Text>}
            {url && (
                <View>
                    <Text style={styles.successMessage}>Imagen añadida</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 20,
    },
    button: {
        marginBottom: 10, 
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 10, 
    },
    successMessage: {
        color: 'white', 
        fontSize: 16,
        marginTop: 10,
    },
});

export default ImageUploader;
