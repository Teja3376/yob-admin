import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TableComponent from "@/components/common/TableComponent";
import { ColumnDef } from "@tanstack/react-table";

type BoardMember = {
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  idNumber: string;
};

type SpvBoardMembersProps = {
  boardMembers: BoardMember[];
};

const SpvBoardMembers: React.FC<SpvBoardMembersProps> = ({ boardMembers }) => {
  const columns: ColumnDef<BoardMember>[] = [
    {
      header: "Name",
      accessorKey: "fullName",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.fullName}</span>
      ),
    },
    {
      header: "Email ID",
      accessorKey: "email",
    },
    {
      header: "Phone Number",
      accessorKey: "phoneNumber",
      cell: ({ row }) =>
        `${row.original.countryCode} ${row.original.phoneNumber}`,
    },
    {
      header: "DIN",
      accessorKey: "idNumber",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Board Members</CardTitle>
      </CardHeader>
      <CardContent>
        <TableComponent columns={columns} data={boardMembers} />
      </CardContent>
    </Card>
  );
};

export default SpvBoardMembers;
