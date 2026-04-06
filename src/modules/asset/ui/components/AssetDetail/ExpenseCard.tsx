
export function ExpenseCard({ label, value }: any) {
  return (
    <div className="border rounded-xl p-4 text-center">
      <p className="text-xs text-gray-500 uppercase">
        {label}
      </p>
      <p className="font-semibold mt-1">
        {value}
      </p>
    </div>
  );
}