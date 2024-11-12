import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../components/IconButton";
import { ReporteContext } from "../store/reporte-context";
import ReporteItem from "../components/ReporteItem";
import { getReportes } from "../http";
import Footer from "../components/Footer"; 

function ReportesScreen() {
    const reporteCTX = useContext(ReporteContext);
    const [isError, setError] = useState(false);
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IconButton 
                    name="add" 
                    color="#000000" 
                    onPress={() => navigation.navigate('NewReporte')}
                />
            )
        });
    }, [navigation]);

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

    function renderReporte(obj) {
        return <ReporteItem 
            id={obj.item.id}
            name={obj.item.name} 
            date={obj.item.date.toString()} 
            location={obj.item.location} 
            imageUrl={obj.item.imageUrl}
        />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainContent}>
                {isError ? (
                    <Text>Error al cargar los reportes</Text>
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
        justifyContent: "flex-end",  
        backgroundColor: "#204C68",
    },
    mainContent: {
        flex: 1,  
    },
});

export default ReportesScreen;
