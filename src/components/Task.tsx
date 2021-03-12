import React, { useState } from 'react';
import { TaskType } from '../types';
import styled from 'styled-components';

type Prop = {
  taskObject: TaskType;
  toggleCompleted: (id: string) => void;
  onDelete: (id: string) => void;
  onSave: (id: string, title: string) => void;
};

const ReadOnlyTaskContainer = styled.div`
  p {
    text-decoration: ${(props: { isCompleted: boolean }) =>
      props.isCompleted ? 'line-through' : ''};
  }
`;

const EditableTaskContainer = styled.div``;

const Task: React.FC<Prop> = ({
  taskObject,
  toggleCompleted,
  onDelete,
  onSave,
}: Prop) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [taskTitle, setTaskTitle] = useState<string>('');
  return (
    <div>
      <input
        type="checkbox"
        onChange={() => {
          toggleCompleted(taskObject.id);
        }}
        name={taskObject.id}
        checked={taskObject.isCompleted}
      />
      {isEditable ? (
        <EditableTaskContainer>
          <input
            type="text"
            value={taskTitle}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
              if (event.key === 'Enter') {
                onSave(taskObject.id, taskTitle);
                setIsEditable(false);
              } else {
                setTaskTitle(event.currentTarget.value + event.key);
              }
            }}
          />
          <div
            onClick={() => {
              onSave(taskObject.id, taskTitle);
              setIsEditable(false);
            }}
          >
            save
          </div>
        </EditableTaskContainer>
      ) : (
        <ReadOnlyTaskContainer isCompleted={taskObject.isCompleted}>
          <p>{taskObject.title}</p>
          <div onClick={() => onDelete(taskObject.id)}>x</div>
          <div
            onClick={() => {
              setTaskTitle(taskObject.title);
              setIsEditable(true);
            }}
          >
            edit
          </div>
        </ReadOnlyTaskContainer>
      )}
    </div>
  );
};

export default Task;
