import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, FlatList, View, TextInput, Text, Alert, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../theme/useTheme';
import Layout from '../components/Layout';
import { typeVariants } from '../theme/theme';
import Card from '../components/Card';
import ListItem from '../components/ListItem';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';

const Tasks = () => {
    const { theme, toggleTheme } = useTheme();
    const inputRef = useRef(null);
    const [country, setCountry] = useState('');
    const [countries, setCountries] = useState([]);
    const [description, setDescription] = useState('');
    const [assignedUser, setAssignedUser] = useState('');
    const [tasks, setTasks] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const validateFields = () => {
        if (!description.trim() || !assignedUser || !country.trim()) {
            showModal('All fields (User Assigned, Country, and Description) are mandatory.');
            return false;
        }
        if (description.length > 120) {
            showModal('Description must be under 120 characters.');
            return false;
        }
        return true;
    };

    const showModal = (message) => {
        setModalMessage(message);
        setModalVisible(true);
    };

    const saveTask = async () => {
        if (!validateFields()) return;

        const newTask = { id: Date.now().toString(), title: description, assignedUser, country, done: false };
        const storedTasks = await AsyncStorage.getItem('tasks');
        const fetchedTasks = storedTasks ? JSON.parse(storedTasks) : [];

        fetchedTasks.unshift(newTask);
        await AsyncStorage.setItem('tasks', JSON.stringify(fetchedTasks));

        setTasks(fetchedTasks);
        resetForm();
        Alert.alert('Success', 'Task added successfully!');
    };

    const resetForm = () => {
        setDescription('');
        setAssignedUser('');
        setCountry('');
    };

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(({ data }) => setCountries(data.map(({ name }) => name.common)))
            .catch(console.log);
    }, []);

    const toggleStatus = async (taskId) => {
        const updatedTasks = tasks.map(task => task.id === taskId ? { ...task, done: !task.done } : task);
        setTasks(updatedTasks);
        await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    useEffect(() => {
        const loadTasks = async () => {
            const storedTasks = await AsyncStorage.getItem('tasks');
            if (storedTasks) setTasks(JSON.parse(storedTasks));
        };
        loadTasks();
    }, []);

    const handleDelete = async (id) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
    };

    const renderItem = ({ item, index }) => (
        <ListItem item={item} index={index} toggleStatus={toggleStatus} handleDelete={handleDelete} />
    );

    return (
        <Layout testID="Screen.Tasks">
            <Header toogleTheme={toggleTheme} theme={theme} />
            {tasks.length === 0 ? (
                <View style={styles.noTasksContainer}>
                    <Text style={[styles.noTasksText, { color: theme?.color }]}>
                        No tasks today. Add a new task to get started!
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={tasks}
                    renderItem={renderItem}
                    keyExtractor={(item) => `task-${item.id}`}
                    contentContainerStyle={styles.flatList}
                />
            )}

            <Card style={[styles.inputCard, { borderTopColor: theme?.cardBorderColor }]}>
                <View style={styles.inputBtnRow}>
                    <TextInput
                        testID="Tasks.newTaskInput"
                        ref={inputRef}
                        placeholder="User Assigned"
                        placeholderTextColor={theme?.color}
                        style={[styles.input, typeVariants.bodyMedium, styles.themeStyle(theme)]}
                        onChangeText={setAssignedUser}
                        value={assignedUser}
                    />
                </View>

                <View style={styles.inputBtnRow}>
                    <Picker selectedValue={country} onValueChange={setCountry} style={[styles.input, typeVariants.bodyMedium, styles.themeStyle(theme)]}>
                        <Picker.Item label="Select Country" value="" />
                        {countries.map((countryName, index) => (
                            <Picker.Item key={index} label={countryName} value={countryName} />
                        ))}
                    </Picker>
                </View>

                <View style={styles.inputBtnRow}>
                    <TextInput
                        testID="Tasks.newTaskInput"
                        ref={inputRef}
                        placeholder="Description"
                        placeholderTextColor={theme?.color}
                        style={[styles.input, typeVariants.bodyMedium, styles.themeStyle(theme)]}
                        onChangeText={setDescription}
                        value={description}
                    />
                </View>

                <Text style={[styles.wordCounter, { color: description.length > 120 ? 'red' : theme.color }]}>
                    {description.length}/{120}
                </Text>

                <TouchableOpacity onPress={saveTask} style={[styles.btnAdd, styles.themeStyle(theme)]} activeOpacity={0.8}>
                    <Text style={{ color: theme.color, fontSize: 16, fontWeight: '600' }}>Send Todo</Text>
                    <Icon name="checkmark-sharp" size={20} color={theme.color} />
                </TouchableOpacity>
            </Card>

            {/* Modal for validation errors */}
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={[styles.modalContent, { backgroundColor: theme.cardBg }]}>
                        <Text style={{ color: theme.color }}>{modalMessage}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.modalButton, { backgroundColor: theme.layoutBg }]}>
                            <Text style={{ color: theme?.color }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </Layout>
    );
};

const styles = StyleSheet.create({
    flatList: {
        paddingHorizontal: 12,
        paddingVertical: 30,
    },
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
    noTasksContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
    },
    noTasksText: {
        fontSize: 18,
        fontWeight: '500',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    themeStyle: (theme) => ({
        color: theme?.color,
        backgroundColor: theme?.layoutBg,
        borderColor: theme?.layoutBg,
    }),
});

export default Tasks;
