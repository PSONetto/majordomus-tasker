import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="flex shadow-1 font-bold align-items-center">
      <div className="flex flex-column col-9 p-0 pl-3">
        <Link
          to="https://github.com/PSONetto/majordomus-tasker"
          target="_blank"
        >
          <span className="pi pi-github mr-1" />
          GitHub
        </Link>
        <Link to="https://linkedin.com/in/plinio-netto" target="_blank">
          <span className="pi pi-linkedin mr-1" />
          Linkedin
        </Link>
      </div>
      <div className="flex align-items-center col-3">
        <Link to="https://github.com/PSONetto" target="_blank">
          <span className="ml-3">Developed by PSONetto</span>
        </Link>
      </div>
    </footer>
  );
}