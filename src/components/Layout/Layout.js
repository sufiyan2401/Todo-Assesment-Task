import React from 'react';
import { StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/useTheme';
import { styles } from './styles';


const Layout = ({ children, style, ...rest }) => {
    const { theme } = useTheme();
    return (
        <SafeAreaView style={styles.container} {...rest}>
            <StatusBar
                animated
                backgroundColor={theme.cardBg}
                barStyle={theme?.name === 'light' ? 'dark-content' : 'light-content'}
            />
            <View
                testID="Layout.LayoutContainer"
                style={[styles.layout, { backgroundColor: theme?.layoutBg }, style]}>
                {children}
            </View>
        </SafeAreaView>
    );
};

export default Layout;

