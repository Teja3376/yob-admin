import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { format } from "date-fns";
import { Edit, Trash } from "lucide-react";
export type SPVRow = {
  firstName: string;
  lastName: number;
  description: string;
};

export const membersCols = (
  router: any,
  onEdit: (member: any) => void,
  onDelete: (member: any) => void,
  canView: boolean,
  canDoAction: boolean,
): ColumnDef<any>[] => {
  return [
    {
      accessorKey: "name",
      header: "Member Name",
      cell: (info) => {
        const name =
          `${info.row.original.firstName} ${info.row.original.lastName}` as string;
        return <p className="font-medium">{name}</p>;
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ getValue }) => (
        <p className="font-normal line-clamp-3">{getValue<string>()}</p>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: (info) => {
        const role = info.row.original.role?.name || "No Role";
        return <p className="font-medium">{role}</p>;
      },
    },
    {
      accessorKey: "passwordResetCompleted",
      header: "Password Reset",
      cell: ({ getValue }) => {
        const value = getValue<boolean>();
        return (
          <Badge
            className={clsx(
              value
                ? "bg-green-100 border-green-500 text-green-500"
                : "bg-red-100 border-red-500 text-red-500",
            )}
          >
            {value ? "Completed" : "Pending"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ getValue }) => (
        <p className="font-mono text-xs">
          {getValue()
            ? format(new Date(getValue<string>()), "dd/MM/yyyy")
            : "-"}
        </p>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const member = row.original;

        return (
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(member?._id)}
              disabled={!canDoAction}
            >
              <Edit size={16} />
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete(member?._id)}
              disabled={!canDoAction}
            >
              <Trash size={16} />
            </Button>
          </div>
        );
      },
    },
  ];
};
