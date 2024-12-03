import { useEffect } from "react";
import { Stack, useRouter } from "expo-router";

const isAuthenticated = false; // Cambia esto según la lógica real de autenticación

export default function Layout() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/login"); // Asegúrate de que esta ruta exista
    }
  }, [isAuthenticated]);

  return (
    <Stack
      screenOptions={{
        headerShown: false, // Sin encabezados
      }}
    />
  );
}
