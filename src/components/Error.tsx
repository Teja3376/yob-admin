import { AlertTriangle } from "lucide-react";

const ErrorPage = ({
  title,
  errorMessage,
}: {
  title: string;
  errorMessage: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5">
      <div className="flex flex-col items-center justify-center px-10 p-7 rounded-md bg-rose-300/20 border-rose-600 border gap-5">
        <AlertTriangle size={30} className="text-rose-700" />
        <div className="text-center space-y-4">
          <h1 className="text-xl font-medium text-rose-500">{title}</h1>
          <p className="text-rose-500 font-normal text-sm">{errorMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
