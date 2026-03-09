"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateMemberFormValues,
  createMemberSchema,
} from "../../schemas/validation";
import Loading from "@/components/Loader";

type Role = {
  _id: string;
  name: string;
};

type Member = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: any;
};

type Props = {
  open: boolean;
  member?: Member | null;
  status: any;
  roles: Role[];
  permissions: Record<string, any>;
  isPermissionsLoading?: boolean;
  isCreating?: boolean;
  setOpen: (v: boolean) => void;

  onCreate: (data: CreateMemberFormValues) => void;

  onUpdate: ({
    id,
    data,
  }: {
    id: string;
    data: CreateMemberFormValues;
  }) => void;

  onSelectStatus: (status: any) => void;
  onRoleChange: (roleId: string) => void;
};

export default function AddMemberDialog({
  open,
  member,
  permissions,
  status,
  roles,
  isCreating,
  isPermissionsLoading,
  setOpen,
  onCreate,
  onUpdate,
  onSelectStatus,
  onRoleChange,
}: Props) {
  const isEdit = !!member;
  const form = useForm<CreateMemberFormValues>({
    resolver: zodResolver(createMemberSchema),
    values: member
      ? {
          firstName: member.firstName,
          lastName: member.lastName,
          email: member.email,
          role: member.role?._id.toString() ?? "",
        }
      : {
          firstName: "",
          lastName: "",
          email: "",
          role: "",
        },
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { isDirty, isValid } = form.formState;

  const onSubmit = (values: CreateMemberFormValues) => {
    if (isEdit && member) {
      onUpdate({
        id: member._id,
        data: values,
      });
    } else {
      onCreate(values);
    }

    if (!isCreating) {
      form.reset();
    }
  };
  const selectedRole = form.watch("role");

  useEffect(() => {
    if (selectedRole) {
      onRoleChange(selectedRole);
    }
  }, [selectedRole]);

  const renderPermissions = () => {
    // No role selected
    if (!selectedRole) {
      return (
        <div className="border rounded-md p-4 text-sm text-muted-foreground">
          Select a role to view its permissions.
        </div>
      );
    }

    // Loading permissions
    if (isPermissionsLoading) {
      return (
        <div className="border rounded-md p-4">
          <Loading message="Fetching permissions..." />
        </div>
      );
    }

    // Empty permissions
    if (!permissions || Object.keys(permissions).length === 0) {
      return (
        <div className="border rounded-md p-4 text-sm text-muted-foreground">
          No permissions configured for this role.
        </div>
      );
    }

    // Render permissions
    return (
      <div className="border rounded-md p-4 space-y-4 bg-muted/20">
        {Object.entries(permissions).map(([module, actions]) => (
          <div key={module}>
            <p className="text-sm font-medium capitalize mb-2">{module}</p>

            <div className="flex flex-wrap gap-6">
              {Object.entries(actions as Record<string, boolean>).map(
                ([action, value]) => (
                  <div key={action} className="flex items-center space-x-2">
                    <Checkbox checked={value} disabled />
                    <Label className="capitalize">{action}</Label>
                  </div>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleClose = () => {
    form.reset();
    setOpen(false);
  };
  if (isCreating) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl">
          <Loading message={"Loading..."} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto scrollbar-hide">
        <DialogTitle>{isEdit ? "Edit Member" : "Add Member"}</DialogTitle>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <Label>Role Type</Label>

              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={status === "default" ? "default" : "outline"}
                  onClick={() => onSelectStatus("default")}
                  className="rounded-full"
                >
                  Default Roles
                </Button>

                <Button
                  type="button"
                  size="sm"
                  variant={status === "custom" ? "default" : "outline"}
                  onClick={() => onSelectStatus("custom")}
                  className="rounded-full"
                >
                  Custom Roles
                </Button>
              </div>
            </div>

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>

                  <Select
                    disabled={!status}
                    onValueChange={(value) => {
                      field.onChange(value);
                      onRoleChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            roles && roles.length > 0 && status
                              ? "Select role"
                              : "Select role type first"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role._id} value={role._id.toString()}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {renderPermissions()}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={!isDirty || !isValid}>
                {isEdit ? "Update Member" : "Add Member"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
