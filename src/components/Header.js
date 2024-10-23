import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

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

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        elevation: 4,
    },
    headerText: {
        fontSize: 20,
        fontWeight: '600',
    },
})