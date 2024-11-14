import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
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

  const handleRutChange = (text) => setRut(formatRut(text));
  const handleUsernameChange = (text) => setUsername(text.startsWith('@') ? text : '@' + text);

  const handleRegister = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, ingrese un correo electrónico válido.');
      return;
    }
    try {
      await registerUser(email, password, rut, username);
      console.log('Usuario registrado exitosamente');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error al registrar el usuario:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
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
