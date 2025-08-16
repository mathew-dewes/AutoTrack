import ServiceLogsTable from "@/components/tables/ServiceLogs";

export default function ServicesPage(){
    return (
        <div>
          <h1 className="font-bold text-xl">Service Logs:</h1>
          <div className="my-5">
     <ServiceLogsTable/>
          </div>
       
        </div>
    )
}