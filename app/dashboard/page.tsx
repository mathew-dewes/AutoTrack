import { Suspense } from "react";
import AttentionRequired from "./_components/AttentionRequired";
import VehicleSummaryList from "./_components/VehicleSummaryList";
import SpendOverTime from "./_components/SpendOverTime";
import FuelTable from "./_components/_table/FuelTable";


export default function page() {
    return (
        <div className="grid sm:grid-cols-2 gap-10 mt-10">
            <Suspense fallback={"Loading dashboard..."}>
                <VehicleSummaryList />
                <AttentionRequired />
                <SpendOverTime/>
                <FuelTable/>
            </Suspense>






        </div>
    )
}