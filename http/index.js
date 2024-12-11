import { auth, database } from '../config/firebaseConfig'; 
import { ref, push, get, set, update  } from 'firebase/database'; 
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
            likes: 0, 
            likesByUser: {} 
        };

        await push(ref(database, 'reportes'), taskWithUser);
        console.log('Reporte guardado en Firebase con datos del usuario');
    } catch (error) {
        console.error('Error al guardar reporte:', error);
    }
}


// actualizar el avatar 
export async function updateUserAvatarInFirebase(userId, newAvatarUrl) {
    try {
        const userRef = ref(database, `users/${userId}`);
        await update(userRef, { avatar: newAvatarUrl });
        console.log('Avatar actualizado con éxito');
    } catch (error) {
        console.error('Error al actualizar avatar en Firebase:', error);
        throw error;
    }
}

// ELIMINAR
export function removeReporte(id) {
    return axios.delete(`${URL}/reportes/${id}.json`);
}

// EDITAR
export function updateReporte(id, task) {
    const reporteRef = ref(database, `reportes/${id}`);
    return set(reporteRef, task);  
}



// OBTENER DESDE BASE DE DATOS
export async function getReportes() {
    try {
        const response = await axios.get(`${URL}/reportes.json`);
        const reportes = [];

        for (const key in response.data) {
            const report = response.data[key];
            const userUid = report.user?.id;  
            const userAvatar = userUid ? await getAvatarFromUser(userUid) : "https://via.placeholder.com/50";

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
                    avatar: userAvatar, 
                },
                likes: report.likes || 0,
                likesByUser: report.likesByUser || {}, 
            };

            reportes.push(obj);
        }

        return reportes.reverse();
    } catch (error) {
        console.error("Error al obtener reportes:", error);
        throw error;
    }
}


async function getAvatarFromUser(uid) {
    try {
        const response = await axios.get(`${URL}/users/${uid}.json`);
        const userData = response.data;

        
        return userData?.avatar || "https://via.placeholder.com/150";
    } catch (error) {
        console.error("Error al obtener el avatar del usuario:", error);
        return "https://via.placeholder.com/150"; 
    }
}



export async function getMisReportes(currentUser) {
    try {
        const response = await axios.get(`${URL}/reportes.json`);
        const reportes = [];

        for (const key in response.data) {
            const report = response.data[key];

           
            if (report.user?.id === currentUser.uid) {
                const userUid = report.user?.id;

                
                const userAvatar = userUid ? await getAvatarFromUser(userUid) : "https://via.placeholder.com/50";

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
                        avatar: userAvatar,
                    },
                    likes: report.likes || 0,
                    likesByUser: report.likesByUser || {},
                };

                reportes.push(obj);
            }
        }

        return reportes.reverse(); 
    } catch (error) {
        console.error("Error al obtener los reportes del usuario:", error);
        throw error;
    }
}
