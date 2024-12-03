import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
    const router = useRouter();

    const handleLogout = async () => {
        await AsyncStorage.removeItem('userToken');
        router.replace('/auth/login');
    };

    return (
        <View style={styles.container}>
            <Text>¡Bienvenido a la aplicación!</Text>
            <Button title="Cerrar sesión" onPress={handleLogout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
