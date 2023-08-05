import { useState, SetStateAction, RefObject } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery,
} from '@tanstack/react-query';
import axios from 'axios';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import { api } from '../../../lib/api';
import { ITask } from '../../../pages/home/Home';
import getOptionsData from '../../../utils/functions/getOptionsData';
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

  const { data: priorities, isLoading: isLoadingPriorities } = useQuery({
    queryKey: ['priorities'],
    queryFn: ({ queryKey }) => getOptionsData(queryKey[0]),
  });

  const { data: assignees, isLoading: isLoadingAssignees } = useQuery({
    queryKey: ['assignees'],
    queryFn: ({ queryKey }) => getOptionsData(queryKey[0]),
  });

  const [priority, setPriority] = useState(1);
  const [assignee, setAssignee] = useState<number[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  function onReset() {
    reset();
    setAssignee([]);
    setPriority(1);
  }

  async function onConfirm(formData: FieldValues) {
    try {
      const taskParams = {
        title: formData.title,
        description: formData.description,
        due_date: formData.due_date.toISOString(),
        priority_id: formData.priority_id,
        status_id: 1,
        assignee: formData.assignee,
      };

      const { data } = await api.post('tasks', taskParams);

      toast.current?.show({
        severity: 'success',
        summary: 'Task Created!',
        detail: `Task with ID: [${data.id}] and Title: [${data.title}] created successefully.`,
        life: 6000,
      });

      onReset();
      refetch();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      } else {
        console.error(error);
      }
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
        />
        <Button
          name="confirm"
          form="createForm"
          type="submit"
          label="Confirm"
          icon="pi pi-check"
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
      onSubmit={handleSubmit(onConfirm)}
      onReset={onReset}
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
        setValue={setAssignee}
        value={assignee}
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
          selectedOption={priority}
          setSelectedOption={setPriority}
          required
        />
      )}
    </FormDialog>
  );
}
