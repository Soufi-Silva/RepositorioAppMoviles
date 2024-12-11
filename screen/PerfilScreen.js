import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList, Button } from 'react-native';
import { UserContext } from '../context/UserContext';
import { getReportes } from '../http';
import * as ImagePicker from 'expo-image-picker';

import Footer from "../components/Footer"; 
import { updateUserAvatarInFirebase } from '../http';

function PerfilScreen({ navigation }) {
    const { user, isHighContrast } = useContext(UserContext);  
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState(user?.username || '');
    const [profileImage, setProfileImage] = useState(user?.avatar || 'https://via.placeholder.com/100');
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        if (user?.avatar) {
            setProfileImage(user.avatar);
        }
    }, [user?.avatar]);

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

    const uploadImageToCloudinary = async (uri) => {
        if (!uri) {
            console.error('La URI de la imagen es inválida');
            throw new Error('La URI de la imagen es inválida');
        }

        const cloudName = 'dp7chjr9b'; 
        const uploadPreset = 'ml_default'; 
        const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

        const data = new FormData();
        data.append('file', {
            uri,
            type: 'image/jpeg', 
            name: 'profile.jpg',
        });
        data.append('upload_preset', uploadPreset);

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: data,
            });

            if (!response.ok) {
                throw new Error('Error en la respuesta de Cloudinary');
            }

            const result = await response.json();
            return result.secure_url; 
        } catch (error) {
            console.error('Error al subir la imagen a Cloudinary:', error);
            throw error;
        }
    };

    const handleSaveProfile = async () => {
        let newProfileImage = profileImage;
        if (profileImage !== user?.avatar) {
            try {
                newProfileImage = await uploadImageToCloudinary(profileImage);
            } catch (error) {
                alert('Error al subir la imagen de perfil.');
                return;
            }
        }

        try {
            await updateUserAvatarInFirebase(user.uid, newProfileImage);
            setIsEditing(false);
        } catch (error) {
            console.error('Error al actualizar avatar en Firebase:', error);
            alert('Hubo un error al actualizar el avatar.');
        }
    };

    const handlePickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const selectedImage = result.assets[0].uri;

            if (selectedImage) {
                setProfileImage(selectedImage); 
                try {
                    const uploadedImageUrl = await uploadImageToCloudinary(selectedImage); 
                    setProfileImage(uploadedImageUrl); 
                } catch (error) {
                    alert('Hubo un error al subir la imagen.');
                }
            }
        }
    };

    const renderPost = ({ item }) => (
        <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
    );

    return (
        <View style={[styles.container, isHighContrast && styles.highContrastContainer]}>
            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={handlePickImage}>
                    <Image source={{ uri: profileImage }} style={styles.profileImage} />
                </TouchableOpacity>
                {isEditing ? (
                    <TextInput
                        style={[styles.input, isHighContrast && styles.highContrastInput]}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Nombre de usuario"
                    />
                ) : (
                    <Text style={[styles.username, isHighContrast && styles.highContrastText]}>{username}</Text>
                )}
                <Text style={[styles.email, isHighContrast && styles.highContrastText]}>{user?.email}</Text>
                {isEditing ? (
                    <Button title="Guardar" onPress={handleSaveProfile} />
                ) : (
                    <TouchableOpacity onPress={() => setIsEditing(true)} style={[styles.editButton, isHighContrast && styles.highContrastButton]}>
                        <Text style={styles.editButtonText}>Editar Perfil</Text>
                    </TouchableOpacity>
                )}
            </View>

            <Text style={[styles.sectionTitle, isHighContrast && styles.highContrastText]}>Tus Posts</Text>
            <FlatList
                data={userPosts}
                renderItem={renderPost}
                keyExtractor={(item) => item.id}
                numColumns={3}
                style={styles.postsContainer}
            />

            <Footer navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    highContrastContainer: {
        backgroundColor: '#333',  
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
    highContrastText: {
        color: '#c2c4c4',
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
    highContrastButton: {
        backgroundColor: '#555', 
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
    highContrastInput: {
        backgroundColor: '#555', 
        color: '#fff',  
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
