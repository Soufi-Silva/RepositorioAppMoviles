import { auth, database } from '../config/firebaseConfig'; 
import { ref, push, get } from 'firebase/database'; 
import axios from 'axios';

const URL = 'https://appmoviles-9de8d-default-rtdb.firebaseio.com/';

// GUARDAR EN BASE DE DATOS
export async function saveReporte(task) {
    try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            throw new Error('Usuario no autenticado');
        }
        const userRef = ref(database, `users/${currentUser.uid}`);
        const userSnapshot = await get(userRef);

        if (!userSnapshot.exists()) {
            throw new Error('Datos del usuario no encontrados en la base de datos');
        }

        const userData = userSnapshot.val();

    
        const taskWithUser = {
            ...task,
            user: {
                id: currentUser.uid,
                username: userData.username,
                email: userData.email,
    
            },
        };

        await push(ref(database, 'reportes'), taskWithUser);
        console.log('Reporte guardado en Firebase con datos del usuario');
    } catch (error) {
        console.error('Error al guardar reporte:', error);
    }
}

// ELIMINAR
export function removeReporte(id) {
    return axios.delete(`${URL}/reportes/${id}.json`);
}

// EDITAR
export function updateReporte(id, task) {
    return axios.put(`${URL}/reportes/${id}.json`, task);
}

// OBTENER DESDE BASE DE DATOS

export async function getReportes() {
    try {
        const response = await axios.get(`${URL}/reportes.json`);
        const reportes = [];

        for (const key in response.data) {
            const report = response.data[key];

            const obj = {
                id: key,
                name: report.name,
                date: new Date(report.date),
                location: {
                    lat: report.location?.lat,
                    lng: report.location?.lng,
                },
                imageUrl: report.imageUrl,
                user: {
                    username: report.user?.username || "Usuario desconocido",
                    email: report.user?.email || "Correo no disponible",
                    avatar: report.user?.avatar || "https://via.placeholder.com/50",
                },
            };

            reportes.push(obj);
        }

        return reportes.reverse();
    } catch (error) {
        console.error("Error al obtener reportes:", error);
        throw error;
    }
}


