import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TableComponent from "@/components/common/TableComponent";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight, Globe, Users } from "lucide-react";

type BoardMember = {
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  idNumber: string;
  role: string;
};

type SpvBoardMembersProps = {
  boardMembers: BoardMember[];
};

const SpvBoardMembers: React.FC<SpvBoardMembersProps> = ({ boardMembers }) => {
  return (
    <Card className="rounded-2xl shadow-sm p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
          <Users size={20} />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Board Members</h2>
      </div>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {boardMembers?.map((member, index) => (
            <div
              key={index}
              className="flex items-center justify-between border border-gray-200 rounded-2xl p-5 bg-white transition hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Users size={20} className="text-gray-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {member.fullName}
                  </p>

                  <p className="text-xs font-semibold text-orange-500 uppercase mt-1">
                    {member.role || "Asset Manager"}
                  </p>

                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <Globe size={14} />
                    <span>{member.email}</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="text-gray-400" size={18} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SpvBoardMembers;
