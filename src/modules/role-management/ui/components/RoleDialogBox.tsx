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
import PermissionRow from "./PermissionsRow";
import { ShieldBan } from "lucide-react";

export type PermissionState = {
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

type RoleType = {
  _id: string;
  name: string;
  description: string;
  permissions: PermissionState;
};

type Props = {
  open: boolean;
  role?: RoleType | null;
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
  isError: boolean;
  error: string | null;
  onClose?: () => void;
};

export default function AddRoleDialog({
  open,
  role = null,
  setOpen,
  onCreate,
  onUpdate,
  isLoading,
  isError,
  error,
  onClose,
}: Props) {
  const isEdit = !!role;
  const [permissions, setPermissions] = useState(defaultPermissions);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
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
    setPermissionError(null);
    setPermissions((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [key]: value,
      },
    }));
  };

  const hasSelectedPermission = () => {
    return Object.values(permissions).some((module) =>
      Object.values(module).some((value) => value),
    );
  };

  const onSubmit = (values: RoleFormValues) => {
    setHasSubmitted(true);

    if (!hasSelectedPermission()) {
      setPermissionError("Select at least one permission");
      return;
    }

    setPermissionError(null);

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
  };

  useEffect(() => {
    if (role) {
      form.reset({
        name: role.name,
        description: role.description,
      });

      setPermissions(role.permissions ?? defaultPermissions);
    }
  }, [role, form]);

  const handleClose = () => {
    form.reset({
      name: "",
      description: "",
    });
    setPermissions(defaultPermissions);
    setPermissionError(null);
    setOpen(false);
    onClose?.();
    setHasSubmitted(false);
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

  if (hasSubmitted && isError && error) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl flex flex-col items-center gap-3">
          <div className="bg-red-500/10 border border-red-600 p-4 rounded-full">
            <ShieldBan className="text-red-600" size={48} />
          </div>
          <DialogTitle className="text-red-600">
            Error {isEdit ? "Updating" : "Creating"} Role
          </DialogTitle>
          <p className="text-muted-foreground text-sm">{error}</p>
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
                permissions={permissions}
                updatePermission={updatePermission}
              />

              <PermissionRow
                module="spvs"
                actions={["view", "review", "action"]}
                permissions={permissions}
                updatePermission={updatePermission}
              />

              <PermissionRow
                module="assets"
                actions={["view", "review", "action"]}
                permissions={permissions}
                updatePermission={updatePermission}
              />

              <PermissionRow
                module="orders"
                actions={["view", "review"]}
                permissions={permissions}
                updatePermission={updatePermission}
              />

              <PermissionRow
                module="investors"
                actions={["view", "review"]}
                permissions={permissions}
                updatePermission={updatePermission}
              />

              <PermissionRow
                module="roles"
                actions={["view", "action"]}
                permissions={permissions}
                updatePermission={updatePermission}
              />
              <PermissionRow
                module="members"
                actions={["view", "action"]}
                permissions={permissions}
                updatePermission={updatePermission}
              />
            </Accordion>
            {permissionError ? (
              <p className="text-sm text-red-600">{permissionError}</p>
            ) : null}
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
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
