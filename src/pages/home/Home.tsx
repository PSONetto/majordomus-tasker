import { Button } from 'primereact/button';

export default function Home() {
  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    console.log('Adding');
  }

  return (
    <>
      <Button label="Add Task" icon="pi pi-plus" onClick={handleClick} />
    </>
  );
}
