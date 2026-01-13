import { Construction } from "lucide-react";

const Building = () => {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-3 text-center">
      <Construction size={56} className="text-primary" />

      <h1 className="text-2xl font-semibold">
        Page Under Construction
      </h1>

      <p className="text-sm text-muted-foreground max-w-sm">
        We’re working on this feature. Check back soon.
      </p>
    </div>
  );
};

export default Building;
