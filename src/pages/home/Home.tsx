import { useState, useRef } from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { isAfter } from 'date-fns';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputSwitch } from 'primereact/inputswitch';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';

import CreateTask from '../../components/task/create/CreateTask';
import { api } from '../../lib/api';

interface ISimpleItem {
  id: number;
  name: string;
}

export interface ITask {
  id: number;
  title: string;
  description?: string;
  due_date: string;
  assignee: ISimpleItem[];
  priority: ISimpleItem;
  status: ISimpleItem;
  created_at: string;
  updated_at: string;
}

export default function Home() {
  const toast = useRef<Toast>(null);

  const {
    data: tasks,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  async function getTasks() {
    try {
      const { data } = await api.get('tasks');

      return data as ITask[];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      } else {
        console.error(error);
      }
    }
  }

  const [hideDone, setHideDone] = useState(false);

  const [createTaskVisible, setCreateTaskVisible] = useState(false);

  function resolveDueDate(data: ITask) {
    return data.status.id !== 3 && isAfter(new Date(), new Date(data.due_date));
  }

  function HeaderBody() {
    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
      e.preventDefault();
      setCreateTaskVisible(true);
    };

    return (
      <div className="flex align-items-center justify-content-between">
        <h1 className="m-0 p-0">Tasks</h1>
        <div className="flex flex-column align-items-center">
          <label htmlFor="hideDone">Hide Done</label>
          <InputSwitch
            id="hideDone"
            checked={hideDone}
            onChange={(e) => setHideDone(Boolean(e.value))}
          />
        </div>
        <div>
          <Button label="New Task" icon="pi pi-plus" onClick={handleClick} />
        </div>
      </div>
    );
  }

  function StatusRowGroupHeader(rowData: ITask) {
    let color = '';

    switch (rowData.status.id) {
      case 3:
        color = 'teal';
        break;
      case 4:
        color = 'red';
        break;
      default:
    }

    return (
      <h3 className={`font-bold m-0 p-0 text-${color}-400`}>
        {rowData.status.name}
      </h3>
    );
  }

  function DueDateBody(rowData: ITask) {
    const dueDate = new Date(rowData.due_date).toLocaleString();

    return (
      <>
        <span>{dueDate}</span>
        {resolveDueDate(rowData) && (
          <span className="font-bold ml-2">(Overdue)</span>
        )}
      </>
    );
  }

  function PriorityBody(rowData: ITask) {
    let icon = '';
    let color = '';

    switch (rowData.priority.id) {
      case 1:
        icon = 'pi-chevron-down';
        color = 'cyan';
        break;
      case 2:
        icon = 'pi-minus';
        color = 'green';
        break;
      case 3:
        icon = 'pi-chevron-up';
        color = 'red';
        break;
      default:
    }

    return (
      <div className="flex align-items-center px-2">
        <span
          aria-label={rowData.priority.name.toLowerCase()}
          className={`pi ${icon} text-${color}-300 text-xl mr-2`}
        />
        <span>{rowData.priority.name}</span>
      </div>
    );
  }

  function TaskDetailsButton() {
    return (
      <Button
        type="button"
        name="taskDetails"
        severity="info"
        icon="pi pi-list"
      />
    );
  }

  function TaskDeleteButton() {
    return (
      <Button
        type="button"
        name="taskDelete"
        severity="danger"
        icon="pi pi-trash"
      />
    );
  }

  return (
    <>
      <Toast ref={toast} />

      <CreateTask
        createTaskVisible={createTaskVisible}
        setCreateTaskVisible={setCreateTaskVisible}
        refetch={refetch}
        toast={toast}
      />

      <DataTable
        value={
          hideDone ? tasks?.filter((e: ITask) => e.status.id !== 2) : tasks
        }
        showGridlines
        loading={isLoading}
        dataKey="id"
        size="small"
        header={HeaderBody}
        emptyMessage="No tasks yet, milord."
        rowGroupMode="subheader"
        groupRowsBy="status.id"
        rowGroupHeaderTemplate={StatusRowGroupHeader}
        sortMode="multiple"
        multiSortMeta={[
          { field: 'status', order: -1 },
          { field: 'due_date', order: 1 },
          { field: 'priority', order: 1 },
        ]}
        rowClassName={(rowData) =>
          classNames({
            'bg-teal-700': rowData.status.id === 3,
            'bg-red-800': resolveDueDate(rowData),
          })
        }
      >
        <Column
          field="title"
          header="Title"
          filterPlaceholder="Search by title"
          filter
        />
        <Column
          header="Due Date"
          field="due_date"
          dataType="date"
          body={DueDateBody}
        />
        <Column
          field="priority"
          header="Priority"
          className="col-1"
          align="center"
          body={PriorityBody}
        />
        <Column
          header="Details"
          className="col-1"
          align="center"
          body={TaskDetailsButton}
        />
        <Column
          header="Delete"
          className="col-1"
          align="center"
          body={TaskDeleteButton}
        />
      </DataTable>
    </>
  );
}
