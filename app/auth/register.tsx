import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker'; // Importa el Picker

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState(''); // Guarda el valor del género
    const [loading, setLoading] = useState(false);  // Estado para controlar el spinner
    const router = useRouter();

    const handleRegister = async () => {
        setLoading(true); // Activar el spinner de carga

        try {
            const response = await fetch('http://192.168.100.16:3000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, age, gender }), // Enviar los datos como JSON
            });

            const data = await response.json();

            if (response.ok) {
                alert('Usuario creado exitosamente');
                router.replace('/auth/login'); // Redirigir al login
            } else {
                alert(data.message || 'Error al registrarse');
            }
        } catch (error) {
            console.error(error);
            alert('Error al conectarse con el servidor');
        } finally {
            setLoading(false); // Desactivar el spinner
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
                style={styles.input}
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
            <TextInput
                placeholder="Edad"
                value={age}
                onChangeText={setAge}
                style={styles.input}
                keyboardType="numeric"
            />
            
            {/* Picker para seleccionar el género */}
            <Picker
                selectedValue={gender}
                onValueChange={(itemValue: string) => setGender(itemValue)} // Especifica el tipo de itemValue como string
                style={styles.input}
            >
                <Picker.Item label="Selecciona tu género" value="" />
                <Picker.Item label="Masculino" value="M" />
                <Picker.Item label="Femenino" value="F" />
            </Picker>

            {loading ? (
                <ActivityIndicator size="large" color="blue" />
            ) : (
                <Button title="Registrarse" onPress={handleRegister} />
            )}

            <Text
                style={styles.backToLogin}
                onPress={() => router.back()} // Vuelve a la pantalla anterior
            >
                Regresar al login
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, justifyContent: 'center' },
    input: { borderWidth: 1, padding: 8, marginBottom: 16, borderRadius: 4 },
    backToLogin: {
        color: 'blue',
        textAlign: 'center',
        marginTop: 16,
        fontSize: 16,
    },
});
