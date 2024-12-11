import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../config/firebaseConfig';
import { getDatabase, ref, get } from 'firebase/database';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isHighContrast, setIsHighContrast] = useState(false);  
    const [fontSize, setFontSize] = useState(16);  

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
                        avatar: userData.avatar,
                    });
                }
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    
    const toggleHighContrast = () => {
        setIsHighContrast(prev => !prev);
    };
    

    
    const increaseFontSize = () => setFontSize(prev => Math.min(prev + 2, 30)); 

   
    const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 2, 10)); 

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            isHighContrast,
            toggleHighContrast,
            fontSize,
            increaseFontSize,
            decreaseFontSize
        }}>
            {children}
        </UserContext.Provider>
    );
};
