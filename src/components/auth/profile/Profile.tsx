import { SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from 'primereact/button';

import { useAuth } from '../../../contexts/auth/AuthContext';
import FormDialog from '../../form/dialog/FormDialog';
import MTInputText from '../../form/input/InputText';

interface IProfileProps {
  visible: boolean;
  setVisible: React.Dispatch<SetStateAction<boolean>>;
}

export default function Profile({ visible, setVisible }: IProfileProps) {
  const { control, reset } = useForm();

  const { user } = useAuth();

  const [editing, setEditing] = useState(false);

  function formFooter() {
    return (
      <div>
        {editing ? (
          <>
            <Button
              name="reset"
              form="profileForm"
              className="p-button-danger"
              type="reset"
              label="Reset"
              icon="pi pi-times"
            />
            <Button
              name="confirm"
              form="profileForm"
              type="submit"
              label="Confirm"
              icon="pi pi-check"
            />
          </>
        ) : (
          <Button
            name="toggleEdit"
            type="button"
            label="Edit"
            icon="pi pi-pencil"
            onClick={(e) => {
              e.preventDefault();
              setEditing(true);
            }}
            disabled
            tooltip="Not yet implemented"
            tooltipOptions={{ showOnDisabled: true, position: 'bottom' }}
          />
        )}
      </div>
    );
  }

  return (
    <FormDialog
      visible={visible}
      setVisible={setVisible}
      label="Profile"
      iconLabel="pi-user"
      footer={formFooter}
      form="profileForm"
      onSubmit={() => {}}
      onReset={() => reset()}
    >
      <MTInputText
        control={control}
        name="name"
        label="Name"
        required
        disabled={!editing}
        defaultValue={user?.name}
      />
      <MTInputText
        control={control}
        name="email"
        label="E-mail"
        required
        disabled={!editing}
        defaultValue={user?.email}
      />
    </FormDialog>
  );
}
