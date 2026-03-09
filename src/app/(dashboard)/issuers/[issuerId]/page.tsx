import IssuerProfilePage from "@/modules/issuers/ui/pages/IssuerProfilePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile of Issuer",
};

export default function IssuersRoute() {
  return <IssuerProfilePage />;
}
