import React, { useState, useEffect } from 'react';
import { Linking, View, Text, FlatList, Button, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { apiRequest } from '../api/api';  // Función para las solicitudes HTTP
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Definir el tipo para los videos
interface Video {
    id: number;
    title: string;
    url: string;
    description: string;
}

const Videos = () => {
    const [videos, setVideos] = useState<Video[]>([]);  // Tipar el estado como un array de `Video`
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const data = await apiRequest('/videos', 'GET');  // Llamada a la API
                setVideos(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);  // Desactivar el spinner una vez cargados los videos
            }
        };
        fetchVideos();
    }, []);

    if (loading) return <ActivityIndicator size="large" color="blue" />;  // Spinner mientras se cargan los videos

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 20 }}>
                <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Videos de Ejercicios</Text>
            <FlatList
                data={videos}  // Datos de los videos obtenidos de la API
                keyExtractor={(item) => item.id.toString()}  // Usar el ID como clave única
                renderItem={({ item }) => (
                    <View style={styles.videoContainer}>
                        <Text style={styles.videoTitle}>{item.title}</Text>
                        <Text>{item.description}</Text>
                        <Button title="Ver en YouTube" onPress={() => handleOpenVideo(item.url)} />
                    </View>
                )}
            />
        </View>
    );
};

const handleOpenVideo = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("No se pudo abrir el enlace", err));
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    videoContainer: { marginBottom: 20 },
    videoTitle: { fontSize: 18, fontWeight: 'bold' },
});

export default Videos;
