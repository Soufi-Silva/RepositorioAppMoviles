import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../config/firebaseConfig';
import { getDatabase, ref, get } from 'firebase/database';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                const db = getDatabase();
                const userRef = ref(db, 'users/' + currentUser.uid);
                const snapshot = await get(userRef);

                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    setUser({
                        uid: currentUser.uid,
                        email: currentUser.email,
                        username: userData.username,
                        rut: userData.rut,
                        avatar: userData.avatar || 'https://via.placeholder.com/100', 
                    });
                } else {
                    console.error('No se encontraron datos personalizados del usuario.');
                    setUser({
                        uid: currentUser.uid,
                        email: currentUser.email,
                        avatar: 'https://via.placeholder.com/100', 
                    });
                }
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
