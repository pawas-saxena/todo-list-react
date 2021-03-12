import React, { useState } from 'react';
import TaskComponent from './components/Task';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';
import taskData from './tasksData';
import { TaskType } from './types';
import { v4 as uuidv4 } from 'uuid';
import CompletedTask from './components/CompletedTask';
import { FlexColumnDiv, FlexRowDiv, Heading } from './commonStyles';
import IconButton from './components/IconButton';

const TodoListPageHeader = styled(FlexRowDiv)`
  font-size: 30px;
  margin-bottom: 40px;
  justify-content: center;
`;

const AppRoot = styled(FlexColumnDiv)`
  align-items: center;
  margin: 30px;
  width: 100%;
`;

const TodoContainer = styled(FlexColumnDiv)`
  width: 500px;
`;

const NewTaskContainer = styled(FlexColumnDiv)``;

const NewTaskInput = styled(FlexRowDiv)`
  padding: 0px 20px;
  max-width: 500px;
  input {
    flex-basis: auto;
    border-radius: 3px;
    margin-right: 10px;
    height: 30px;
    width: 97%;
  }
`;

const AllTaskListContainer = styled.div`
  margin-top: 20px;
`;
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

  return (
    <AppRoot>
      <TodoContainer>
        <TodoListPageHeader>TO DO LIST</TodoListPageHeader>
        <NewTaskContainer>
          <Heading>Add Item</Heading>
          <NewTaskInput>
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
            <IconButton
              onClick={() => addTask(newTaskTitle)}
              icon={<FontAwesomeIcon icon={faPlusSquare} size="2x" />}
            />
          </NewTaskInput>
        </NewTaskContainer>
        <AllTaskListContainer>
          <Heading>List</Heading>
          {taskArray.map((task: TaskType) => (
            <TaskComponent
              taskObject={task}
              toggleCompleted={toggleCompleteStatus}
              onDelete={deleteTask}
              onSave={onSave}
            />
          ))}
        </AllTaskListContainer>
        <CompletedTaskContainer>
          <Heading>Completed</Heading>
          {taskArray
            .filter((task: TaskType) => task.isCompleted === true)
            .map((task: TaskType) => (
              <CompletedTask taskObject={task} />
            ))}
        </CompletedTaskContainer>
      </TodoContainer>
    </AppRoot>
  );
}

export default App;
