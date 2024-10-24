import React from 'react';
import { FlatList, View, Text } from 'react-native';
import ListItem from '../ListItem/ListItem';
import { styles } from './styles';

const TaskList = ({ tasks, theme, toggleStatus, handleDelete }) => {
    const renderItem = ({ item, index }) => (
        <ListItem item={item} index={index} toggleStatus={toggleStatus} handleDelete={handleDelete} />
    );

    return tasks.length === 0 ? (
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
    );
};


export default TaskList;
