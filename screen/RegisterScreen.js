import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { registerUser } from '../config/firebaseConfig';

const formatRut = (rut) => {
  rut = rut.replace(/\./g, '').replace(/-/g, '');
  if (rut.length > 1) {
    let formattedRut = rut.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    formattedRut += '-' + rut.slice(-1);
    return formattedRut;
  }
  return rut;
};

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rut, setRut] = useState('');
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const handleRutChange = (text) => setRut(formatRut(text));
  const handleUsernameChange = (text) => setUsername(text.startsWith('@') ? text : '@' + text);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      console.log('Imagen seleccionada:', result.assets[0].uri); // Debug
      setAvatarUrl(result.assets[0].uri); // Guardar la URL local de la imagen seleccionada
    } else {
      console.log('Selección de imagen cancelada');
    }
  };

  const handleImageChange = () => {
    Alert.alert(
      'Cambiar Imagen',
      '¿Quieres seleccionar otra imagen?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Seleccionar', onPress: pickImage },
      ]
    );
  };

  const handleRegister = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, ingrese un correo electrónico válido.');
      return;
    }
    try {
      await registerUser(email, password, rut, username, avatarUrl); // Pasar avatarUrl como parámetro
      console.log('Usuario registrado exitosamente');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error al registrar el usuario:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      {avatarUrl ? (
        <TouchableOpacity onPress={handleImageChange}>
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          <Text style={styles.changeImageText}>Cambiar Imagen</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={pickImage} style={styles.pickImageButton}>
          <Text style={styles.pickImageText}>Seleccionar Imagen de Perfil</Text>
        </TouchableOpacity>
      )}
      <TextInput
        placeholder="RUT"
        value={rut}
        onChangeText={handleRutChange}
        style={styles.input}
        placeholderTextColor="#A0A0A0"
      />
      <TextInput
        placeholder="Nombre de Usuario"
        value={username}
        onChangeText={handleUsernameChange}
        style={styles.input}
        placeholderTextColor="#A0A0A0"
      />
      <TextInput
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#A0A0A0"
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        placeholderTextColor="#A0A0A0"
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Crear cuenta</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>¿Ya tienes una cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#204C68',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  changeImageText: {
    color: '#A0D1F5',
    fontSize: 16,
    marginBottom: 20,
  },
  pickImageButton: {
    backgroundColor: '#3A9AD9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  pickImageText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: '#000',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#3A9AD9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  linkText: {
    color: '#A0D1F5',
    marginTop: 15,
    fontSize: 16,
  },
});
