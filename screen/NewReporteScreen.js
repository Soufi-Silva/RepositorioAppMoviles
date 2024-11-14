import React from 'react';
import { View } from 'react-native';
import NewReporte from '../components/NewReporte';


function NewReporteScreen({ navigation }) {
    return (
        <View style={{ flex: 1 }}>
            <NewReporte 
                onAddReporte={() => navigation.navigate('ReportesScreen')} 
            />
        </View>
        
    );
}

export default NewReporteScreen;
