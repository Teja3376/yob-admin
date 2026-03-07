import { ColumnDef } from "@tanstack/react-table";
export type SPVRow = {
  name: string;
  membersCount: number;
  description: string;
};

export const rolesCols = (router: any): ColumnDef<any>[] => {
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
        <p className="font-medium">{getValue<string>()}</p>
      ),
    },
    {
      accessorKey: "membersCount",
      header: "Members",
      cell: ({ getValue }) => (
        <p className="font-medium">{getValue<number>()}</p>
      ),
    },
  ];
};
