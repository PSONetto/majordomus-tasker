import { useState } from 'react';

import { Button } from 'primereact/button';

import CreateTask from '../../components/task/create/CreateTask';

export default function Home() {
  const [createTaskVisible, setCreateTaskVisible] = useState(false);

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setCreateTaskVisible(true);
  }

  return (
    <>
      <CreateTask
        createTaskVisible={createTaskVisible}
        setCreateTaskVisible={setCreateTaskVisible}
      />

      <Button label="New Task" icon="pi pi-plus" onClick={handleClick} />
    </>
  );
}
