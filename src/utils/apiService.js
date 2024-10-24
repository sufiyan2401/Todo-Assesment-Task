import axios from 'axios';

export const fetchCountries = async () => {
    try {
        const { data } = await axios.get('https://restcountries.com/v3.1/all');
        return data.map(({ name }) => name.common);
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw error;
    }
};
