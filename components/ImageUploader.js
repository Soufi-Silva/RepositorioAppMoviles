import React, { useState } from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useCameraPermissions, PermissionStatus, launchCameraAsync } from 'expo-image-picker';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const ImageUploader = ({ onUploadSuccess }) => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [url, setUrl] = useState('');
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

    async function verifyPermission() {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            alert('Necesitas permisos de la cámara');
            return false;
        }
        return true;
    }

    const uploadImageToCloudinary = async (uri) => {
        const cloudName = "dp7chjr9b";
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

    const uploadAndSetImage = async (uri) => {
        try {
            setUploading(true);
            const result = await uploadImageToCloudinary(uri);
            if (result && result.secure_url) {
                setUrl(result.secure_url);
                onUploadSuccess(result.secure_url);
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

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
            return;
        }

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });

        if (!image.canceled) {
            setImage(image.assets[0]);
            await uploadAndSetImage(image.assets[0].uri);
        }
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
                await uploadAndSetImage(result.assets[0].uri);
            }
        } else {
            alert("Se necesita permiso para acceder a la galería.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={takeImageHandler} style={styles.button}>
                    <Icon name="camera" size={20} color="white" />
                    <Text style={styles.buttonText}>Tomar imagen</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={pickImage} style={styles.button}>
                    <Icon name="image" size={20} color="white" />
                    <Text style={styles.buttonText}>Seleccionar imagen de galería</Text>
                </TouchableOpacity>
            </View>

            {image && (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: image.uri }} style={styles.image} />
                </View>
            )}

            {uploading && <Text>Cargando...</Text>}
            {url && (
                <View>
                    <Text style={styles.successMessage}>Imagen subida con éxito</Text>
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
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#204C68",
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 1,
        marginHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10,
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 1,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 1,
    },
    successMessage: {
        color: 'white',
        fontSize: 16,
        marginTop: 10,
    },
});

export default ImageUploader;
