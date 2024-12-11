import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../components/IconButton";
import { ReporteContext } from "../store/reporte-context";
import ReporteItem from "../components/ReporteItem";
import { getReportes } from "../http";
import Footer from "../components/Footer";
import Sidebar from "../components/sideBar";
import { logoutUser } from "../config/firebaseConfig";
import { UserContext } from "../context/UserContext"; 

function ReportesScreen() {
    const reporteCTX = useContext(ReporteContext);
    const { isHighContrast, fontSize } = useContext(UserContext); 
    const [isError, setError] = useState(false);
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const navigation = useNavigation();

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IconButton 
                    name="menu" 
                    color={isHighContrast ? "#fff" : "#000"} 
                    onPress={toggleSidebar}
                />
            )
        });
    }, [navigation, isHighContrast]);

    useEffect(() => {
        async function getReport() {
            try {
                const reportes = await getReportes();
                reporteCTX.modifyReportes(reportes);
                setError(false);
            } catch (error) {
                setError(true);
            }
        }
        getReport();
    }, [reporteCTX]);

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigation.navigate("Login");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    function renderReporte(obj) {
        return (
            <ReporteItem
                id={obj.item.id}
                name={obj.item.name}
                date={obj.item.date.toString()}
                location={obj.item.location}
                imageUrl={obj.item.imageUrl}
                user={obj.item.user} 
            />
        );
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: isHighContrast ? '#000' : '#204C68' }]}>
            {isSidebarVisible && (
                <View style={styles.sidebarContainer}>
                    <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
                </View>
            )}

            <View style={styles.mainContent}>
                {isError ? (
                    <Text style={[styles.errorText, { fontSize: fontSize, color: isHighContrast ? '#fff' : '#000' }]}>
                        Error al cargar los reportes
                    </Text>
                ) : (
                    <FlatList
                        data={reporteCTX.reportes}
                        renderItem={renderReporte}
                        keyExtractor={(item) => item.id}
                    />
                )}
            </View>
            <Footer navigation={navigation} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sidebarContainer: {
        ...StyleSheet.absoluteFillObject, 
        zIndex: 1000, 
    },
    mainContent: {
        flex: 1,
        marginBottom: 50,
    },
    errorText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default ReportesScreen;
