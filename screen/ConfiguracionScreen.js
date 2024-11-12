import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ConfiguracionScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Configuración</Text>
            <Text style={styles.text}>Esta sera la pantalla de configuración</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
    },
});

export default ConfiguracionScreen;
