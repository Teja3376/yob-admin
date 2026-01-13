import { TableComponent } from "@/components/common/TableComponent";
import React from "react";
import { IssuerRow } from "../../schemas/issuerTableCols";

const IssuersTable = ({
  cols,
  data,
  isLoading,
  emptyStateMessage,
}: {
  cols: IssuerRow;
  data: any;
  isLoading?: boolean;
  emptyStateMessage?: string;
}) => {
  return (
    <div className="w-full">
      <TableComponent
        isLoading={isLoading}
        emptyStateMessage={emptyStateMessage}
        bordered={true}
        columns={cols as any}
        data={data}
      />
    </div>
  );
};

export default IssuersTable;
