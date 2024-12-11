import React, { useContext } from 'react';
import { View, Text, StyleSheet, Switch, Button } from 'react-native';
import { UserContext } from '../context/UserContext'; 

function ConfiguracionScreen() {
    const { isHighContrast, toggleHighContrast, fontSize, increaseFontSize, decreaseFontSize } = useContext(UserContext);

    return (
        <View style={[styles.container, isHighContrast && styles.highContrastContainer]}>
            <Text style={[styles.title, isHighContrast && styles.highContrastText]}>
                Configuración
            </Text>

            <View style={styles.optionContainer}>
                <Text style={[styles.text, isHighContrast && styles.highContrastText]}>
                    Modo Noche
                </Text>
                <Switch
                    value={isHighContrast}
                    onValueChange={toggleHighContrast}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isHighContrast ? '#f5dd4b' : '#f4f3f4'}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#204C68',  
        padding: 20,
    },
    highContrastContainer: {
        backgroundColor: '#333', 
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',  
    },
    highContrastText: {
        color: '#c2c4c4',  
    },
    text: {
        fontSize: 16,
        color: '#fff',  
    },
    optionContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    fontSizeControls: {
        flexDirection: 'row',
        marginLeft: 10,
    },
});

export default ConfiguracionScreen;
