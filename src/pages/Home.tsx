import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
   if (tasks.findIndex(task => task.title === newTaskTitle) >=0){
    AlertDuplicateTask(newTaskTitle);
   } 
   else {
    createTask(newTaskTitle)
   }
  }

  function AlertDuplicateTask(task: string){
    Alert.alert(
      "Adicionar tarefa repitida? ",
      `Deseja realmente adicionar a tarefa ${task} novamente?`,
      [
        {
          text: "Cancel",
          onPress: () => '',
          style: "cancel"
        },
        { text: "OK", onPress: () =>  createTask(task)}
      ]
    );
  }

  function createTask(newTaskTitle: string) {
    const task: Task = {
      id: Number(new Date().getTime().toString().slice(8)),
      title: newTaskTitle,
      done: false  
    }
    setTasks(oldTasks => [...oldTasks, task]);

  }

  function handleToggleTaskDone(id: number) {
    const index = tasks.findIndex(task => task.id === id);
    if (index >= 0) {
      tasks[index].done = !tasks[index].done;
    }
    setTasks([...tasks]);
  }

  function handleRemoveTask(id: number) {
    setTasks(oldTasks => oldTasks.filter(
      task => task.id != id 
    ));
  }


  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})