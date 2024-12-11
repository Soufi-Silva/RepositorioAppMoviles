import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import IconButton from './IconButton'; 
import { UserContext } from '../context/UserContext'; 

const Footer = ({ navigation }) => {
    const { isHighContrast, fontSize } = useContext(UserContext); 

    return (
        <View style={[styles.footer, { backgroundColor: isHighContrast ? '#000' : '#204C68' }]}>
            <IconButton 
                name="home" 
                color={isHighContrast ? 'white' : 'white'}  
                onPress={() => navigation.navigate('ReportesScreen')} 
                style={{ fontSize }} 
            />
            <IconButton 
                name="add" 
                color={isHighContrast ? 'white' : 'white'}  
                onPress={() => navigation.navigate('NewReporte')} 
                style={{ fontSize }} 
            />
            <IconButton 
                name="person" 
                color={isHighContrast ? 'white' : 'white'}  
                onPress={() => navigation.navigate('Perfil')} 
                style={{ fontSize }} 
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
    },
});

export default Footer;
