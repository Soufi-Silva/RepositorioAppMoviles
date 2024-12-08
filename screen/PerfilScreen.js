import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList, Button } from 'react-native';
import { UserContext } from '../context/UserContext';
import { getReportes } from '../http';
import * as ImagePicker from 'expo-image-picker';

function PerfilScreen() {
    const { user } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState(user?.username || '');
    const [profileImage, setProfileImage] = useState(user?.avatar || 'https://via.placeholder.com/100');
    const [userPosts, setUserPosts] = useState([]); 
    const [profileImage, setProfileImage] = useState(user?.profileImage || 'https://via.placeholder.com/100');
    const [userPosts, setUserPosts] = useState([]);



    useEffect(() => {
        async function fetchUserPosts() {
            try {
                const allReportes = await getReportes(); 

                const filteredReportes = allReportes.filter(
                    (reporte) => reporte.user?.username === user?.username
                );
                setUserPosts(filteredReportes); 
            } catch (error) {
                console.error('Error al cargar los reportes del usuario:', error);
            }
        }
    
        fetchUserPosts();
    }, [user]);
    
    
    const handleSaveProfile = () => { //Implementar la logica de esta wea mas adelante 

        console.log('Datos guardados:', { username, profileImage });
        setIsEditing(false);
    };

    const handlePickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.uri);
        }
    };

    const renderPost = ({ item }) => (
        <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
    );

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={handlePickImage}>
                    <Image
                        source={{ uri: profileImage }}
                        style={styles.profileImage}
                    />
                </TouchableOpacity>
                {isEditing ? (
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Nombre de usuario"
                    />
                ) : (
                    <Text style={styles.username}>{username}</Text>
                )}
                <Text style={styles.email}>{user?.email}</Text>
                {isEditing ? (
                    <Button title="Guardar" onPress={handleSaveProfile} />
                ) : (
                    <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButton}>
                        <Text style={styles.editButtonText}>Editar Perfil</Text>
                    </TouchableOpacity>
                )}
            </View>

            <Text style={styles.sectionTitle}>Tus Posts</Text>
            <FlatList
                data={userPosts}
                renderItem={renderPost}
                keyExtractor={(item) => item.id}
                numColumns={3}
                style={styles.postsContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    profileContainer: {
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#204C68',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    email: {
        fontSize: 16,
        color: '#ccc',
    },
    editButton: {
        marginTop: 10,
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: '#3A9AD9',
        borderRadius: 8,
    },
    editButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
    input: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        width: '80%',
        textAlign: 'center',
        marginVertical: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
    postsContainer: {
        flex: 1,
        marginHorizontal: 10,
    },
    postImage: {
        width: '30%',
        aspectRatio: 1,
        margin: 5,
        borderRadius: 8,
    },
});

export default PerfilScreen;
