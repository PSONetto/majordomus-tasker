import { FallbackProps } from 'react-error-boundary';

import { Button } from 'primereact/button';

import './error.css';

export default function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert" className="flex flex-column col-12">
      <Button
        label="Return"
        icon="pi pi-replay"
        onClick={() => resetErrorBoundary()}
      />
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  );
}
