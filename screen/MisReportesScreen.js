import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function MisReportesScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mis Reportes</Text>
            <Text style={styles.text}>Esta es la pantalla de mis reportes.</Text>
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

export default MisReportesScreen;
