import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text } from 'react-native';
import ReportesScreen from './screen/ReportesScreen';
import PerfilScreen from './screen/PerfilScreen';      
import ConfiguracionScreen from './screen/ConfiguracionScreen';
import MisReportesScreen from './screen/MisReportesScreen';
import ChatsScreen from './screen/ChatsScreen';
import ReporteEditScreen from './screen/ReporteEditScreen';
import NewReporteScreen from './screen/NewReporteScreen';  
import Map from './screen/Map'; 
import Sidebar from './components/sideBar';
import ReporteContextProvider from './store/reporte-context';
import { LocationProvider } from './context/LocationContext';

const Stack = createStackNavigator();

export default function App() {
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    return (
        <>
            <StatusBar style="dark" />
            <LocationProvider>
                <ReporteContextProvider>
                    <NavigationContainer>
                        <Stack.Navigator
                            screenOptions={{
                                headerRight: () => (
                                    <TouchableOpacity onPress={toggleSidebar} style={{ marginRight: 10 }}>
                                        <Text style={{ fontSize: 18 }}>☰</Text>
                                    </TouchableOpacity>
                                ),
                            }}
                        >
                            <Stack.Screen name="ReportesScreen" component={ReportesScreen} />
                            <Stack.Screen name="Reporte" component={ReportesScreen} />
                            <Stack.Screen name="Edit" component={ReporteEditScreen} />
                            <Stack.Screen name="NewReporte" component={NewReporteScreen} />
                            <Stack.Screen name="Map" component={Map} /> 
                            <Stack.Screen name="Perfil" component={PerfilScreen} />
                            <Stack.Screen name="Configuracion" component={ConfiguracionScreen} />
                            <Stack.Screen name="MisReportes" component={MisReportesScreen} />
                            <Stack.Screen name="Chats" component={ChatsScreen} />
                        </Stack.Navigator>
                        <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
                    </NavigationContainer>
                </ReporteContextProvider>
            </LocationProvider>
        </>
    );
}
