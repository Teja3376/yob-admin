import TableComponent from "@/components/common/TableComponent";
import React from "react";
import { IssuerRow } from "../../schemas/issuerTableCols";

const IssuersTable = ({
  cols,
  data,
 
}: {
  cols: IssuerRow;
  data: any;
  isLoading?: boolean;
  emptyStateMessage?: string;
}) => {
  return (
    <div className="w-full">
      <TableComponent
        columns={cols as any}
        data={data}
        model="issuer"
      />
    </div>
  );
};

export default IssuersTable;
