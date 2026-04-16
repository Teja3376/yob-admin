"use client";

import { useState } from "react";
import useGetAllRoles from "../../hooks/roles/useGetAllRoles";
import { useDebounce } from "@/config/useDebounce";
import { Delete, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Loading from "@/components/Loader";
import TableComponent from "@/components/common/TableComponent";
import Pagination from "@/components/common/Pagination";
import { useRouter } from "next/navigation";
import { rolesCols } from "../../schemas/rolesCols";
import AddRoleDialog from "../components/RoleDialogBox";
import { Button } from "@/components/ui/button";
import useCreateRole from "../../hooks/roles/useCreateRole";
import { toast } from "sonner";
import useGetRoleById from "../../hooks/roles/useGetRoleById";
import useUpdateRole from "../../hooks/roles/useUpdateRole";
import DeleteDialog from "../components/DeleteDialog";
import { set } from "date-fns";
import useDeleteRole from "../../hooks/roles/useDeleteRole";
import { useAuthStore1 } from "@/modules/adminauth/state/adminAuthStore";
import PageTitle from "@/components/PageTitle";

const RolesPage = () => {
  const router = useRouter();
  const { hasPermission } = useAuthStore1();
  const canView = hasPermission("roles", "review");
  const canDoAction = hasPermission("roles", "action");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [deleteRoleId, setDeleteRoleId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchQuery = useDebounce(searchTerm, 500);
  const { data: role, isFetching: isRoleLoading } = useGetRoleById(
    editingRoleId as string,
  );
  const {
    data,
    isFetching: isRolesLoading,
    isError,
    error,
  } = useGetAllRoles(page, limit, searchQuery);
  const pagination = data?.pagination;

  const { mutate: createRole, isPending: isRoleCreating,isError: isRoleCreateError ,error: roleCreateError} = useCreateRole();
  const { mutate: updateRole, isPending: isRoleUpdating,isError: isRoleUpdateError ,error: roleUpdateError} = useUpdateRole();
  const { mutate: deleteRole, isPending: isRoleDeleting ,isError: isRoleDeleteError ,error: roleDeleteError} = useDeleteRole();

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };
  const onPageSizeChange = (pageSize: number) => {
    setLimit(pageSize);
    setPage(1);
  };
  const handleEditRole = (roleId: string) => {
    setEditingRoleId(roleId);
    setIsRoleDialogOpen(true);
  };
  const handleDeleteRole = (roleId: string) => {
    setDeleteRoleId(roleId);
    setIsDeleteDialogOpen(true);
  };

  const cols = rolesCols(
    router,
    handleEditRole,
    handleDeleteRole,
    canView,
    canDoAction,
  );

  const handleCreateRole = (data: any) => {
    createRole(data, {
      onSuccess: () => {
        toast.success("Role created successfully");
        setIsRoleDialogOpen(false);
      },
      onError: (err) => {
        // toast.error(
        //   `Error creating role: ${err?.message || "Unknown error occurred"}`,
        // );
        
      },
    });
  };
  const handleUpdateRole = ({ id, data }: { id: string; data: any }) => {
    updateRole(
      { id, body: data },
      {
        onSuccess: () => {
          toast.success("Role updated successfully");
          setIsRoleDialogOpen(false);
        },
        onError: (err: any) => {
          // toast.error(
          //   `Error updating role: ${err?.message || "Unknown error occurred"}`,
          // );
        },
      },
    );
  };

  const handleDeleteRoleFromDialog = () => {
    deleteRole(deleteRoleId as string, {
      onSuccess: () => {
        toast.success("Role deleted successfully");
        setIsDeleteDialogOpen(false);
      },
      onError: (err: any) => {
        // toast.error(
        //   `Error deleting role: ${err?.message || "Unknown error occurred"}`,
        // );
      },
    });
  };

  const handleCloseRoleDialog = () => {
    setIsRoleDialogOpen(false);
    setEditingRoleId(null);
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center mt-20">
        <p className="text-red-500 text-xs">
          Error loading Roles list: {error?.message || "Unknown error"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
            <PageTitle title={"List of Roles"} suffix="Roles" />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          onClick={() => {
            setIsRoleDialogOpen(true);
          }}
          disabled={!canDoAction}
        >
          Create Role
        </Button>
      </div>

      {isRolesLoading && !data ? (
        <div className="flex items-center justify-center mt-20">
          <Loading message="Getting Roles List..." />
        </div>
      ) : (
        <TableComponent data={data?.data || []} columns={cols} model="role" />
      )}

      <Pagination
        {...pagination}
        currentPage={pagination?.page ?? 1}
        totalPages={pagination?.totalPages ?? 1}
        limit={pagination?.limit ?? limit}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />

      <AddRoleDialog
        open={isRoleDialogOpen}
        role={role?.data || null}
        setOpen={setIsRoleDialogOpen}
        onCreate={handleCreateRole}
        onUpdate={handleUpdateRole}
        isLoading={isRoleCreating || isRoleUpdating || isRoleLoading}
        isError={isRoleCreateError || isRoleUpdateError}
        error={roleCreateError?.message || roleUpdateError?.message || null}
        onClose={handleCloseRoleDialog}
      />
      <DeleteDialog
        open={isDeleteDialogOpen}
        setOpen={setIsDeleteDialogOpen}
        type="Role"
        onDelete={handleDeleteRoleFromDialog}
        isDeleting={isRoleDeleting}
        isError={isRoleDeleteError}
        error={roleDeleteError?.message || null}
      />
    </div>
  );
};

export default RolesPage;
