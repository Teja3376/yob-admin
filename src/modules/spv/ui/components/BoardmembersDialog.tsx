import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";
import { Badge, Briefcase, Clock, ExternalLink, FileText, Gift, Mail, PhoneCall, ShieldCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";

type BoardMember = {
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  idNumber: string;
  idProof: {
    name: string;
    url: string;
  };
  role: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

type BoardmembersDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: BoardMember | null;
};

const BoardmembersDialog: React.FC<BoardmembersDialogProps> = ({
  open,
  onOpenChange,
  member,
}) => {
  if (!member) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="ml-1">Board Member Details</DialogTitle>
        </DialogHeader>
        <div className="flex justify-between items-center ml-1">
          <div>
            <p className="text-md font-semibold">{member.fullName}</p>
            <p className="mt-1 text-muted-foreground">ID:{member.idNumber}</p>
          </div>
          <p className="p-1.5 border-2 rounded-2xl bg-gray-700 text-white">{member.role}</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 rounded-xl border bg-white px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Mail size={18} className="text-gray-500" />
            </div>
            <div className="flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Email Address
              </p>
              <p className="text-sm font-semibold text-black">{member.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border bg-white px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <PhoneCall size={18} className="text-gray-500" />
            </div>
            <div className="flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Phone Number
              </p>
              <p className="text-sm font-semibold text-black">
                {member.countryCode} {member.phoneNumber}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border bg-white px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <ShieldCheck size={18} className="text-gray-500" />
            </div>
            <div className="flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Account role
              </p>
              <p className="text-sm font-semibold text-black">
                {member.role}
              </p>
            </div>
          </div>
          <p className="text-sm font-semibold text-black">Verification Document</p>
          <div
            className="
          flex items-center justify-between
          rounded-2xl border border-gray-200
          bg-white p-5
          hover:shadow-sm transition
          hover:bg-gray-50"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="p-3 bg-gray-100 rounded-xl shrink-0">
                <FileText size={20} className="text-gray-400" />
              </div>
              <div className="min-w-0">
                <p className="text-base font-semibold text-gray-900 leading-tight truncate">
                  {member.idProof.name}
                </p>

                <p className="text-xs uppercase tracking-wide text-gray-400 mt-1 truncate">
                  ID Proof Document
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-gray-400 ">
              <Button
                onClick={() => window.open(member.idProof.url, "_blank")}
                className="bg-white text-black border-0 border-b-white hover:bg-white hover:text-primary"
              >
                <ExternalLink size={18} />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BoardmembersDialog;
