export const apiRequest = async (url: string, method: string, body?: any) => {
    try {
        console.log("Holaaa", `http://192.168.100.16:3000${url}`);
        const response = await fetch(`http://192.168.100.16:3000${url}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }

        return await response.json();
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
};
