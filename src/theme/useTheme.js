import React, { useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import { themes } from './theme';

const ThemeContext = React.createContext({
    theme: themes.light,
    toggleTheme: () => { },
});

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(themes.light);

    // Function to set theme based on system appearance
    const setSystemTheme = () => {
        const colorScheme = Appearance.getColorScheme();
        setTheme(colorScheme === 'dark' ? themes.dark : themes.light);
    };

    useEffect(() => {
        setSystemTheme(); // Set initial theme based on system setting

        // Listener for system theme changes
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(colorScheme === 'dark' ? themes.dark : themes.light);
        });

        return () => {
            subscription.remove(); // Cleanup the listener on unmount
        };
    }, []);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme.name === 'light' ? themes.dark : themes.light));

    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    return React.useContext(ThemeContext);
};
