import { RefObject, SetStateAction, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery,
} from '@tanstack/react-query';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import { api } from '../../../lib/api';
import { ITask } from '../../../pages/home/Home';
import getOptionsData from '../../../utils/functions/getOptionsData';
import handleAPIError from '../../../utils/functions/handleAPIError';
import MTCalendar from '../../form/calendar/Calendar';
import FormDialog from '../../form/dialog/FormDialog';
import MTInputText from '../../form/input/InputText';
import MTRadioButton from '../../form/radio/RadioButton';
import MTMultiSelect from '../../form/select/MultiSelect';
import Loading from '../../loading/Loading';

interface IEditTaskProps {
  toast: RefObject<Toast>;
  editTaskVisible: boolean;
  taskID: string;
  setEditTaskVisible: React.Dispatch<SetStateAction<boolean>>;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<ITask[] | undefined, unknown>>;
}

export default function EditTask({
  toast,
  editTaskVisible,
  taskID,
  setEditTaskVisible,
  refetch,
}: IEditTaskProps) {
  const { control, handleSubmit, reset } = useForm();

  const { data: priorities, isLoading: isLoadingPriorities } = useQuery({
    queryKey: ['priorities'],
    queryFn: ({ queryKey }) => getOptionsData(queryKey[0]),
  });

  const { data: statuses, isLoading: isLoadingStatuses } = useQuery({
    queryKey: ['statuses'],
    queryFn: ({ queryKey }) => getOptionsData(queryKey[0]),
  });

  const { data: assignees, isLoading: isLoadingAssignees } = useQuery({
    queryKey: ['assignees'],
    queryFn: ({ queryKey }) => getOptionsData(queryKey[0]),
  });

  const {
    data: task,
    isLoading: isLoadingTask,
    refetch: refetchTask,
  } = useQuery({
    queryKey: ['tasks', taskID],
    queryFn: ({ queryKey }) => getTask(queryKey[0], queryKey[1]),
  });

  const [editing, setEditing] = useState(false);

  async function getTask(url: string, id: string) {
    try {
      const { data } = await api.get(`${url}/${id}`);

      return data as ITask;
    } catch (error) {
      handleAPIError(error, toast);
    }
  }

  async function onConfirm(formData: FieldValues) {
    try {
      const taskParams = {
        title: formData.title,
        description: formData.description,
        due_date: formData.due_date.toISOString(),
        priority_id: formData.priority_id,
        assignee: formData.assignee,
      };

      const { data } = await api.put(`tasks/${taskID}`, taskParams);

      toast.current?.show({
        severity: 'success',
        summary: 'Task Edited!',
        detail: `Task with ID: [${data.id}] edited successefully.`,
        life: 6000,
      });

      refetchTask();
      refetch();
      setEditing(false);
    } catch (error) {
      handleAPIError(error, toast);
    }
  }

  function formFooter() {
    return (
      <div>
        {editing ? (
          <>
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
          />
        )}
      </div>
    );
  }

  return (
    <FormDialog
      visible={editTaskVisible}
      setVisible={setEditTaskVisible}
      label="Task Details"
      iconLabel="pi-list"
      footer={formFooter}
      form="editForm"
      onSubmit={handleSubmit(onConfirm)}
      onReset={() => reset()}
    >
      {isLoadingTask ? (
        <Loading />
      ) : task ? (
        <>
          <MTInputText
            control={control}
            name="title"
            label="Title"
            required
            defaultValue={task.title}
            disabled={!editing}
          />
          <MTInputText
            control={control}
            name="description"
            label="Description"
            defaultValue={task.description}
            disabled={!editing}
          />
          <MTMultiSelect
            control={control}
            label="Assignee"
            name="assignee"
            filter
            options={assignees}
            required
            placeholder="Select one or more assignees"
            loading={isLoadingAssignees}
            defaultValues={task.assignees?.map((e) => e.id)}
            disabled={!editing}
          />
          {/* Issue: date not showing in the input after reset() */}
          <MTCalendar
            control={control}
            name="due_date"
            label="Due Date"
            required
            showTime
            defaultValue={new Date(task.due_date)}
            disabled={!editing}
          />
          {isLoadingPriorities ? (
            <Loading />
          ) : (
            <MTRadioButton
              control={control}
              name="priority_id"
              label="Priority"
              options={priorities}
              defaultValue={task.priority.id}
              required
              disabled={!editing}
              cols={6}
            />
          )}
          {isLoadingStatuses ? (
            <Loading />
          ) : (
            <MTRadioButton
              control={control}
              name="status_id"
              label="Status"
              options={statuses}
              defaultValue={task.status.id}
              required
              disabled={!editing}
              cols={6}
            />
          )}
        </>
      ) : (
        <div>
          <span>Task Not Found</span>
        </div>
      )}
    </FormDialog>
  );
}
