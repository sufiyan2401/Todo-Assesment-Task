import * as React from 'react';
import { Pressable, Text, View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../theme/useTheme';
import Card from '../Card/Card';
import { styles } from './styles';

const ListItem = ({ item, toggleStatus, onDelete }) => {
    const { theme } = useTheme();
    function limitText(text, maxLength = 8) {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    }
    const handleLongPress = () => {
        Alert.alert(
            "Delete Todo",
            "Are you sure you want to delete this todo?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => onDelete(item.id),
                    style: "destructive"
                }
            ]
        );
    };

    return (
        <Card style={styles.card}>
            <Pressable
                onLongPress={handleLongPress}
                // eslint-disable-next-line react-native/no-inline-styles
                style={[styles.row, { opacity: item.done ? 0.3 : 1 }]}
                accessibilityLabel={
                    item.done ? 'Tap to uncheck from list' : 'Tap to check from list'
                }
                accessibilityHint="Toggles task done and undone"
                accessibilityRole="radio"
                accessibilityState={{ checked: item.done }}
                onPress={() => toggleStatus(item.id)}
            >
                <View style={{ width: 270 }}>
                    <Text
                        style={[
                            {
                                color: theme?.color,
                                width: 300
                            },
                        ]}>
                        {/* {item.title} */}
                        {limitText(item.title, 120)}
                    </Text>
                    <View style={{ ...styles.row, gap: 2 }}>
                        <Text
                            style={[
                                {
                                    color: theme?.color,
                                },
                            ]}>
                            Country : {limitText(item.country, 8)}
                        </Text>

                        <Text
                            style={[
                                {
                                    color: theme?.color,

                                },
                            ]}>
                            User Assigned : {limitText(item.assignedUser)}
                        </Text>
                    </View>
                </View>
                <View style={{ marginRight: 5 }}>
                    <Icon
                        name="checkbox"
                        size={20}
                        color={item.done ? theme.primary : '#CECECE'}

                    />
                </View>
            </Pressable>
        </Card>
    );
};

export default ListItem;

