import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PermissionState } from "./RoleDialogBox";

type PermissionRowProps = {
  module: keyof PermissionState;
  actions: string[];
  permissions: PermissionState;
  updatePermission: (
    module: keyof PermissionState,
    key: string,
    value: boolean
  ) => void;
};

const PermissionRow = ({
  module,
  actions,
  permissions,
  updatePermission,
}: PermissionRowProps) => {
  return (
    <AccordionItem value={module} className="border rounded-md px-4">
      <AccordionTrigger className="font-medium capitalize">
        {module}
      </AccordionTrigger>

      <AccordionContent>
        <div className="flex flex-wrap gap-6 pt-2">
          {actions.map((action) => (
            <div key={action} className="flex items-center space-x-2">
              <Checkbox
                checked={permissions[module][action as keyof typeof permissions[typeof module]]}
                onCheckedChange={(checked) =>
                  updatePermission(module, action, Boolean(checked))
                }
              />
              <Label className="capitalize">{action}</Label>
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PermissionRow;