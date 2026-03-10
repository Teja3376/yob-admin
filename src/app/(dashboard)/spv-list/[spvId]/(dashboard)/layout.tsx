import Tabs from "@/modules/spv/ui/components/Tabs";
import { Metadata } from "next";
import React from "react";
 export const metadata:Metadata = {
    title: 'Overview',
    
}
export default function OverviewLayout({ children }:{ children: React.ReactNode}){
    return (
        <div className="min-h-screen ">
            <Tabs/>
            {/* <hr /> */}
            {children}
        </div>
    )
}