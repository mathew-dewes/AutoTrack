
import FormSwitcher from "./_components/FormSwitcher";
import LogForm from "./_components/LogForm";
import LogFormSelector from "./_components/LogFormSelector";


export default async function page(
    {params, searchParams}:{
        params: Promise<{vehicleId: string}>,
        searchParams: Promise<{[key: string]: "maintenance" | "fuel"}>
    }
){

    const {vehicleId} = await params;
    const formType = (await searchParams).form;

    console.log(formType);
    
    return (
        <div className="space-y-4">
            <LogFormSelector vehicleId={vehicleId}/>
            <FormSwitcher formType={formType}/>
            <LogForm/>
        </div>
    )
}