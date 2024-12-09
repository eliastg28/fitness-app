import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { apiRequest } from '../api/api';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

interface Routine {
    id: number;
    age_group: string;
    description: string;
}

const Routines = () => {
    const router = useRouter();
    const [routines, setRoutines] = useState<Routine[]>([]);
    const [loading, setLoading] = useState(true);
    const [ageGroup, setAgeGroup] = useState<string>('Niño');
    const [age, setAge] = useState<number>(30);

    useEffect(() => {
        const fetchRoutines = async () => {
            setLoading(true);
            try {
                const data = await apiRequest(`/routines/${age}`, 'GET');
                setRoutines(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchRoutines();
    }, [age]);

    const handleAgeChange = (value: string) => {
        setAgeGroup(value);
        if (value === 'Niño') setAge(50);
        else if (value === 'Adulto') setAge(60);
        else setAge(70);
    };

    if (loading) return <ActivityIndicator size="large" color="blue" style={styles.loader} />;

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>

            <Text style={styles.title}>Rutinas Personalizadas</Text>
            
            <Text style={styles.label}>Seleccione su edad</Text>
            <Picker
                selectedValue={ageGroup}
                onValueChange={handleAgeChange}
                style={styles.picker}
            >
                <Picker.Item label="50 - 59 años" value="Niño" />
                <Picker.Item label="60 - 69 años" value="Adulto" />
                <Picker.Item label="70 - 80 años" value="Adulto Mayor" />
            </Picker>
            
            <FlatList
                data={routines}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.routineItem}>
                        <Text>- {item.description}</Text>
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: 200,
        marginBottom: 20,
    },
    routineItem: {
        marginBottom: 15,
    },
    listContent: {
        paddingBottom: 20, // Asegura que haya espacio suficiente al final
    },
});

export default Routines;
