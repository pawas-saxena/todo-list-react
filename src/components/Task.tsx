import React from 'react';
import { TaskType } from '../types';

type Prop = {
  taskObject: TaskType;
};

const task: React.FC<Prop> = (prop: Prop) => {
  return (
    <div>
      <h1>Task</h1>
      {JSON.stringify(prop)}
    </div>
  );
};

export default task;
