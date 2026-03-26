import { Suspense } from "react";
import VehicleSummaryList from "./VehicleSummaryList";
import AttentionRequired from "./AttentionRequired";
import SpendOverTime from "./SpendOverTime";
import LogTables from "./LogTables";
import { getUserId } from "@/lib/auth/session";

export default async function Dashboard(){
    const user_id = await getUserId();
    return (
              <div className="grid sm:grid-cols-2 gap-5">
                    <Suspense fallback={"Loading dashboard..."}>
                        <VehicleSummaryList user_id={user_id} />
                        <AttentionRequired user_id={user_id}  />
                        <SpendOverTime />
                        <LogTables user_id={user_id} />
                    </Suspense>
        
        
        
        
        
        
                </div>
    )
}