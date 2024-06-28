import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Switch } from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [buttonColor, setButtonColor] = useState('#d3d3d3'); 
  const [editMode, setEditMode] = useState(null); 
  const [editTaskTitle, setEditTaskTitle] = useState(''); 

  const addTask = () => {
    if (taskTitle.trim().length > 0) {
      setTasks([...tasks, { id: Math.random().toString(), title: taskTitle, done: false }]);
      setTaskTitle('');
      setButtonColor('#007bff'); 
    }
  };

  const toggleTaskStatus = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, done: !task.done } : task));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleInputChange = (text) => {
    setTaskTitle(text);
    setButtonColor(text.trim().length > 0 ? '#007bff' : '#d3d3d3'); 
  };

  const startEditing = (taskId, initialTitle) => {
    setEditMode(taskId);
    setEditTaskTitle(initialTitle); 
  };

  const cancelEditing = () => {
    setEditMode(null);
    setEditTaskTitle(''); 
  };

  const saveTaskTitle = (taskId, newTitle) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, title: newTitle } : task));
    setEditMode(null);
    setEditTaskTitle(''); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ToDo App</Text>
      <TextInput 
        style={styles.input}
        placeholder="Task Title"
        value={taskTitle}
        onChangeText={handleInputChange}
      />
      <View style={styles.buttonContainer}>
        <Button title="Add Task" onPress={addTask} disabled={taskTitle.trim().length === 0} color={buttonColor}/>
      </View>
      <FlatList 
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.task}>
            {editMode === item.id ? (
              <TextInput
                style={styles.editInput}
                value={editTaskTitle} 
                onChangeText={setEditTaskTitle} 
                onBlur={() => saveTaskTitle(item.id, editTaskTitle)} 
                autoFocus
              />
            ) : (
              <>
                <Text style={item.done ? styles.doneTaskText : styles.taskText}>{item.title}</Text>
                <Switch 
                  value={item.done}
                  onValueChange={() => toggleTaskStatus(item.id)}
                />
                <TouchableOpacity onPress={() => deleteTask(item.id)}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => startEditing(item.id, item.title)}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#ffe4e1',  
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',  
  },
  buttonContainer: {
    marginBottom: 10,
    backgroundColor: '#fff', 
    borderRadius: 5,  
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    backgroundColor: '#fff',  
  },
  taskText: {
    flex: 1,
  },
  doneTaskText: {
    flex: 1,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  deleteText: {
    color: 'red',
    marginLeft: 10,
  },
  editText: {
    color: 'blue',
    marginLeft: 10,
  },
  editInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',  
  },
});
