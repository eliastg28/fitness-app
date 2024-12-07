export const apiRequest = async (url: string, method: string, body?: any) => {
    try {
        const response = await fetch(`https://test-app-railway-production.up.railway.app${url}`, {
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
