import { useState } from 'react';
import { FieldValues } from 'react-hook-form';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputSwitch } from 'primereact/inputswitch';
import { classNames } from 'primereact/utils';

import CreateTask from '../../components/task/create/CreateTask';

export default function Home() {
  const [hideDone, setHideDone] = useState(false);

  const [createTaskVisible, setCreateTaskVisible] = useState(false);

  const tasks = [
    {
      id: 0,
      title: 'Task 1',
      priority: 1,
      'due-date': new Date('03/08/2023'),
      status: 0,
    },
    {
      id: 1,
      title: 'Task 2',
      priority: 0,
      'due-date': new Date(),
      status: 0,
    },
    {
      id: 2,
      title: 'Task 3',
      priority: 2,
      'due-date': new Date(),
      status: 2,
    },
  ];

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setCreateTaskVisible(true);
  }

  function rowClassName(rowData: FieldValues) {
    return classNames({
      'bg-teal-700': rowData.status === 2,
      'bg-red-800': rowData.status === 3,
    });
  }

  function HeaderBody() {
    return (
      <div className="flex align-items-center justify-content-between">
        <h1 className="m-0 p-0">Tasks</h1>
        <div className="flex flex-column align-items-center">
          <span>Hide Done</span>
          <InputSwitch
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

  function StatusRowGroupHeader(rowData: FieldValues) {
    let label = '';
    let color = '';

    switch (rowData.status) {
      case 0:
        label = 'Todo';
        break;
      case 1:
        label = 'Doing';
        break;
      case 2:
        label = 'Done';
        color = 'teal';
        break;
      case 3:
        label = 'Overdue';
        color = 'red';
        break;
    }

    return <h3 className={`font-bold m-0 p-0 text-${color}-400`}>{label}</h3>;
  }

  function DueDateBody(rowData: FieldValues) {
    return rowData['due-date'].toLocaleDateString();
  }

  function PriorityBody(rowData: FieldValues) {
    return rowData.priority === 2 ? (
      <Button
        icon="pi pi-chevron-up"
        severity="danger"
        aria-label="high-priority"
        tooltip="High"
        tooltipOptions={{ position: 'left' }}
      />
    ) : rowData.priority === 1 ? (
      <Button
        icon="pi pi-minus"
        severity="warning"
        aria-label="medium-priority"
        tooltip="Medium"
        tooltipOptions={{ position: 'left' }}
      />
    ) : (
      <Button
        icon="pi pi-chevron-down"
        severity="info"
        aria-label="low-priority"
        tooltip="Low"
        tooltipOptions={{ position: 'left' }}
      />
    );
  }

  return (
    <>
      <CreateTask
        createTaskVisible={createTaskVisible}
        setCreateTaskVisible={setCreateTaskVisible}
      />

      <div>
        <DataTable
          value={hideDone ? tasks.filter((e) => e.status !== 2) : tasks}
          showGridlines
          loading={false}
          dataKey="id"
          size="small"
          header={HeaderBody}
          emptyMessage="No tasks yet, milord."
          rowGroupMode="subheader"
          groupRowsBy="status"
          rowGroupHeaderTemplate={StatusRowGroupHeader}
          sortMode="multiple"
          multiSortMeta={[{ field: 'status', order: -1 }]}
          reorderableRows
          rowClassName={rowClassName}
        >
          <Column
            field="title"
            header="Title"
            filterPlaceholder="Search by title"
            filter
            sortable
          />
          <Column
            header="Due Date"
            field="due-date"
            dataType="date"
            sortable
            body={DueDateBody}
          />
          <Column
            field="priority"
            header="Priority"
            className="col-1"
            align="center"
            sortable
            body={PriorityBody}
          />
        </DataTable>
      </div>
    </>
  );
}
