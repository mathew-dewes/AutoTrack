"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { useQuery } from "@tanstack/react-query"
import LoadingCard from "@/components/web/LoadingCard"
import NullCard from "@/components/web/NullCard"

export const description = "A pie chart with a label"


const typeColors: Record<string, string> = {
  oil_service: "var(--chart-1)",
  general_service: "var(--chart-2)",
  brakes: "var(--chart-3)",
  tyres: "var(--chart-4)",
  battery: "var(--chart-5)",
};

const chartConfig = {
  count: {
    label: "Total repairs",
  },
  oil_service: {
    label: "oil_service",
    color: "var(--chart-1)",
  },
  general_service: {
    label: "general_service",
    color: "var(--chart-2)",
  },
  brakes: {
    label: "brakes",
    color: "var(--chart-3)",
  },
  tyres: {
    label: "tyres",
    color: "var(--chart-4)",
  },
  battery: {
    label: "battery",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

async function fetchRepairData(vehicle_id: string):Promise< { type: string; count: number }[]>{
    const res = await fetch(`/api/vehicles/${vehicle_id}/analytics/repair-types`);
    if (!res.ok) {
  if (res.status === 401) throw new Error("Unauthorized. Please log in.");
  throw new Error(`Failed to fetch fuel logs: ${res.statusText}`);
}


  
  return res.json();
};

export function RepairPie({vehicle_id}:
  {vehicle_id: string}) {

                const { data, error, isLoading, isError } =
        useQuery({
            queryKey: [`vehicle-${vehicle_id}-analytics-repairTypes`],
            queryFn: () => fetchRepairData(vehicle_id),
            staleTime: 1000 * 30,
        },);

    if (error) {
        console.log(error);

    }

    if (isLoading) return <LoadingCard />
    if (isError) return <p>There was an error</p>
    if (!data) return <NullCard title="Total spend overtime" description="You have no fuel logs. Please add them to see metrics" />

      const chartDataWithFill = data.map(item => ({
  ...item,
  fill: typeColors[item.type] || "var(--chart-default)",
}));

console.log(chartDataWithFill);
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-62.5 pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie data={chartDataWithFill} dataKey="count" label nameKey="type" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
