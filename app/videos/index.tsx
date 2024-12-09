import React, { useState, useEffect } from 'react';
import { Linking, SafeAreaView, View, Text, FlatList, Button, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { apiRequest } from '../api/api';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Video {
    id: number;
    title: string;
    url: string;
    description: string;
}

const Videos = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const data = await apiRequest('/videos', 'GET');
                setVideos(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, []);

    if (loading) return <ActivityIndicator size="large" color="blue" style={styles.loader} />;

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>

            <Text style={styles.title}>Videos de Ejercicios</Text>

            <FlatList
                data={videos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.videoContainer}>
                        <Text style={styles.videoTitle}>{item.title}</Text>
                        <Text>{item.description}</Text>
                        <Button title="Ver en YouTube" onPress={() => handleOpenVideo(item.url)} />
                    </View>
                )}
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    );
};

const handleOpenVideo = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("No se pudo abrir el enlace", err));
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    videoContainer: {
        marginBottom: 20,
    },
    videoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    listContent: {
        paddingBottom: 20, // Asegura espacio al final del scroll
    },
});

export default Videos;
