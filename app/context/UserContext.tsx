// app/context/UserContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Definir la estructura del estado del usuario
interface User {
    id: number;
    name: string;
    age: number;
    email: string;
}

// Definir el tipo del contexto
interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Crear el contexto con valores predeterminados
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

// Crear el proveedor del contexto
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook para usar el contexto en otros componentes
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
