import { useState, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

import MTCalendar from '../../form/calendar/Calendar';
import FormDialog from '../../form/dialog/FormDialog';
import MTInputText from '../../form/input/InputText';
import MTRadioButton from '../../form/radio/RadioButton';
import MTMultiSelect from '../../form/select/MultiSelect';

interface ICreateTaskProps {
  createTaskVisible: boolean;
  setCreateTaskVisible: React.Dispatch<SetStateAction<boolean>>;
}

export default function CreateTask({
  createTaskVisible,
  setCreateTaskVisible,
}: ICreateTaskProps) {
  const { control, handleSubmit } = useForm();

  const [priority, setPriority] = useState(0);
  const [assignee, setAssignee] = useState<number>();

  const teams = [{ label: 'John Doe', value: 0 }];

  const priorities = [
    { value: 0, label: 'Low' },
    { value: 1, label: 'Medium' },
    { value: 2, label: 'High' },
  ];

  function onSubmitCreateTask() {
    console.log('submitted');
  }
  
  return (
    <FormDialog
      visible={createTaskVisible}
      setVisible={setCreateTaskVisible}
      label="Create New Task"
      iconLabel="pi-plus"
      onSubmit={handleSubmit(onSubmitCreateTask)}
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
        options={teams}
        setValue={setAssignee}
        value={assignee}
        required
        placeholder="Select one or more assignees"
        loading={false}
      />
      <MTCalendar
        control={control}
        name="due-date"
        label="Due Date"
        minDate={new Date()}
        required
      />
      <MTRadioButton
        control={control}
        name="priority"
        label="Priority"
        options={priorities}
        selectedOption={priority}
        setSelectedOption={setPriority}
        required
      />
    </FormDialog>
  );
}
