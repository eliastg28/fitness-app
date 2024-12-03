import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { apiRequest } from '../api/api';  // Función para las solicitudes HTTP
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Definir el tipo para los consejos
interface Tip {
    id: number;
    title: string;
    content: string;
}

const Tips = () => {
    const [tips, setTips] = useState<Tip[]>([]);  // Tipar el estado como un array de `Tip`
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTips = async () => {
            try {
                const data = await apiRequest('/tips', 'GET');  // Llamada a la API
                setTips(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);  // Desactivar el spinner una vez cargado
            }
        };
        fetchTips();
    }, []);

    if (loading) return <ActivityIndicator size="large" color="blue" />;  // Spinner mientras se cargan los consejos

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 20 }}>
                <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>

            <Text style={styles.title}>Consejos para la salud</Text>
            <FlatList
                data={tips}  // Datos de los consejos obtenidos de la API
                keyExtractor={(item) => item.id.toString()}  // Usar el ID como clave única
                renderItem={({ item }) => (
                    <View style={styles.tipContainer}>
                        <Text style={styles.tipTitle}>{item.title}</Text>
                        <Text>{item.content}</Text>  {/* Contenido de cada consejo */}
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    tipContainer: { marginBottom: 20 },
    tipTitle: { fontSize: 18, fontWeight: 'bold' },
});

export default Tips;
