import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    inputCard: {
        borderTopWidth: StyleSheet.hairlineWidth,
        elevation: 4,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        gap: 3,
    },
    inputBtnRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        flex: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        height: 45,
    },
    btnAdd: {
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
    wordCounter: {
        alignSelf: 'flex-end',
        paddingRight: 10,
    },
    themeStyle: (theme) => ({
        color: theme?.color,
        backgroundColor: theme?.layoutBg,
        borderColor: theme?.layoutBg,
    }),
});
