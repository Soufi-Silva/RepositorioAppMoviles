import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { UserContext } from '../context/UserContext'; 
import { getMisReportes } from '../http'; 
import Footer from '../components/Footer'; 

function MisReportesScreen({ navigation }) {  
    const { user } = useContext(UserContext); 
    const [misReportes, setMisReportes] = useState([]);

    useEffect(() => {
        const fetchReportes = async () => {
            if (user) {
                try {
                    const reportes = await getMisReportes(user); 
                    setMisReportes(reportes); 
                } catch (error) {
                    console.error('Error al cargar los reportes:', error);
                }
            }
        };

        fetchReportes(); 
    }, [user]); 

    if (misReportes.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={[styles.title, styles.whiteText]}>Mis Reportes</Text>
                <Text style={styles.text}>Aún no has realizado reportes.</Text>
                <Footer navigation={navigation} /> 
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.title, styles.whiteText]}>Mis Reportes</Text>
            <FlatList
                data={misReportes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.reportCard}>
            
                        {item.imageUrl ? (
                            <Image
                                source={{ uri: item.imageUrl }}
                                style={styles.reportImage}
                            />
                        ) : (
                            <View style={styles.reportImagePlaceholder}></View>
                        )}
                        
                        <Text style={styles.reportTitle}>{item.name}</Text>
                        <Text style={styles.reportDate}>{new Date(item.date).toLocaleString()}</Text>
                        <Text style={styles.reportLocation}>{item.location.name}</Text>
                    </View>
                )}
            />
            <Footer navigation={navigation} /> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#204C68',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    whiteText: {
        color: 'white', 
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
    },
    reportCard: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    reportImage: {
        width: '100%',
        height: 200, 
        borderRadius: 8,
        marginBottom: 10,
    },
    reportImagePlaceholder: {
        width: '100%',
        height: 200, 
        backgroundColor: '#e0e0e0', 
        borderRadius: 8,
        marginBottom: 10,
    },
    reportTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    reportDate: {
        fontSize: 14,
        color: '#6c757d',
    },
    reportLocation: {
        fontSize: 14,
        color: '#6c757d',
    },
});

export default MisReportesScreen;
