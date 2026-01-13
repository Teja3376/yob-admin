"use client";
import React from "react";
import IssuersTable from "../components/IssuersTable";
import { IssuerRow, issuerTableCols } from "../../schemas/issuerTableCols";
import { useGetIssuerList } from "../../hooks/issuer.hook";

const IssuerListPage = () => {
  const { data: issuerList, isFetching, error } = useGetIssuerList();
  return (
    <div className="w-full">
      <h1 className="text-black font-semibold text-2xl">Issuer List</h1>
      <div className="mt-5">
        <IssuersTable
          cols={issuerTableCols() as unknown as IssuerRow}
          data={issuerList ?? []}
          isLoading={isFetching}
          emptyStateMessage="No issuers found."
        />
      </div>
    </div>
  );
};

export default IssuerListPage;
