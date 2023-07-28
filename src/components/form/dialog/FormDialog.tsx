import { SetStateAction } from 'react';

import { Dialog } from 'primereact/dialog';

interface IFormDialog {
  children: JSX.Element | JSX.Element[];
  visible: boolean;
  label: string;
  iconLabel: string;
  setVisible: React.Dispatch<SetStateAction<boolean>>;
  onSubmit: () => void;
}

export default function FormDialog({
  children,
  visible,
  label,
  iconLabel,
  setVisible,
  onSubmit,
}: IFormDialog) {
  return (
    <Dialog
      onHide={() => setVisible(false)}
      visible={visible}
      header={
        <div>
          {iconLabel && <span className={`pi ${iconLabel} mr-1`} />}
          {label}
        </div>
      }
      className="w-11 md:w-6"
    >
      <form onSubmit={onSubmit}>
        <div className="flex flex-wrap">{children}</div>
      </form>
    </Dialog>
  );
}
