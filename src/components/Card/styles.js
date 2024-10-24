import { StyleSheet } from "react-native";
import { spacing } from "../../theme/theme";



export const styles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: '#ffffff',
        paddingHorizontal: spacing.layoutPaddingH,
        paddingVertical: spacing.layoutPaddingH,
        borderRadius: spacing.borderRadius,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#fff',
    },
});