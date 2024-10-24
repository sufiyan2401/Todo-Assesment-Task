import React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { typeVariants } from '../../theme/theme';
import CountryPicker from '../CountryPicker/CountryPicker';
import { useTheme } from '../../theme/useTheme';
import Card from '../Card/Card';
import { styles } from './styles';

const TaskForm = ({ formData, handleInputChange, handleSaveTask }) => {
    const { theme } = useTheme();

    return (
        <Card style={[styles.inputCard, { borderTopColor: theme?.cardBorderColor }]}>
            <View style={styles.inputBtnRow}>
                <TextInput
                    placeholder="User Assigned"
                    placeholderTextColor={theme?.color}
                    style={[styles.input, typeVariants.bodyMedium, styles.themeStyle(theme)]}
                    onChangeText={(text) => handleInputChange('assignedUser', text)}
                    value={formData.assignedUser}
                />
            </View>

            <View style={styles.inputBtnRow}>
                <CountryPicker
                    theme={theme}
                    selectedCountry={formData.country}
                    onValueChange={(value) => handleInputChange('country', value)}
                />
            </View>

            <View style={styles.inputBtnRow}>
                <TextInput
                    placeholder="Description"
                    placeholderTextColor={theme?.color}
                    style={[styles.input, typeVariants.bodyMedium, styles.themeStyle(theme)]}
                    onChangeText={(text) => handleInputChange('description', text)}
                    value={formData.description}
                />
            </View>

            <Text style={[styles.wordCounter, { color: formData.description.length > 120 ? 'red' : theme.color }]}>
                {formData.description.length}/{120}
            </Text>

            <TouchableOpacity onPress={handleSaveTask} style={[styles.btnAdd, styles.themeStyle(theme)]} activeOpacity={0.8}>
                <Text style={{ color: theme.color, fontSize: 16, fontWeight: '600' }}>Send Todo</Text>
                <Icon name="checkmark-sharp" size={20} color={theme.color} />
            </TouchableOpacity>
        </Card>
    )
};


export default TaskForm;
