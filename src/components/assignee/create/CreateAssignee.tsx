import { useState, SetStateAction, RefObject } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from '@tanstack/react-query';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import { api } from '../../../api/api';
import { useAuth } from '../../../contexts/auth/AuthContext';
import { IAssignee } from '../../../pages/collaborators/Collaborators';
import handleAPIError from '../../../utils/functions/handleAPIError';
import FormDialog from '../../form/dialog/FormDialog';
import MTInputText from '../../form/input/InputText';

interface ICreateAssigneeProps {
  toast: RefObject<Toast>;
  createAssigneeVisible: boolean;
  setCreateAssigneeVisible: React.Dispatch<SetStateAction<boolean>>;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<IAssignee[] | undefined, unknown>>;
}

export default function CreateAssignee({
  toast,
  createAssigneeVisible,
  setCreateAssigneeVisible,
  refetch,
}: ICreateAssigneeProps) {
  const { control, handleSubmit, reset } = useForm();

  const { user } = useAuth();

  const [postLoading, setPostLoading] = useState(false);

  async function onConfirm(formData: FieldValues) {
    setPostLoading(true);

    try {
      console.log(user);
      const assigneeParams = {
        name: formData.name,
        user_id: user?.id,
      };

      const { data } = await api.post('assignees', assigneeParams);

      toast.current?.show({
        severity: 'success',
        summary: 'Assignee Created!',
        detail: `Assignee with ID: [${data.id}] and Name: [${data.name}] created successefully.`,
        life: 6000,
      });

      reset();
      refetch();
    } catch (error) {
      handleAPIError(error, toast);
    } finally {
      setPostLoading(false);
    }
  }

  function formFooter() {
    return (
      <div>
        <Button
          name="reset"
          form="createForm"
          className="p-button-danger"
          type="reset"
          label="Reset"
          icon="pi pi-times"
          loading={postLoading}
        />
        <Button
          name="confirm"
          form="createForm"
          type="submit"
          label="Confirm"
          icon="pi pi-check"
          loading={postLoading}
        />
      </div>
    );
  }

  return (
    <FormDialog
      visible={createAssigneeVisible}
      setVisible={setCreateAssigneeVisible}
      label="Create New Collaborator"
      iconLabel="pi-plus"
      footer={formFooter}
      form="createForm"
      onSubmit={postLoading ? () => {} : handleSubmit(onConfirm)}
      onReset={() => reset()}
    >
      <MTInputText
        control={control}
        name="name"
        label="Name"
        autoFocus
        required
      />
    </FormDialog>
  );
}
