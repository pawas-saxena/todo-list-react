import React, { useState } from 'react';
import TaskComponent from './components/Task';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import taskData from './tasksData';
import { TaskType } from './types';
import { v4 as uuidv4 } from 'uuid';
import CompletedTask from './components/CompletedTask';

const IncompleteTaskContainer = styled.div``;
const CompletedTaskContainer = styled.div``;

function App() {
  const [taskArray, setTaskArray] = useState<TaskType[]>(taskData);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  /**
   *
   * @param newTaskTitle
   */
  const addTask = (newTaskTitle: string): void => {
    const newTask: TaskType = {
      id: uuidv4(),
      title: newTaskTitle,
      isCompleted: false,
    };

    setTaskArray([...taskArray, newTask]);
    setNewTaskTitle('');
  };

  const deleteTask = (id: string): void => {
    setTaskArray(taskArray.filter((task: TaskType) => task.id !== id));
  };

  const toggleCompleteStatus = (id: string) => {
    setTaskArray(
      taskArray.map((task: TaskType) =>
        task.id === id
          ? {
              ...task,
              isCompleted: !task.isCompleted,
              completedDate: !task.isCompleted
                ? new Date().getTime()
                : undefined,
            }
          : task
      )
    );
  };

  const onSave = (id: string, newTitle: string): void => {
    setTaskArray(
      taskArray.map((task: TaskType) =>
        task.id === id
          ? {
              ...task,
              title: newTitle,
            }
          : task
      )
    );
  };

  // const updateTask

  return (
    <div className="App">
      <div>TO DO LIST</div>
      <div>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setNewTaskTitle(event.currentTarget.value);
          }}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
              addTask(newTaskTitle);
            }
          }}
        ></input>
        <div onClick={() => addTask(newTaskTitle)}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
      <IncompleteTaskContainer>
        <h1>Incomplete</h1>
        {taskArray.map((task: TaskType) => (
          <TaskComponent
            taskObject={task}
            toggleCompleted={toggleCompleteStatus}
            onDelete={deleteTask}
            onSave={onSave}
          />
        ))}
      </IncompleteTaskContainer>
      <CompletedTaskContainer>
        <h1>Completed</h1>
        {taskArray
          .filter((task: TaskType) => task.isCompleted === true)
          .map((task: TaskType) => (
            <CompletedTask taskObject={task} />
          ))}
      </CompletedTaskContainer>
    </div>
  );
}

export default App;
