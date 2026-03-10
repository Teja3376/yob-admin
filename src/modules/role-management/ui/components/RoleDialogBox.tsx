"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useForm } from "react-hook-form";
import { RoleFormValues, roleSchema } from "../../schemas/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Loading from "@/components/Loader";

type PermissionState = {
  issuers: {
    view: boolean;
    review: boolean;
    action: boolean;
  };
  spvs: {
    view: boolean;
    review: boolean;
    action: boolean;
  };
  assets: {
    view: boolean;
    review: boolean;
    action: boolean;
  };
  orders: {
    view: boolean;
    review: boolean;
  };
  investors: {
    view: boolean;
    review: boolean;
  };
  roles: {
    view: boolean;
    action: boolean;
  };
  members: {
    view: boolean;
    action: boolean;
  };
};

const defaultPermissions: PermissionState = {
  issuers: {
    view: false,
    review: false,
    action: false,
  },
  spvs: {
    view: false,
    review: false,
    action: false,
  },
  assets: {
    view: false,
    review: false,
    action: false,
  },
  orders: {
    view: false,
    review: false,
  },
  investors: {
    view: false,
    review: false,
  },
  roles: {
    view: false,
    action: false,
  },
  members: {
    view: false,
    action: false,
  },
};

type Props = {
  open: boolean;
  role?: any | null;
  setOpen: (v: boolean) => void;
  onCreate: (data: {
    name: string;
    description: string;
    permissions: PermissionState;
  }) => void;
  onUpdate: ({
    id,
    data,
  }: {
    id: string;
    data: {
      name: string;
      description: string;
      permissions: PermissionState;
    };
  }) => void;
  isLoading: boolean;
};

export default function AddRoleDialog({
  open,
  role = null,
  setOpen,
  onCreate,
  onUpdate,
  isLoading,
}: Props) {
  const isEdit = !!role;
  const [permissions, setPermissions] = useState(defaultPermissions);
  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { isDirty, isValid } = form.formState;

  const updatePermission = (
    module: keyof PermissionState,
    key: string,
    value: boolean,
  ) => {
    setPermissions((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [key]: value,
      },
    }));
  };

  const onSubmit = (values: RoleFormValues) => {
    const payload = {
      name: values.name,
      description: values.description,
      permissions,
    };

    if (isEdit && role) {
      onUpdate({ id: role._id, data: payload });
    } else {
      onCreate(payload);
    }

    if (!isLoading) {
      form.reset();
      setPermissions(defaultPermissions);
      setOpen(false);
    }
  };

  useEffect(() => {
    if (role) {
      form.reset({
        name: role.name,
        description: role.description,
      });

      setPermissions(role.permissions || defaultPermissions);
    }
  }, [role]);

  const PermissionRow = ({
    module,
    actions,
  }: {
    module: keyof PermissionState;
    actions: string[];
  }) => (
    <AccordionItem value={module} className="border rounded-md px-4">
      <AccordionTrigger className="font-medium capitalize">
        {module}
      </AccordionTrigger>

      <AccordionContent>
        <div className="flex flex-wrap gap-6 pt-2">
          {actions.map((action) => (
            <div key={action} className="flex items-center space-x-2">
              <Checkbox
                checked={(permissions as any)[module][action]}
                onCheckedChange={(checked) =>
                  updatePermission(module, action, Boolean(checked))
                }
                className="cursor-pointer"
              />
              <Label className="capitalize">{action}</Label>
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );

  const handleClose = () => {
    form.reset();
    setOpen(false);
  };

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl">
          <Loading message="Loading..." />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl overflow-y-scroll max-h-150 scrollbar-hide">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Role" : "Add Role"}</DialogTitle>{" "}
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {" "}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter role name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter role description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Accordion type="multiple" className="w-full space-y-2 mb-3">
              <Label className="text-base font-semibold">Permissions</Label>

              <PermissionRow
                module="issuers"
                actions={["view", "review", "action"]}
              />

              <PermissionRow
                module="spvs"
                actions={["view", "review", "action"]}
              />

              <PermissionRow
                module="assets"
                actions={["view", "review", "action"]}
              />

              <PermissionRow module="orders" actions={["view", "review"]} />

              <PermissionRow module="investors" actions={["view", "review"]} />

              <PermissionRow module="roles" actions={["view", "action"]} />
              <PermissionRow module="members" actions={["view", "action"]} />
            </Accordion>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={!isDirty || !isValid}>
                {isEdit ? "Update Role" : "Create Role"}
              </Button>{" "}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
