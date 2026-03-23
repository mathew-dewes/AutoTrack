

export default function FormSwitcher({formType}:
    {formType: "maintenance" | "fuel"}
){

     
    return (
     <div>
        <h1>{formType}</h1>
     </div>
    )
}