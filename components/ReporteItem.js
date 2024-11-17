import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";

function ReporteItem(props) {
    const navigator = useNavigation();

    function goToEdit() {
        navigator.navigate('Edit', { id: props.id });
    }

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{props.name}</Text>
                <Text style={styles.date}>{props.date}</Text>
                {props.location && props.location.lat !== undefined && props.location.lng !== undefined ? (
                    <Text style={styles.location}>
                        Ubicación: {props.location.lat.toFixed(3)}, {props.location.lng.toFixed(3)}
                    </Text>
                ) : (
                    <Text style={styles.location}>Ubicación no disponible</Text>
                )}
            </View>
            {props.imageUrl && (
                <Image
                    source={{ uri: props.imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                />
            )}

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
        backgroundColor: '#b5b5b5',
        padding: 20,
        borderRadius: 15,
        width: '90%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textContainer: {
        marginBottom: 12,
    },
    title: {
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    date: {
        color: '#000000',
        fontSize: 14,
        marginBottom: 4,
    },
    location: {
        color: '#000000',
        fontSize: 16,
        marginTop: 4,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginVertical: 10,
    },
    editButton: {
        backgroundColor: '#E67E22',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});
