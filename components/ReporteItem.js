import React, { useEffect, useState, useContext } from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { reverseGeocode } from "../utils/geocode";
import { getDatabase, ref, get, runTransaction, onValue } from "firebase/database";
import { UserContext } from "../context/UserContext";

function ReporteItem(props) {
    const navigator = useNavigation();
    const { user } = useContext(UserContext);

    const [userData, setUserData] = useState(null);
    const [formattedDate, setFormattedDate] = useState("");
    const [displayLocation, setDisplayLocation] = useState("Ubicación desconocida");
    const [likes, setLikes] = useState(props.likes || 0);
    const [hasLiked, setHasLiked] = useState(false);
    const [isUserReport, setIsUserReport] = useState(false);

    useEffect(() => {
        const dateObj = new Date(props.date);
        const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
        setFormattedDate(dateObj.toLocaleDateString("es-ES", options));
    }, [props.date]);

    useEffect(() => {
        const db = getDatabase();
        const userRef = ref(db, `users/${props.user.uid}`);
        console.log(props.user);
        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                setUserData(snapshot.val());
            }
        });
    }, [props.user.uid]);

    useEffect(() => {
        async function fetchAddress() {
            if (props.location?.lat && props.location?.lng) {
                const address = await reverseGeocode(props.location.lat, props.location.lng);
                setDisplayLocation(address);
            }
        }
        fetchAddress();
    }, [props.location]);

    useEffect(() => {
        if (props.user?.username === user?.username) {
            setIsUserReport(true);
        } else {
            setIsUserReport(false);
        }

        const db = getDatabase();
        const likesRef = ref(db, `reportes/${props.id}/likesByUser/${user?.uid}`);
        get(likesRef).then(snapshot => {
            if (snapshot.exists()) {
                setHasLiked(true);
            }
        });

        const likesCountRef = ref(db, `reportes/${props.id}/likes`);
        const unsubscribe = onValue(likesCountRef, (snapshot) => {
            if (snapshot.exists()) {
                setLikes(snapshot.val());
            }
        });

        return () => {
            unsubscribe();
        };
    }, [user, props.id, props.user?.username]);

    function goToEdit() {
        navigator.navigate("Edit", { id: props.id });
    }

    const handleLike = async () => {
        const db = getDatabase();
        const reporteRef = ref(db, `reportes/${props.id}`);

        if (hasLiked) {
            await runTransaction(reporteRef, (reporte) => {
                if (reporte) {
                    if (reporte.likesByUser && reporte.likesByUser[user.uid]) {
                        delete reporte.likesByUser[user.uid];
                        reporte.likes = (reporte.likes || 0) - 1;
                    }
                }
                return reporte;
            });

            setLikes(likes - 1);
            setHasLiked(false);
        } else {
            await runTransaction(reporteRef, (reporte) => {
                if (reporte) {
                    if (!reporte.likesByUser) {
                        reporte.likesByUser = {};
                    }
                    if (!reporte.likesByUser[user.uid]) {
                        reporte.likesByUser[user.uid] = true;
                        reporte.likes = (reporte.likes || 0) + 1;
                    }
                }
                return reporte;
            });

            setLikes(likes + 1);
            setHasLiked(true);
        }
    };

    return (
        <View style={styles.container}>
            {props.user && (
                <View style={styles.header}>
                    <Image
                        source={{
                            uri: props.user.avatar || 'https://via.placeholder.com/150' 
                        }}
                        style={styles.avatar}
                    />
                    <Text style={styles.username}>{props.user.username}</Text>
                </View>
            )}

            {props.imageUrl && (
                <Image
                    source={{ uri: props.imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                />
            )}
            <View style={styles.textContainer}>
                <Text style={styles.title}>{props.name}</Text>
                <Text style={styles.date}>{formattedDate}</Text>
                <Text style={styles.location}>{displayLocation}</Text>
            </View>

            <Pressable style={styles.likeButton} onPress={handleLike}>
                <Text style={styles.buttonText}>
                    ❤️ {likes} Me gusta
                </Text>
            </Pressable>

            {isUserReport && (
                <Pressable style={styles.editButton} onPress={goToEdit}>
                    <Text style={styles.buttonText}>Gestión de reportes</Text>
                </Pressable>
            )}
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
    likeButton: {
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "flex-end",
        marginTop: 10,
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
