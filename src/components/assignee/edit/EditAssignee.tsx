import { RefObject, SetStateAction } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery,
} from '@tanstack/react-query';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import { api } from '../../../api/api';
import { IAssignee } from '../../../pages/collaborators/Collaborators';
import handleAPIError from '../../../utils/functions/handleAPIError';
import FormDialog from '../../form/dialog/FormDialog';
import MTInputText from '../../form/input/InputText';
import Loading from '../../loading/Loading';

interface IEditAssigneeProps {
  toast: RefObject<Toast>;
  editAssigneeVisible: boolean;
  assigneeID: string;
  setEditAssigneeVisible: React.Dispatch<SetStateAction<boolean>>;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<IAssignee[] | undefined, unknown>>;
}

export default function EditAssignee({
  toast,
  editAssigneeVisible,
  assigneeID,
  setEditAssigneeVisible,
  refetch,
}: IEditAssigneeProps) {
  const { control, handleSubmit, reset } = useForm();

  const {
    data: assignee,
    isLoading: isLoadingAssignee,
    refetch: refetchAssignee,
  } = useQuery({
    queryKey: ['assignees', assigneeID],
    queryFn: ({ queryKey }) => getAssignee(queryKey[0], queryKey[1]),
  });

  async function getAssignee(url: string, id: string) {
    try {
      const { data } = await api.get(`${url}/${id}`);

      return data as IAssignee;
    } catch (error) {
      handleAPIError(error, toast);
    }
  }

  async function onConfirm(formData: FieldValues) {
    try {
      const assigneeParams = {
        name: formData.name,
      };

      const { data } = await api.put(`assignees/${assigneeID}`, assigneeParams);

      toast.current?.show({
        severity: 'success',
        summary: 'Collaborator Edited!',
        detail: `Collaborator with ID: [${data.id}] edited successefully.`,
        life: 6000,
      });

      refetchAssignee();
      refetch();
    } catch (error) {
      handleAPIError(error, toast);
    }
  }

  function formFooter() {
    return (
      <div>
        <Button
          name="reset"
          form="editForm"
          className="p-button-danger"
          type="reset"
          label="Reset"
          icon="pi pi-times"
        />
        <Button
          name="confirm"
          form="editForm"
          type="submit"
          label="Confirm"
          icon="pi pi-check"
        />
      </div>
    );
  }

  return (
    <FormDialog
      visible={editAssigneeVisible}
      setVisible={setEditAssigneeVisible}
      label="Edit Collaborator"
      iconLabel="pi-list"
      footer={formFooter}
      form="editForm"
      onSubmit={handleSubmit(onConfirm)}
      onReset={() => reset()}
    >
      {isLoadingAssignee ? (
        <Loading />
      ) : assignee ? (
        <>
          <MTInputText
            control={control}
            name="name"
            label="Name"
            required
            defaultValue={assignee.name}
          />
        </>
      ) : (
        <div>
          <span>Assignee Not Found</span>
        </div>
      )}
    </FormDialog>
  );
}
