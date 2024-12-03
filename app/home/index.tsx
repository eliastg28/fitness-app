import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
    const router = useRouter();

    // Funciones para navegar a las diferentes secciones
    const navigateToRoutines = () => {
        router.push('/routines');  // Navegar a la página de rutinas
    };

    const navigateToVideos = () => {
        router.push('/videos');  // Navegar a la página de videos
    };

    const navigateToTips = () => {
        router.push('/tips');  // Navegar a la página de consejos de salud
    };

    // Función para cerrar sesión
    const handleLogout = async () => {
        try {
            // Eliminar el token de usuario de AsyncStorage
            await AsyncStorage.removeItem('userToken');
            // Redirigir al login
            router.replace('/auth/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            Alert.alert('Error', 'Hubo un problema al cerrar sesión.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Bienvenido a tu App de Salud y Ejercicio!</Text>
            <Text style={styles.subtitle}>Aquí puedes encontrar rutinas personalizadas, videos de ejercicios y consejos para tu bienestar.</Text>

            <View style={styles.buttonContainer}>
                <Button title="Ver Rutinas de Ejercicio" onPress={navigateToRoutines} />
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Ver Videos de Ejercicio" onPress={navigateToVideos} />
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Ver Consejos para la Salud" onPress={navigateToTips} />
            </View>

            {/* Botón de cerrar sesión */}
            <View style={styles.buttonContainer}>
                <Button title="Cerrar sesión" onPress={handleLogout} color="red" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
    },
    buttonContainer: {
        marginBottom: 10,
    },
});

export default Home;
