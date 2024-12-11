import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext'; 
import { logoutUser } from '../config/firebaseConfig'; 

function Sidebar({ isVisible, toggleSidebar }) {
    const navigation = useNavigation();
    const { isHighContrast } = useContext(UserContext); 

    if (!isVisible) return null;

    const handleLogout = async () => {
        try {
            await logoutUser();
            toggleSidebar(); 
            navigation.navigate('Login'); 
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={toggleSidebar}>
            <View style={[styles.overlay, isHighContrast && styles.highContrastOverlay]}>
                <TouchableWithoutFeedback>
                    <View style={[styles.sidebar, isHighContrast && styles.highContrastSidebar]}>
                        <View style={styles.header}>
                            <Text style={[styles.title, isHighContrast && styles.highContrastText]}>Menú</Text>
                            <View style={styles.avatarContainer}>
                                <Image
                                    source={require('../assets/logo.png')}
                                    style={styles.avatar}
                                />
                            </View>
                        </View>

                        <TouchableOpacity 
                            style={[styles.menuItem, isHighContrast && styles.highContrastMenuItem]} 
                            onPress={() => {
                                toggleSidebar();
                                navigation.navigate('Perfil');
                            }}
                        >
                            <Text style={[styles.menuText, isHighContrast && styles.highContrastText]}>Perfil</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.menuItem, isHighContrast && styles.highContrastMenuItem]} 
                            onPress={() => {
                                toggleSidebar();
                                navigation.navigate('Configuracion');
                            }}
                        >
                            <Text style={[styles.menuText, isHighContrast && styles.highContrastText]}>Configuración</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.menuItem, isHighContrast && styles.highContrastMenuItem]} 
                            onPress={() => {
                                toggleSidebar();
                                navigation.navigate('MisReportes');
                            }}
                        >
                            <Text style={[styles.menuText, isHighContrast && styles.highContrastText]}>Mis Reportes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.menuItem, isHighContrast && styles.highContrastMenuItem]} 
                            onPress={handleLogout}
                        >
                            <Text style={[styles.menuText, isHighContrast && styles.highContrastText]}>Cerrar Sesión</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    highContrastOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    },
    sidebar: {
        width: '70%',
        backgroundColor: '#204C68',
        padding: 25,
        height: '100%',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    highContrastSidebar: {
        backgroundColor: '#333',  
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#E1E8ED',
        paddingBottom: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#E1E8ED',
        textAlign: 'center',
    },
    highContrastText: {
        color: '#000000',
    },
    avatarContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    menuItem: {
        marginVertical: 12,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#3A9AD9',
        borderRadius: 8,
    },
    highContrastMenuItem: {
        backgroundColor: '#555', 
    },
    menuText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: '600',
    },
});

export default Sidebar;
