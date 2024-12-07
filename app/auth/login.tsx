import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Estado para controlar el spinner
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true); // Activar el spinner

        try {
            const response = await fetch('https://test-app-railway-production.up.railway.app/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }), // Enviar los datos como JSON
            });

            const data = await response.json();

            if (response.ok) {
                // Guardar el token de usuario en AsyncStorage
                await AsyncStorage.setItem('userToken', data.token);
                // Redirigir a la vista principal después del login
                router.replace('/home');
            } else {
                alert('Credenciales incorrectas');
            }
        } catch (error) {
            console.error(error);
            alert('Error al iniciar sesión');
        } finally {
            setLoading(false); // Desactivar el spinner después de la solicitud
        }
    };

    return (
        <View style={styles.container}>
            {/* Logo centrado */}
            <Image
                source={require('../../assets/images/logo.png')} // Ruta del logo en tu proyecto
                style={styles.logo}
            />
            <TextInput
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            
            {loading ? (  // Si está cargando, mostrar el spinner
                <ActivityIndicator size="large" color="blue" />
            ) : (
                <Button title="Iniciar sesión" onPress={handleLogin} />
            )}
            
            <Text onPress={() => router.push('/auth/register')} style={styles.registerText}>
                ¿No tienes cuenta? Regístrate aquí
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center',  // Centra verticalmente
        alignItems: 'center',  // Centra horizontalmente
        padding: 16,
    },
    logo: {
        width: 150,  // Ajusta el tamaño del logo según lo necesites
        height: 150, // Ajusta el tamaño del logo según lo necesites
        marginBottom: 10,  // Espacio debajo del logo
    },
    input: { 
        borderWidth: 1, 
        padding: 8, 
        marginBottom: 16, 
        width: '100%' 
    },
    registerText: { 
        color: 'blue', 
        marginTop: 16, 
        textAlign: 'center' 
    },
});
