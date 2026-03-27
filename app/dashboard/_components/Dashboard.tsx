import { Suspense } from "react";
import VehicleSummaryList from "./VehicleSummaryList";
import AttentionRequired from "./AttentionRequired";
import SpendOverTime from "./SpendOverTime";
import LogTables from "./LogTables";

export default async function Dashboard(){
    return (
              <div className="grid sm:grid-cols-2 gap-5">
                    <Suspense fallback={"Loading dashboard..."}>
                        <VehicleSummaryList />
                        <AttentionRequired   />
                        <SpendOverTime />
                        <LogTables />
                    </Suspense>
        
        
        
        
        
        
                </div>
    )
}