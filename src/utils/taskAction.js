import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTask = async (tasks, newTask, setTasks) => {
    const fetchedTasks = [...tasks];
    fetchedTasks.unshift(newTask);
    await AsyncStorage.setItem('tasks', JSON.stringify(fetchedTasks));
    setTasks(fetchedTasks);
};

export const toggleStatus = async (tasks, taskId, setTasks) => {
    const updatedTasks = tasks.map(task => task.id === taskId ? { ...task, done: !task.done } : task);
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
};

export const handleDelete = async (tasks, taskId, setTasks) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
};
