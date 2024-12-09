import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { apiRequest } from '../api/api';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Tip {
    id: number;
    title: string;
    content: string;
}

const Tips = () => {
    const [tips, setTips] = useState<Tip[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTips = async () => {
            try {
                const data = await apiRequest('/tips', 'GET');
                setTips(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchTips();
    }, []);

    if (loading) return <ActivityIndicator size="large" color="blue" style={styles.loader} />;

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>

            <Text style={styles.title}>Consejos para la salud</Text>

            <FlatList
                data={tips}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.tipContainer}>
                        <Text style={styles.tipTitle}>{item.title}</Text>
                        <Text>{item.content}</Text>
                    </View>
                )}
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    );
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
    tipContainer: {
        marginBottom: 20,
    },
    tipTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    listContent: {
        paddingBottom: 20, // Espacio adicional al final del scroll
    },
});

export default Tips;
