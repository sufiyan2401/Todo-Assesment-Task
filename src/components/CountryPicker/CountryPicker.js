// CountryPicker.js
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { typeVariants } from '../../theme/theme';
import { fetchCountries } from '../../utils/apiService';
import { styles } from './styles';

const CountryPicker = ({ theme, selectedCountry, onValueChange }) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const loadCountries = async () => {
            try {
                const countryList = await fetchCountries();
                setCountries(countryList);
            } catch (error) {
                console.error("Error loading countries:", error);
            }
        };
        loadCountries();
    }, []);


    return (
        <Picker
            selectedValue={selectedCountry}
            onValueChange={onValueChange}
            style={[styles.input, typeVariants.bodyMedium, styles.themeStyle(theme)]}
        >
            <Picker.Item label="Select Country" value="" />
            {countries.map((countryName, index) => (
                <Picker.Item key={index} label={countryName} value={countryName} />
            ))}
        </Picker>
    );
};


export default CountryPicker;
