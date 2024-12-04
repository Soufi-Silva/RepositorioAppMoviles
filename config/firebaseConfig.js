import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDZMt2PcdeSOmIApobtnTbXaRRhkN4JgTY",
  authDomain: "appmoviles-9de8d.firebaseapp.com",
  databaseURL: "https://appmoviles-9de8d-default-rtdb.firebaseio.com",
  projectId: "appmoviles-9de8d",
  storageBucket: "appmoviles-9de8d.appspot.com",
  messagingSenderId: "657899678353",
  appId: "1:657899678353:web:64b1be91d2c064bd6f2d30"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const database = getDatabase(app);

export const registerUser = async (email, password, rut, username, avatarUrl) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const defaultAvatar = "https://via.placeholder.com/50";
    const avatar = avatarUrl || defaultAvatar;

    await set(ref(database, 'users/' + user.uid), {
      email: email,
      rut: rut,
      username: username,
      avatar: avatar, 
    });

    console.log('Usuario registrado exitosamente con avatar');
  } catch (error) {
    console.error('Error al registrar el usuario:', error.message);
    throw error;
  }
};


export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const db = getDatabase();
    const userRef = ref(db, 'users/' + user.uid);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      console.error('No se encontraron datos del usuario en la base de datos.');
      return;
    }

    const userData = snapshot.val();
    console.log('Usuario iniciado sesión exitosamente:', userData);

    return userData;
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    throw error;
  }
};
export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log('Usuario cerrado sesión exitosamente');
  } catch (error) {
    console.error('Error al cerrar sesión:', error.message);
    throw error;
  }
};

export { auth, database };
