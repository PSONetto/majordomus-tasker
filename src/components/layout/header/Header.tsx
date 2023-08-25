import { Link } from 'react-router-dom';

import { Button } from 'primereact/button';

export default function Header() {
  return (
    <header className="flex align-items-center shadow-1">
      <div
        id="logo"
        className="flex flex-column align-items-center border-1 border-round px-2 ml-1"
      >
        <h2 className="m-0 p-0 underline">Majordomus</h2>
        <h4 className="m-0 p-0">Tasker</h4>
      </div>
      <div className="flex align-items-center ml-8">
        <Link to="/" className="mr-2">
          <Button name="tasks" label="Tasks" text />
        </Link>
        <Link to="collaborators">
          <Button name="collaborators" label="Collaborators" text />
        </Link>
      </div>
    </header>
  );
}
