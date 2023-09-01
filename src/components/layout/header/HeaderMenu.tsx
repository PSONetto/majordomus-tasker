import { Link } from 'react-router-dom';

import { Button } from 'primereact/button';

export default function HeaderMenu() {
  return (
    <div className="flex align-items-center ml-8">
      <Link to="/" className="mr-2">
        <Button name="home" label="Home" text />
      </Link>
      <Link to="/tasks" className="mr-2">
        <Button name="tasks" label="Tasks" text />
      </Link>
      <Link to="collaborators">
        <Button name="collaborators" label="Collaborators" text />
      </Link>
    </div>
  );
}
