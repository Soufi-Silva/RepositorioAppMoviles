import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function PerfilScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Perfil</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    }
});

export default PerfilScreen;
