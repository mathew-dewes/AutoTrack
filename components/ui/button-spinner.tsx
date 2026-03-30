import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export function ButtonSpinner({text}:{text: string}) {
  return (
  
 
      <Button className="w-full" variant="default" disabled>
        {text}
        <Spinner data-icon="inline-start" />
      </Button>
  
  )
}
