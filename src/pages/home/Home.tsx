import { useState, useRef } from 'react';

import { useQuery } from '@tanstack/react-query';
import { isAfter } from 'date-fns';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { DataTable, DataTableExpandedRows } from 'primereact/datatable';
import { InputSwitch } from 'primereact/inputswitch';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';

import CreateTask from '../../components/task/create/CreateTask';
import EditTask from '../../components/task/edit/EditTask';
import { api } from '../../lib/api';
import handleAPIError from '../../utils/functions/handleAPIError';

interface ISimpleItem {
  id: number;
  name: string;
}

export interface ITask {
  id: number;
  title: string;
  description?: string;
  due_date: string;
  assignees: ISimpleItem[];
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
    isFetching,
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
      handleAPIError(error, toast);
    }
  }

  const [hideDone, setHideDone] = useState(false);
  const [taskID, setTaskID] = useState('');

  const [createTaskVisible, setCreateTaskVisible] = useState(false);
  const [editTaskVisible, setEditTaskVisible] = useState(false);

  const [loadingDoneUpdate, setLoadingDoneUpdate] = useState(false);

  const [expandedRows, setExpandedRows] = useState<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    DataTableExpandedRows | any[]
  >();

  function resolveDueDate(data: ITask) {
    return data.status.id !== 3 && isAfter(new Date(), new Date(data.due_date));
  }

  function TableHeader() {
    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
      e.preventDefault();
      setCreateTaskVisible(true);
    };

    return (
      <div className="flex align-items-center justify-content-between mb-1">
        <h1 className="m-0 p-0">Tasks</h1>
        <div className="flex flex-column align-items-center">
          <label htmlFor="hideDone" className="mr-2 hidden md:block">
            Hide Done
          </label>
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
      <span className={`font-bold m-0 p-0 text-${color}-400 ml-2`}>
        {rowData.status.name}
      </span>
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

  function TaskDetailsButton(rowData: ITask) {
    return (
      <span>
        <Button
          type="button"
          name="taskDetails"
          severity="info"
          icon="pi pi-list"
          onClick={(e) => {
            e.preventDefault();
            setTaskID(String(rowData.id));
            setEditTaskVisible(true);
          }}
          loading={loadingDoneUpdate}
        />
      </span>
    );
  }

  async function updateStatus(rowData: ITask) {
    const currentStatus = rowData.status.id;

    if (currentStatus != 3) {
      setLoadingDoneUpdate(true);

      try {
        const params = {
          status_id: rowData.status.id === 2 ? 3 : 2,
        };

        await api.put(`tasks/${rowData.id}`, params);

        refetch();
      } catch (error) {
        handleAPIError(error, toast);
      } finally {
        setLoadingDoneUpdate(false);
      }
    }
  }

  function StatusBody(rowData: ITask) {
    const statusID = rowData.status.id;

    const label = statusID === 1 ? 'Doing' : 'Done';

    return statusID === 3 ? (
      <span className="pi pi-check" />
    ) : (
      <Button
        name="statusUpdate"
        type="button"
        label={label}
        onClick={(e) => {
          e.preventDefault();
          updateStatus(rowData);
        }}
      />
    );
  }

  const confirmDelete = (rowData: ITask) => {
    confirmDialog({
      header: `Delete Task "${rowData.title}"`,
      message: 'Are you sure you want to delete this task?',
      icon: 'pi pi-exclamation-triangle text-red-600',
      acceptClassName: 'p-button-danger',
      acceptIcon: 'pi pi-trash',
      rejectIcon: 'pi pi-times',
      accept: async () => {
        try {
          await api.delete('tasks/' + rowData.id);
          refetch();
        } catch (error) {
          handleAPIError(error, toast);
        }
      },
    });
  };

  function TaskDeleteButton(rowData: ITask) {
    return (
      <Button
        type="button"
        name="taskDelete"
        severity="danger"
        icon="pi pi-trash"
        onClick={() => confirmDelete(rowData)}
        loading={loadingDoneUpdate}
      />
    );
  }

  return (
    <div className="col-12">
      <Toast ref={toast} />

      {createTaskVisible && (
        <CreateTask
          createTaskVisible={createTaskVisible}
          setCreateTaskVisible={setCreateTaskVisible}
          refetch={refetch}
          toast={toast}
        />
      )}

      {editTaskVisible && (
        <EditTask
          editTaskVisible={editTaskVisible}
          setEditTaskVisible={setEditTaskVisible}
          taskID={taskID}
          refetch={refetch}
          toast={toast}
        />
      )}

      <ConfirmDialog />

      <DataTable
        name="tasksList"
        value={
          hideDone ? tasks?.filter((e: ITask) => e.status.id !== 3) : tasks
        }
        showGridlines
        loading={isLoading || isFetching}
        dataKey="id"
        size="small"
        header={<TableHeader />}
        emptyMessage="No tasks found."
        rowGroupMode="subheader"
        groupRowsBy="status.id"
        rowGroupHeaderTemplate={StatusRowGroupHeader}
        sortMode="multiple"
        scrollHeight="60vh"
        expandableRowGroups
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        multiSortMeta={[
          { field: 'status.id', order: -1 },
          { field: 'priority.id', order: -1 },
          { field: 'due_date', order: 1 },
        ]}
        rowClassName={(rowData) =>
          classNames({
            'bg-teal-700': rowData.status.id === 3,
            'bg-red-800': resolveDueDate(rowData),
          })
        }
      >
        <Column
          header="Status"
          body={StatusBody}
          className="col-1"
          align="center"
        />
        <Column
          field="title"
          header="Title"
          filterPlaceholder="Search by title"
          filter
          className="col-4"
        />
        <Column
          header="Due Date"
          field="due_date"
          dataType="date"
          body={DueDateBody}
          className="col-4"
        />
        <Column
          field="priority"
          header="Priority"
          align="center"
          body={PriorityBody}
          className="col-1"
        />
        <Column
          header="Details"
          align="center"
          body={TaskDetailsButton}
          className="col-1"
        />
        <Column
          header="Delete"
          align="center"
          body={TaskDeleteButton}
          className="col-1"
        />
      </DataTable>
    </div>
  );
}
