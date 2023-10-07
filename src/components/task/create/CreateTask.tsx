import { useState, SetStateAction, RefObject } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery,
} from '@tanstack/react-query';
import { setSeconds } from 'date-fns';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import { api } from '../../../api/api';
import { useAuth } from '../../../contexts/auth/AuthContext';
import { ITask } from '../../../pages/tasks/Tasks';
import getOptionsData from '../../../utils/functions/getOptionsData';
import handleAPIError from '../../../utils/functions/handleAPIError';
import MTCalendar from '../../form/calendar/Calendar';
import FormDialog from '../../form/dialog/FormDialog';
import MTInputText from '../../form/input/InputText';
import MTRadioButton from '../../form/radio/RadioButton';
import MTMultiSelect from '../../form/select/MultiSelect';
import Loading from '../../loading/Loading';

interface ICreateTaskProps {
  toast: RefObject<Toast>;
  createTaskVisible: boolean;
  setCreateTaskVisible: React.Dispatch<SetStateAction<boolean>>;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<ITask[] | undefined, unknown>>;
}

export default function CreateTask({
  toast,
  createTaskVisible,
  setCreateTaskVisible,
  refetch,
}: ICreateTaskProps) {
  const { control, handleSubmit, reset } = useForm();

  const { user } = useAuth();

  const { data: priorities, isLoading: isLoadingPriorities } = useQuery({
    queryKey: ['priorities'],
    queryFn: ({ queryKey }) => getOptionsData(queryKey[0]),
  });

  const { data: assignees, isLoading: isLoadingAssignees } = useQuery({
    queryKey: ['assignees'],
    queryFn: ({ queryKey }) => user && getOptionsData(queryKey[0], user),
  });

  const [currentTime, setCurrentTime] = useState(new Date());
  const [postLoading, setPostLoading] = useState(false);

  async function onConfirm(formData: FieldValues) {
    setPostLoading(true);

    try {
      const taskParams = {
        title: formData.title,
        description: formData.description,
        due_date: setSeconds(formData.due_date, 0).toISOString(),
        priority_id: formData.priority_id,
        status_id: 1,
        assignee: formData.assignee,
        user_id: user?.id,
      };

      const { data } = await api.post('tasks', taskParams);

      toast.current?.show({
        severity: 'success',
        summary: 'Task Created!',
        detail: `Task with ID: [${data.id}] and Title: [${data.title}] created successefully.`,
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
      visible={createTaskVisible}
      setVisible={setCreateTaskVisible}
      label="Create New Task"
      iconLabel="pi-plus"
      footer={formFooter}
      form="createForm"
      onSubmit={postLoading ? () => {} : handleSubmit(onConfirm)}
      onReset={() => reset()}
    >
      <MTInputText
        control={control}
        name="title"
        label="Title"
        autoFocus
        required
      />
      <MTInputText control={control} name="description" label="Description" />
      <MTMultiSelect
        control={control}
        label="Assignee"
        name="assignee"
        filter
        options={assignees}
        required
        placeholder="Select one or more assignees"
        loading={isLoadingAssignees}
      />
      <MTCalendar
        control={control}
        name="due_date"
        label="Due Date"
        rules={{
          validate: (value) => {
            setCurrentTime(new Date());
            return value >= currentTime || 'Past date, choose a future date';
          },
        }}
        minDate={currentTime}
        required
        showTime
        onShow={() => setCurrentTime(new Date())}
        onHide={() => setCurrentTime(new Date())}
      />
      {isLoadingPriorities ? (
        <Loading />
      ) : (
        <MTRadioButton
          control={control}
          name="priority_id"
          label="Priority"
          options={priorities}
          defaultValue={1}
          required
        />
      )}
    </FormDialog>
  );
}
