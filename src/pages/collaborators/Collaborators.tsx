import { useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';

import { api } from '../../api/api';
import CreateAssignee from '../../components/assignee/create/CreateAssignee';
import EditAssignee from '../../components/assignee/edit/EditAssignee';
import { useAuth } from '../../contexts/auth/AuthContext';
import handleAPIError from '../../utils/functions/handleAPIError';

export interface IAssignee {
  id: number;
  name: string;
}

export default function Collaborators() {
  const toast = useRef<Toast>(null);

  const { user } = useAuth();

  const {
    data: assignees,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['assignees'],
    queryFn: getAssignees,
  });

  const [createAssigneeVisible, setCreateAssigneeVisible] = useState(false);
  const [editAssigneeVisible, setEditAssigneeVisible] = useState(false);

  const [assigneeID, setAssigneeID] = useState('');

  async function getAssignees() {
    try {
      const { data } = await api.get('assignees', {
        params: { user_id: user?.id },
      });

      return data as IAssignee[];
    } catch (error) {
      handleAPIError(error, toast);
    }
  }

  function TableHeader() {
    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
      e.preventDefault();
      setCreateAssigneeVisible(true);
    };

    return (
      <div className="flex align-items-center justify-content-between mb-1">
        <h1 className="m-0 p-0">Collaborators</h1>
        <div>
          <Button
            label="New Collaborator"
            icon="pi pi-plus"
            onClick={handleClick}
          />
        </div>
      </div>
    );
  }

  const confirmDelete = (rowData: IAssignee) => {
    confirmDialog({
      header: `Delete Collaborator "${rowData.name}"`,
      message: 'Are you sure you want to delete this collaborator?',
      icon: 'pi pi-exclamation-triangle text-red-600',
      acceptClassName: 'p-button-danger',
      acceptIcon: 'pi pi-trash',
      rejectIcon: 'pi pi-times',
      accept: async () => {
        try {
          await api.delete('assignees/' + rowData.id);
          refetch();
        } catch (error) {
          handleAPIError(error, toast);
        }
      },
    });
  };

  function AssigneeDetailsButton(rowData: IAssignee) {
    return (
      <span>
        <Button
          type="button"
          name="assigneeDetails"
          severity="info"
          icon="pi pi-pencil"
          onClick={(e) => {
            e.preventDefault();
            setAssigneeID(String(rowData.id));
            setEditAssigneeVisible(true);
          }}
        />
      </span>
    );
  }

  function AssigneeDeleteButton(rowData: IAssignee) {
    return (
      <Button
        type="button"
        name="assigneeDelete"
        severity="danger"
        icon="pi pi-trash"
        onClick={() => confirmDelete(rowData)}
      />
    );
  }

  return (
    <div>
      <Toast ref={toast} />

      {createAssigneeVisible && (
        <CreateAssignee
          createAssigneeVisible={createAssigneeVisible}
          setCreateAssigneeVisible={setCreateAssigneeVisible}
          refetch={refetch}
          toast={toast}
        />
      )}

      {editAssigneeVisible && (
        <EditAssignee
          editAssigneeVisible={editAssigneeVisible}
          setEditAssigneeVisible={setEditAssigneeVisible}
          assigneeID={assigneeID}
          refetch={refetch}
          toast={toast}
        />
      )}

      <ConfirmDialog />

      <DataTable
        name="assigneesList"
        value={assignees}
        showGridlines
        loading={isLoading || isFetching}
        dataKey="id"
        size="small"
        header={<TableHeader />}
        emptyMessage="No collaborators found."
        sortField="id"
        scrollHeight="60vh"
        editMode="cell"
      >
        <Column header="ID" field="id" align="center" className="col-1" />
        <Column header="Name" field="name" />
        <Column
          header="Edit"
          align="center"
          body={AssigneeDetailsButton}
          className="col-1"
        />
        <Column
          header="Delete"
          align="center"
          body={AssigneeDeleteButton}
          className="col-1"
        />
      </DataTable>
    </div>
  );
}
