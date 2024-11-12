import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ChatsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chats</Text>
            <Text style={styles.text}>Esta es la pantalla de chats.</Text>
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

export default ChatsScreen;
