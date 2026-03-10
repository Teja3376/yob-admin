"use client";
import { Button } from "@/components/ui/button";
import { useParams, usePathname, useRouter } from "next/navigation";
import { format } from "date-fns";

const tabs = [
  {
    title: "Overview",
    href: "overview",
  },
  {
    title: "Investors",
    href: "investors",
  },
  {
    title: "Orders",
    href: "orders",
  },
];

const Tabs = () => {
  const pathname = usePathname();
  const { spvId } = useParams();
  const router = useRouter();

  
  return (
    <div className="space-y-2 ">
     

      <div className="flex gap-2 items-center my-2">
        {tabs.map((tab) => {
          return (
            <Button
              key={tab.href}
              variant={pathname.includes(tab.href) ? "default" : "outline"}
              className="rounded-full"
              onClick={() => router.push(`/spv-list/${spvId}/${tab.href}`)}
            >
              {tab.title}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
