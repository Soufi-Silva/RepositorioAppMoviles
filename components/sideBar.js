import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Sidebar({ isVisible, toggleSidebar }) {
    const navigation = useNavigation();

    if (!isVisible) return null;

    return (
        <TouchableWithoutFeedback onPress={toggleSidebar}>
            <View style={styles.overlay}>
                <TouchableWithoutFeedback>
                    <View style={styles.sidebar}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Menú</Text>
                            <View style={styles.avatarContainer}>
                                <Image
                                    source={require('../assets/logo.png')} //esto tenemos que cambiarlo sofi, cuando se haga todo el login
                                    style={styles.avatar}
                                />
                            </View>
                        </View>

                        <TouchableOpacity 
                            style={styles.menuItem} 
                            onPress={() => {
                                toggleSidebar();
                                navigation.navigate('Perfil');
                            }}
                        >
                            <Text style={styles.menuText}>Perfil</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.menuItem} 
                            onPress={() => {
                                toggleSidebar();
                                navigation.navigate('Configuracion');
                            }}
                        >
                            <Text style={styles.menuText}>Configuración</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.menuItem} 
                            onPress={() => {
                                toggleSidebar();
                                navigation.navigate('MisReportes');
                            }}
                        >
                            <Text style={styles.menuText}>Mis Reportes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.menuItem} 
                            onPress={() => {
                                toggleSidebar();
                                navigation.navigate('Chats');
                            }}
                        >
                            <Text style={styles.menuText}>Chats</Text>
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
        flex: 1,
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
    menuText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: '600',
    },
});

export default Sidebar;
