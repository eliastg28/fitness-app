import { View, Text, StyleSheet } from 'react-native';

export default function NotFound() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>404 - Página no encontrada</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 18, fontWeight: 'bold' },
});
