import { ConfirmDialog, ConfirmDialogOptions } from 'primereact/confirmdialog';

interface IDeleteTask extends ConfirmDialogOptions {}

export default function DeleteTask({ visible, onHide }: IDeleteTask) {
  return (
    <ConfirmDialog
      visible={visible}
      onHide={onHide}
      header={`Delete task `}
      message
    />
  );
}
