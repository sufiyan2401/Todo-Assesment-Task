import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';

const Header = ({ theme, toogleTheme }) => {
    return (
        <>
            <View style={[styles.header, { backgroundColor: theme?.headerBg }]}>
                <Text style={[styles.headerText, { color: theme?.color }]}>Tasks</Text>
                <TouchableOpacity onPress={toogleTheme} style={styles.themeToggle}>
                    <Icon name={theme?.name === "dark" ? 'sunny' : 'moon'} size={24} color={theme?.color} />
                </TouchableOpacity>
            </View>
        </>
    )


}

export default Header

