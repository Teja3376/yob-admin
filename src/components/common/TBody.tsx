import { flexRender, Row } from "@tanstack/react-table";
import Empty from "./Empty";
import { EMPTY_TABLE_DATA } from "@/config/global";

interface TBodyProps<TData> {
  data: Row<TData>[];
  model?: string;
}

function TBody<TData>({ data, model }: TBodyProps<TData>) {
  const emptyData = EMPTY_TABLE_DATA.find((item) => item.id === model);
  if (!data || data.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={100}>
            <Empty
              title={emptyData?.title || "No Data Available"}
              description={emptyData?.description || "No data found for this table."}
              icon={emptyData?.icon}
              actionButton={emptyData?.actionButton}
            />
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((row) => (
        <tr key={row.id} className="hover:bg-gray-50">
          {row.getVisibleCells().map((cell) => (
            <td
              key={cell.id}
              className="p-2 border-b text-sm"
              style={{ width: cell.column.getSize(), minWidth: cell.column.getSize() }}
            >
              <div className="truncate">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TBody;
