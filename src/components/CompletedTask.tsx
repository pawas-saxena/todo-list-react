import React from 'react';
import { TaskType } from '../types';
import styled from 'styled-components';

type Prop = {
  taskObject: TaskType;
};

const ReadOnlyTaskContainer = styled.div``;

const Task: React.FC<Prop> = ({ taskObject }: Prop) => {
  return (
    <div>
      <ReadOnlyTaskContainer>
        <div>{taskObject.title}</div>
        <div>
          {taskObject.completedDate &&
            new Date(taskObject.completedDate).toLocaleString()}
        </div>
      </ReadOnlyTaskContainer>
    </div>
  );
};

export default Task;
