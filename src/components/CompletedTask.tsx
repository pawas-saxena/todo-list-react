import React from 'react';
import { TaskType } from '../types';
import styled from 'styled-components';
import { FlexRowDiv, TaskTitle } from '../commonStyles';

type Prop = {
  taskObject: TaskType;
};

const ReadOnlyTaskContainer = styled(FlexRowDiv)`
  align-items: center;
  border-bottom: 1px solid grey;
  padding-bottom: 5px;
  margin: 5px 20px;
  flex-basis: auto;
  ${TaskTitle} {
    width: 70%;
  }
  span {
    width: 30%;
    font-size: 13px;
  }
`;

const Task: React.FC<Prop> = ({ taskObject }: Prop) => {
  return (
    <ReadOnlyTaskContainer>
      <TaskTitle>{taskObject.title}</TaskTitle>
      <span>
        {taskObject.completedDate &&
          new Date(taskObject.completedDate).toLocaleString()}
      </span>
    </ReadOnlyTaskContainer>
  );
};

export default Task;
