import React from 'react';
import { View, StyleSheet } from 'react-native';
import IconButton from './IconButton'; 

const Footer = ({ navigation }) => {
    return (
        <View style={styles.footer}>
            <IconButton 
                name="home" 
                color="white"  
                onPress={() => navigation.navigate('ReportesScreen')} 
            />
            <IconButton 
                name="add" 
                color="white"  
                onPress={() => navigation.navigate('NewReporte')} 
            />
            <IconButton 
                name="person" 
                color="white"  
                onPress={() => navigation.navigate('Perfil')} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        height: 50, 
        flexDirection: 'row', 
        justifyContent: "space-around", 
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#204C68", 
    },
});

export default Footer;
