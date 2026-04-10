"use client";

import { useState } from "react";
import { useDebounce } from "@/config/useDebounce";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Loading from "@/components/Loader";
import TableComponent from "@/components/common/TableComponent";
import Pagination from "@/components/common/Pagination";
import { useRouter } from "next/navigation";
import AddRoleDialog from "../components/RoleDialogBox";
import { Button } from "@/components/ui/button";
import useCreateRole from "../../hooks/roles/useCreateRole";
import { toast } from "sonner";
import useGetAllMembers from "../../hooks/members/useGetAllMembers";
import { membersCols } from "../../schemas/membersCols";
import AddMemberDialog from "../components/MemberDialog";
import useGetAllRoleNames from "../../hooks/roles/useGetAllRoleNames";
import useGetRoleById from "../../hooks/roles/useGetRoleById";
import useCreateMember from "../../hooks/members/useCreateMember";
import useUpdateMember from "../../hooks/members/useUpdateMember";
import useGetMemberById from "../../hooks/members/useGetMember";
import DeleteDialog from "../components/DeleteDialog";
import useDeleteMember from "../../hooks/members/useDeleteMember";
import { useAuthStore1 } from "@/modules/adminauth/state/adminAuthStore";
import PageTitle from "@/components/PageTitle";

const MembersPage = () => {
  const router = useRouter();
  const { hasPermission } = useAuthStore1();
  const canView = hasPermission("members", "review");
  const canDoAction = hasPermission("members", "action");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [isMemberDialogOpen, setIsMemberDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [deleteMemberId, setDeleteMemberId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [status, setStatus] = useState<"default" | "custom">("default");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const searchQuery = useDebounce(searchTerm, 500);

  const {
    data,
    isFetching: isMembersLoading,
    isError,
    error,
  } = useGetAllMembers(page, limit, searchQuery);

  const { data: roles, isFetching: isRolesLoading } =
    useGetAllRoleNames(status);

  const { data: role, isFetching: isRoleLoading,isError: isRoleError ,error: roleError} =
    useGetRoleById(selectedRole);

  const { data: member, isFetching: isMemberLoading,isError: isMemberError ,error: memberError} = useGetMemberById(
    editingMemberId as string,
  );
  const { mutate: createMember, isPending: isMemberCreating,isError: isMemberCreateError ,error: memberCreateError} =
    useCreateMember();
  const { mutate: updateMember, isPending: isMemberUpdating,isError: isMemberUpdateError ,error: memberUpdateError} =
    useUpdateMember();
  const { mutate: deleteMember, isPending: isMemberDeleting,isError: isMemberDeleteError ,error: memberDeleteError} =
    useDeleteMember();

  const pagination = data?.pagination;
  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };
  const onPageSizeChange = (pageSize: number) => {
    setLimit(pageSize);
    setPage(1);
  };
  const handleEditMember = (roleId: string) => {
    setEditingMemberId(roleId);
    setIsMemberDialogOpen(true);
  };
  const handleDeleteRole = (roleId: string) => {
    setDeleteMemberId(roleId);
    setIsDeleteDialogOpen(true);
  };

  const handleCreateMember = (data: any) => {
    createMember(data, {
      onSuccess: () => {
        toast.success("Member created successfully");
        setIsMemberDialogOpen(false);
      },
      onError: (err) => {
        // toast.error(
        //   `Error creating member: ${err?.message || "Unknown error occurred"}`,
        // );
      },
    });
  };

  const handleUpdateMember = ({ id, data }: { id: string; data: any }) => {
    updateMember(
      { id, data },
      {
        onSuccess: () => {
          toast.success("Member updated successfully");
          setIsMemberDialogOpen(false);
        },
        onError: (err) => {
          // toast.error(
          //   `Error updating member: ${err?.message || "Unknown error occurred"}`,
          // );
        },
      },
    );
  };

  const handleDeleteRoleFromDialog = () => {
    deleteMember(deleteMemberId as string, {
      onSuccess: () => {
        toast.success("Member deleted successfully");
        setIsDeleteDialogOpen(false);
      },
      onError: (err: any) => {
        // toast.error(
        //   `Error deleting member: ${err?.message || "Unknown error occurred"}`,
        // );
      },
    });
  };
  const cols = membersCols(
    router,
    handleEditMember,
    handleDeleteRole,
    canView,
    canDoAction,
  );

  if (isError) {
    return (
      <div className="flex items-center justify-center mt-20">
        <p className="text-red-500 text-xs">
          Error loading Members list: {error?.message || "Unknown error"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageTitle title={"List of Members"} suffix="Members" />
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
          disabled={!canDoAction}
          onClick={() => setIsMemberDialogOpen(true)}
        >
          Create Member
        </Button>
      </div>

      {isMembersLoading && !data ? (
        <div className="flex items-center justify-center mt-20">
          <Loading message="Getting Members List..." />
        </div>
      ) : (
        <TableComponent data={data?.data || []} columns={cols} model="member" />
      )}

      <Pagination
        {...pagination}
        currentPage={pagination?.page ?? 1}
        totalPages={pagination?.totalPages ?? 1}
        limit={pagination?.limit ?? limit}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />

      <AddMemberDialog
        open={isMemberDialogOpen}
        member={member?.data || null}
        setOpen={setIsMemberDialogOpen}
        onCreate={handleCreateMember}
        onUpdate={handleUpdateMember}
        roles={roles?.data || []}
        onSelectStatus={(value) => setStatus(value)}
        status={
          member
            ? member?.data?.isSystem === true
              ? "default"
              : "custom"
            : status
        }
        permissions={role?.data?.permissions || {}}
        onRoleChange={(id) => setSelectedRole(id)}
        isPermissionsLoading={isRoleLoading}
        isCreating={isMemberCreating || isMemberUpdating || isMemberLoading}
        isError={isMemberCreateError || isMemberUpdateError || isMemberError||isRoleError}
        error={memberCreateError?.message || memberUpdateError?.message || memberError?.message || roleError?.message || null}
      />
      <DeleteDialog
        open={isDeleteDialogOpen}
        setOpen={setIsDeleteDialogOpen}
        type="Member"
        onDelete={handleDeleteRoleFromDialog}
        isDeleting={isMemberDeleting}
        error={isMemberDeleteError ? memberDeleteError.message : null}
        isError={isMemberDeleteError}
      />
    </div>
  );
};

export default MembersPage;
