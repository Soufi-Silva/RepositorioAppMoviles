import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ReporteContext } from "../store/reporte-context";
import { removeReporte, updateReporte } from "../http";
import Footer from "../components/Footer";

function ReporteEditScreen() {
    const reporteCTX = useContext(ReporteContext);
    const route = useRoute();
    const navigator = useNavigation();
    const id = route.params.id;

    const reporte = reporteCTX.reportes.find((item) => item.id === id);

    const [name, setName] = useState(reporte?.name);

    function editReporte() {
        const reporteActualizado = {
            ...reporte,                
            name: name,                
            date: new Date().toISOString(), 
        };
    
        reporteCTX.editReporte(id, reporteActualizado);
    
        navigator.goBack();
    }
    

    function deleteReporte() {
        reporteCTX.deleteReporte(id);
        removeReporte(id);
        navigator.goBack();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar descripción del reporte</Text>
            <TextInput
                onChangeText={(text) => setName(text)}
                style={styles.input}
                value={name}
                placeholder="Nombre del reporte"
                placeholderTextColor="#a8d8eb"
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.editButton} onPress={editReporte}>
                    <Text style={styles.buttonText}>Actualizar descripción</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={deleteReporte}>
                    <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
            <Footer navigation={navigator} />
        </View>
    );
}

export default ReporteEditScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#204C68",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: 20,
    },
    input: {
        padding: 12,
        borderWidth: 1,
        borderColor: "#5FC2D9",
        borderRadius: 8,
        backgroundColor: "#1C3C50",
        width: "100%",
        color: "#ffffff",
        fontSize: 16,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    editButton: {
        backgroundColor: "#5FC2D9",
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 8,
        alignItems: "center",
        flex: 1,
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: "#D94F30",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        flex: 1,
        marginLeft: 10,
    },
    buttonText: {
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
