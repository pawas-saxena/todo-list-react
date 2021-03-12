import React, { useState } from 'react';
import TaskComponent from './components/Task';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import taskData from './tasksData';
import { TaskType } from './types';

const IncompleteTaskContainer = styled.div``;
const CompletedTaskContainer = styled.div``;

const newTaskTitle: string = 'new Task';

function App() {
  const [taskArray, setTaskArray] = useState<TaskType[]>(taskData);

  const addTask = (): void => {
    console.log('add task clicked');
  };

  const deleteTask = (id: string): void => {
    console.log('delete clicked');
  };

  return (
    <div className="App">
      <div>TO DO LIST</div>
      <div>
        <input type="text" value={newTaskTitle}></input>
        <div onClick={addTask}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
      <IncompleteTaskContainer>
        <h1>Incomplete</h1>
        {taskArray
          .filter((task: TaskType) => task.isCompleted === false)
          .map((task: TaskType) => (
            <TaskComponent taskObject={task} />
          ))}
      </IncompleteTaskContainer>
      <CompletedTaskContainer>
        <h1>Completed</h1>
        {taskArray
          .filter((task: TaskType) => task.isCompleted === true)
          .map((task: TaskType) => (
            <TaskComponent taskObject={task} />
          ))}
      </CompletedTaskContainer>
    </div>
  );
}

export default App;
