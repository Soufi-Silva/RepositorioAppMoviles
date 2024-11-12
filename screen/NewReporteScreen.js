import React from 'react';
import { View } from 'react-native';
import NewReporte from '../components/NewReporte';


function NewReporteScreen({ navigation }) {
    return (
        <View style={{ flex: 1 }}>
            <NewReporte 
                onAddReporte={() => navigation.navigate('ReportesScreen')} // Navegar a ReportesScreen al agregar reporte
            />
        </View>
        
    );
}

export default NewReporteScreen;
