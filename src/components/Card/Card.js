import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { styles } from './styles';

const Card = ({ children, style }) => {
    const { theme } = useTheme();
    return (
        <View
            style={[
                styles.card,
                { backgroundColor: theme.cardBg, borderColor: theme.cardBorderColor },
                style,
            ]}>
            {children}
        </View>
    );
};

export default Card;


