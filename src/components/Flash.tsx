import React, { useState } from 'react';

type Prop = {};

type Flash = {
  message: string;
};

let count = 0;

const Task: React.FC<Prop> = ({}: Prop) => {
  const [flashArr, setFlashArr] = useState<Flash[]>([]);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const addFlash = () => {
    if (timer !== null) {
      clearTimeout(timer);
      setTimer(null);
    }

    const myTimer: NodeJS.Timeout = setTimeout(() => {
      setFlashArr([]);
      setTimer(null);
    }, 10000);

    setTimer(myTimer);
    setFlashArr([{ message: 'hey   ' + ++count }]);
  };
  return (
    <div>
      {JSON.stringify(flashArr)}
      <br />
      <button onClick={addFlash}>add flash</button>
    </div>
  );
};

export default Task;
