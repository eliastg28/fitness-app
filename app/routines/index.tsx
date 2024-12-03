import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';  // Importa el hook useRouter
import { apiRequest } from '../api/api';  // Función para las solicitudes HTTP
import { Picker } from '@react-native-picker/picker';  // Actualizar la importación
import { Ionicons } from '@expo/vector-icons';  // Importa el ícono de la librería

// Definir el tipo para las rutinas
interface Routine {
    id: number;
    age_group: string;
    description: string;
}

const Routines = () => {
    const router = useRouter();  // Hook para acceder a la navegación
    const [routines, setRoutines] = useState<Routine[]>([]);  // Tipar el estado como un array de `Routine`
    const [loading, setLoading] = useState(true);
    const [ageGroup, setAgeGroup] = useState<string>('Adulto');  // Estado para almacenar la selección del grupo de edad
    const [age, setAge] = useState<number>(30);  // Edad por defecto para el grupo "Adulto" (18-50)

    useEffect(() => {
        const fetchRoutines = async () => {
            setLoading(true);  // Activar el spinner al hacer la solicitud
            try {
                const data = await apiRequest(`/routines/${age}`, 'GET');  // Llamada a la API
                setRoutines(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);  // Desactivar el spinner una vez cargado
            }
        };

        fetchRoutines();
    }, [age]);

    const handleAgeChange = (value: string) => {
        setAgeGroup(value);
        // Establecer la edad según la opción seleccionada
        if (value === 'Niño') {
            setAge(10);  // Edad para el grupo "Niño"
        } else if (value === 'Adulto') {
            setAge(30);  // Edad para el grupo "Adulto" (18-50)
        } else {
            setAge(70);  // Edad para el grupo "Adulto Mayor"
        }
    };

    if (loading) return <ActivityIndicator size="large" color="blue" />;  // Spinner mientras se cargan las rutinas

    return (
        <View style={{ padding: 16 }}>
            {/* Botón de retroceso con una flecha */}
            <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 20 }}>
                <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Rutinas Personalizadas</Text>
            
            <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>Seleccione su edad</Text>
            <Picker
                selectedValue={ageGroup}
                onValueChange={handleAgeChange}
                style={{ height: 50, width: 200, marginBottom: 20 }}
            >
                <Picker.Item label="< 18 años" value="Niño" />
                <Picker.Item label="18 - 50 años" value="Adulto" />
                <Picker.Item label="50+ años" value="Adulto Mayor" />
            </Picker>
            
            <FlatList
                data={routines}  // Datos de las rutinas obtenidas de la API
                keyExtractor={(item) => item.id.toString()}  // Usar el ID como clave única
                renderItem={({ item }) => (
                    <View style={{ marginBottom: 15 }}>
                        <Text>- {item.description}</Text>  {/* Descripción de cada rutina */}
                    </View>
                )}
            />
        </View>
    );
};

export default Routines;
