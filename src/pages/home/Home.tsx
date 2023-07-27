import { Button } from 'primereact/button';

export default function Home() {
  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    console.log('Adding');
  }

  return (
    <main>
      <Button label="Add" icon="pi pi-plus" onClick={handleClick} />
    </main>
  );
}
