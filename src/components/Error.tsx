import { AlertTriangle } from "lucide-react";

const ErrorPage = ({
  title,
  errorMessage,
}: {
  title: string;
  errorMessage: string;
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
        <AlertTriangle size={20} className="text-rose-700" />
      <div className="text-center">
        <h1 className="text-2xl font-bold text-rose-500">{title}</h1>
        <p className="text-rose-500">{errorMessage}</p>
      </div>
    </div>
  );
};

export default ErrorPage;
