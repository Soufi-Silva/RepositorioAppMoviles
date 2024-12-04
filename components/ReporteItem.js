import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { reverseGeocode } from "../utils/geocode";

function ReporteItem(props) {
    const navigator = useNavigation();
    const [formattedDate, setFormattedDate] = useState("");
    const [displayLocation, setDisplayLocation] = useState("Ubicación desconocida");

    // Formatear la fecha
    useEffect(() => {
        const dateObj = new Date(props.date);
        const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
        setFormattedDate(dateObj.toLocaleDateString("es-ES", options));
    }, [props.date]);

    // Obtener dirección legible
    useEffect(() => {
        async function fetchAddress() {
            if (props.location?.lat && props.location?.lng) {
                const address = await reverseGeocode(props.location.lat, props.location.lng);
                setDisplayLocation(address);
            }
        }
        fetchAddress();
    }, [props.location]);

    function goToEdit() {
        navigator.navigate("Edit", { id: props.id });
    }

    return (
        <View style={styles.container}>
            {/* Header con avatar y nombre de usuario */}
            {props.user && (
                <View style={styles.header}>
                    <Image
                        source={{
                            uri: props.user.avatar,
                        }}
                        style={styles.avatar}
                    />
                    <Text style={styles.username}>{props.user.username}</Text>
                </View>
            )}

            {/* Imagen del reporte */}
            {props.imageUrl && (
                <Image
                    source={{ uri: props.imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                />
            )}

            {/* Detalles del reporte */}
            <View style={styles.textContainer}>
                <Text style={styles.title}>{props.name}</Text>
                <Text style={styles.date}>{formattedDate}</Text>
                <Text style={styles.location}>{displayLocation}</Text>
            </View>

            <Pressable style={styles.editButton} onPress={goToEdit}>
                <Text style={styles.buttonText}>Gestión de reportes</Text>
            </Pressable>
        </View>
    );
}

export default ReporteItem;

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
        marginHorizontal: 20,
        backgroundColor: "#b5b5b5",
        padding: 20,
        borderRadius: 15,
        width: "90%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    username: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    textContainer: {
        marginBottom: 12,
    },
    title: {
        color: "#000000",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 6,
    },
    date: {
        color: "#000000",
        fontSize: 14,
        marginBottom: 4,
    },
    location: {
        color: "#000000",
        fontSize: 16,
        marginTop: 4,
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 8,
        marginVertical: 10,
    },
    editButton: {
        backgroundColor: "#E67E22",
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
});
