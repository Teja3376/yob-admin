import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { format } from "date-fns";
import { Delete, Edit, Trash } from "lucide-react";
export type RoleRow = {
  _id: string;
  name: string;
  membersCount: number;
  description: string;
};

export const rolesCols = (
  router: any,
  onEdit: (role: any) => void,
  onDelete: (role: any) => void,
  canView:boolean,
  canDoAction:boolean
): ColumnDef<RoleRow>[] => {
  return [
    {
      accessorKey: "name",
      header: "Role Name",
      cell: ({ getValue }) => (
        <p className="font-medium">{getValue<string>()}</p>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ getValue }) => (
        <p className="font-normal truncate w-100">{getValue<string>()}</p>
      ),
    },
    {
      accessorKey: "membersCount",
      header: "Members",
      cell: ({ getValue }) => (
        <p className="font-medium">{getValue<number>()}</p>
      ),
    },
    {
      accessorKey: "isSystem",
      header: "Role Type",
      cell: ({ getValue }) => {
        const value = getValue<boolean>();
        return (
          <Badge
            className={clsx(
              value
                ? "bg-gray-100 border-gray-500 text-gray-500"
                : "bg-primary/10 border-primary text-primary",
              "font-medium cursor-pointer",
            )}
          >
            {value ? "Default" : "Custom"}
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
        const role = row.original;

        return (
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(role?._id)}
              disabled={!canDoAction}
            >
              <Edit size={16} />
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete(role?._id)}
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
