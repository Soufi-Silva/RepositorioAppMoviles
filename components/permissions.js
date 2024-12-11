import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";

export async function requestPermissions() {
    try {
        
        const locationPermission = await Location.requestForegroundPermissionsAsync();
        if (locationPermission.status !== "granted") {
            throw new Error("Permiso de ubicación denegado.");
        }

        
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        if (!cameraPermission.granted) {
            throw new Error("Permiso de cámara denegado.");
        }

        
        const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!galleryPermission.granted) {
            throw new Error("Permiso de galería denegado.");
        }

        return true;
    } catch (error) {
        console.error("Error al solicitar permisos:", error.message);
        return false; 
    }
}
