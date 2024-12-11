import * as Location from 'expo-location';

/**
 * @param {number} lat 
 * @param {number} lng 
 * @returns {Promise<string>}
 */

export async function reverseGeocode(lat, lng) {
    try {
        const [result] = await Location.reverseGeocodeAsync({
            latitude: lat,
            longitude: lng,
        });

        if (result) {
            return `${result.street || "Calle desconocida"}, ${result.city || "Ciudad desconocida"}, ${result.region || "Región desconocida"}, ${result.country || "País desconocido"}`;
        }

        return 'Ubicación desconocida';
    } catch (error) {
        console.error('Error al obtener la dirección:', error);
        return 'Ubicación desconocida';
    }
}

async function verifyPermissions() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        throw new Error('Permiso de ubicación denegado.');
    }
}




async function getLocation() {
    try {
        await verifyPermissions();
        const location = await Location.getCurrentPositionAsync();
        console.log('Ubicación obtenida:', location);
    } catch (error) {
        console.error('Error al obtener la ubicación:', error.message);
    }
}

