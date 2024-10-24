import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        flex: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        height: 45,
    },
    themeStyle: (theme) => ({
        color: theme?.color,
        backgroundColor: theme?.layoutBg,
        borderColor: theme?.layoutBg,
    }),
});
