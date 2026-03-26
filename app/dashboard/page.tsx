import { Suspense } from "react";
import AttentionRequired from "./_components/AttentionRequired";
import VehicleSummaryList from "./_components/VehicleSummaryList";
import SpendOverTime from "./_components/SpendOverTime";
import LogTables from "./_components/LogTables";


export default function page() {
    return (
        <div className="grid sm:grid-cols-2 gap-5 mt-10">
            <Suspense fallback={"Loading dashboard..."}>
                <VehicleSummaryList />
                <AttentionRequired />
                <SpendOverTime/>
                <LogTables/>
            </Suspense>






        </div>
    )
}