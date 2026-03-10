"use client";
import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import {
  useGetIssuerById,
  useUpdateIssuerStatus,
} from "../../hooks/issuer.hook";
import {
  ArrowLeft,
  Briefcase,
  Building,
  LoaderCircle,
  ShoppingCart,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import IssuerInfo from "../components/IssuerInfo";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import KybDetails from "../components/KybDetails";
import { Tabs } from "@radix-ui/react-tabs";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SPVs from "../components/Tabs/SPVs";
import Assets from "../components/Tabs/Assets";
import Orders from "../components/Tabs/Orders";
import Investors from "../components/Tabs/Investors";
import SubmitDecision from "../components/SubmitDecision";
import IssuerStats from "../components/IssuerStats";
import Loading from "@/components/Loader";
import { useAuthStore1 } from "@/modules/adminauth/state/adminAuthStore";
import PageTitle from "@/components/PageTitle";

const IssuerProfilePage = () => {
  const { issuerId } = useParams();
  const router = useRouter();
  const { hasPermission } = useAuthStore1();
  const {
    data: issuer,
    isFetching,
    isError,
    error,
  } = useGetIssuerById(issuerId as string);
  const { mutate: updateIssuerStatus, isPending } = useUpdateIssuerStatus(
    issuerId as string,
  );

  const issuerData = issuer?.issuer;
  const application = issuer?.application;
  const statusStyles: Record<string, string> = {
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
  };
  const canDoAction = hasPermission("issuers", "action");

  const handleUpdateStatus = (status: "approved" | "rejected") => {
    updateIssuerStatus(status, {
      onSuccess: () => {
        toast.success(
          `Application ${status === "approved" ? "approved" : "rejected"}`,
        );
      },
      onError: () => {
        toast.error("Failed to update application status");
      },
    });
  };

  const tabs = useMemo(
    () => [
      {
        title: "SPVs",
        value: "spvs",
        component: <SPVs issuerId={issuerData?._id} />,
      },
      {
        title: "Assets",
        value: "assets",
        component: <Assets issuerId={issuerData?._id} />,
      },
      {
        title: "Orders",
        value: "orders",
        component: <Orders issuerId={issuerData?._id} />,
      },
      {
        title: "Investors",
        value: "investors",
        component: <Investors issuerId={issuerData?._id} />,
      },
    ],
    [issuerData?._id],
  );

  if (isFetching) {
    return (
      <div className="flex items-center justify-center mt-20">
        <Loading message="Getting Issuer Details..." />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex items-center justify-center mt-20">
        <p className="text-red-500">
          Error loading Issuer: {error?.message || "Unknown error"}
        </p>
      </div>
    );
  }
  return (
    <div>
      <PageTitle
        title={
          issuerData?.firstName
            ? `${issuerData.firstName} ${issuerData.lastName}`
            : "Deatiled view of Issuer"
        }
        suffix="Issuer"
      />
      <div className="flex-1 flex items-center gap-2">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">
            {application.legalEntityName}
          </h1>
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <p>Status :</p>
            <Badge
              className={`flex rounded-full px-2 py-0.5 text-xs font-medium cursor-pointer capitalize ${
                statusStyles[application?.status] ?? "bg-gray-100 text-gray-600"
              }`}
            >
              {application?.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="mt-5 p-5 flex items-center gap-5">
        <div className="text-sm  flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <p className="text-muted-foreground">Application Id:</p>
          <p>{application.applicationId}</p>
        </div>
        <div className="text-sm  flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <p className="text-muted-foreground">Last Activity:</p>
          <p>
            {application?.updatedAt
              ? format(application?.updatedAt, "dd/MM/yyyy hh:mm a")
              : "-"}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3 w-full items-stretch auto-rows-fr">
        <div className="col-span-2">
          <IssuerInfo
            firstName={issuerData.firstName}
            lastName={issuerData.lastName}
            email={application.email}
            mobileNumber={`${application.phoneCountryCode}${application.phoneNumber}`}
            country={application.countryOfIncorporation}
          />
        </div>
        <div className="col-span-2">
          <KybDetails
            kybStatus={issuerData.iskyb}
            submissionDate={
              issuerData.kyb?.submissionDate
                ? format(
                    new Date(issuer.issuer.kyb.submissionDate),
                    "dd/MM/yyyy",
                  )
                : "-"
            }
            businessName={issuerData.kyb?.businessName}
            registrationNo={issuerData.kyb?.registrationNumber}
            legalAddress={issuerData.kyb?.legalAddress}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3 w-full items-stretch auto-rows-fr mt-3">
        <div className="col-span-2">
          <SubmitDecision
            status={application?.status}
            onApprove={() => handleUpdateStatus("approved")}
            onReject={() => handleUpdateStatus("rejected")}
            disabled={isPending}
            canDoAction={canDoAction}
          />
        </div>
      </div>
      {application?.status === "approved" && (
        <IssuerStats issuer={issuerData} />
      )}
      {application?.status === "approved" && (
        <div className="mt-3">
          <Tabs defaultValue="spvs">
            <TabsList className="bg-transparent border-b-2 border-muted/50 h-12 mb-5 flex gap-3">
              {tabs.map((tab: any) => (
                <TabsTrigger
                  key={tab.value}
                  className="data-[state=active]:bg-primary data-[state=active]:text-white px-6 rounded-full border-primary text-primary cursor-pointer"
                  value={tab.value}
                >
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabs.map((tab: any) => (
              <TabsContent key={tab.value} value={tab.value}>
                {tab.component}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default IssuerProfilePage;
