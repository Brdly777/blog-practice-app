import axios from 'axios';

export const fetchUsers = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/users');
        return response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
};
