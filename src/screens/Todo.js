import React, { useState, useEffect } from 'react';
import { Alert, Modal, View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../theme/useTheme';
import Layout from '../components/Layout/Layout';
import Header from '../components/Header/Header';
import TaskForm from '../components/TaskForm/TaskForm';
import TaskList from '../components/TaskList/TaskList';
import { validateFields } from '../utils/validation';
import { saveTask, toggleStatus, handleDelete } from '../utils/taskAction';
import { styles } from './styles';

const Todo = () => {
    const { theme, toggleTheme } = useTheme();
    const [formData, setFormData] = useState({
        description: '',
        assignedUser: '',
        country: '',
    });
    const [tasks, setTasks] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const showModal = (message) => {
        setModalMessage(message);
        setModalVisible(true);
    };

    const handleInputChange = (name, value) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSaveTask = async () => {
        const { description, assignedUser, country } = formData;
        if (!validateFields(description, assignedUser, country, showModal)) return;

        const newTask = { id: Date.now().toString(), title: description, assignedUser, country, done: false };
        await saveTask(tasks, newTask, setTasks);
        resetForm();
        Alert.alert('Success', 'Task added successfully!');
    };

    const resetForm = () => {
        setFormData({
            description: '',
            assignedUser: '',
            country: ''
        });
    };

    useEffect(() => {

        const loadTasks = async () => {
            const storedTasks = await AsyncStorage.getItem('tasks');
            if (storedTasks) setTasks(JSON.parse(storedTasks));
        };

        loadTasks();
    }, []);

    return (
        <Layout testID="Screen.Tasks">
            <Header toogleTheme={toggleTheme} theme={theme} />
            <TaskList tasks={tasks} theme={theme} toggleStatus={(id) => toggleStatus(tasks, id, setTasks)} handleDelete={(id) => handleDelete(tasks, id, setTasks)} />
            <TaskForm
                formData={formData}
                handleInputChange={handleInputChange}
                handleSaveTask={handleSaveTask}
            />
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


export default Todo;
