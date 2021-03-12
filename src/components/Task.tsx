import React, { useState } from 'react';
import { TaskType } from '../types';
import styled from 'styled-components';
import { FlexRowDiv, TaskTitle } from '../commonStyles';
import IconButton from './IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPen, faSave } from '@fortawesome/free-solid-svg-icons';

type Prop = {
  taskObject: TaskType;
  toggleCompleted: (id: string) => void;
  onDelete: (id: string) => void;
  onSave: (id: string, title: string) => void;
};

const TaskTitleWithStrikeThrough = styled(TaskTitle)`
  text-decoration: ${(props: { isCompleted: boolean }) =>
    props.isCompleted ? 'line-through' : ''};
`;

const TaskRowRoot = styled(FlexRowDiv)`
  align-items: center;
  border-bottom: 1px solid grey;
  padding-bottom: 5px;
  margin: 5px 20px;
  flex-basis: auto;
  input[type='checkbox'] {
    width: 5%;
    cursor: pointer;
  }
  input[type='text'] {
    width: 90%;
    border-radius: 3px;
  }
  ${TaskTitle} {
    width: 90%;
  }
`;

const Task: React.FC<Prop> = ({
  taskObject,
  toggleCompleted,
  onDelete,
  onSave,
}: Prop) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [taskTitle, setTaskTitle] = useState<string>('');

  return (
    <TaskRowRoot>
      <input
        type="checkbox"
        onChange={() => {
          toggleCompleted(taskObject.id);
        }}
        name={taskObject.id}
        checked={taskObject.isCompleted}
      />
      {isEditable ? (
        <>
          <input
            type="text"
            value={taskTitle}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTaskTitle(event.currentTarget.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                onSave(taskObject.id, taskTitle);
                setIsEditable(false);
              }
            }}
          />
          <IconButton
            onClick={() => {
              onSave(taskObject.id, taskTitle);
              setIsEditable(false);
            }}
            icon={<FontAwesomeIcon icon={faSave} size="1x" />}
          />
        </>
      ) : (
        <>
          <TaskTitleWithStrikeThrough isCompleted={taskObject.isCompleted}>
            {taskObject.title}
          </TaskTitleWithStrikeThrough>
          <IconButton
            onClick={() => onDelete(taskObject.id)}
            icon={<FontAwesomeIcon icon={faTimes} size="1x" />}
          />
          <IconButton
            onClick={() => {
              setTaskTitle(taskObject.title);
              setIsEditable(true);
            }}
            icon={<FontAwesomeIcon icon={faPen} size="1x" />}
          />
        </>
      )}
    </TaskRowRoot>
  );
};

export default Task;
