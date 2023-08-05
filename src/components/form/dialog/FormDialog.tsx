import { SetStateAction } from 'react';

import { Dialog, DialogProps } from 'primereact/dialog';

interface IFormDialog extends Partial<DialogProps> {
  children: JSX.Element | JSX.Element[];
  visible: boolean;
  label: string;
  iconLabel: string;
  form: string;
  setVisible: React.Dispatch<SetStateAction<boolean>>;
  onSubmit: () => void;
  onReset?: () => void;
}

export default function FormDialog({
  children,
  visible,
  label,
  iconLabel,
  footer,
  form,
  setVisible,
  onSubmit,
  onReset,
}: IFormDialog) {
  function DialogHeader() {
    return (
      <div>
        {iconLabel && <span className={`pi ${iconLabel} mr-1`} />}
        {label}
      </div>
    );
  }

  return (
    <Dialog
      onHide={() => setVisible(false)}
      visible={visible}
      footer={footer}
      header={DialogHeader}
      className="w-11 md:w-6"
    >
      <form onSubmit={onSubmit} onReset={onReset} id={form}>
        <div className="flex flex-wrap">{children}</div>
      </form>
    </Dialog>
  );
}
