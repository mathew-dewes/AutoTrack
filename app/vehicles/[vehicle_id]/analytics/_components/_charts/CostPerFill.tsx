"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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
import { format } from "date-fns"

export const description = "A line chart"


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;


async function fetchCostPerLitreData(vehicle_id: string){
    const res = await fetch(`/api/vehicles/${vehicle_id}/analytics/cost-per-litre`);
    if (!res.ok) {
  if (res.status === 401) throw new Error("Unauthorized. Please log in.");
  throw new Error(`Failed to fetch fuel logs: ${res.statusText}`);
}


  
  return res.json();
}



export function CostPerFill({vehicle_id}:
  {vehicle_id: string}
) {

        const { data, error, isLoading, isError } =
        useQuery({
            queryKey: [`vehicle-${vehicle_id}-analytics-cost-per-litre`],
            queryFn: () => fetchCostPerLitreData(vehicle_id),
            staleTime: 1000 * 30,
        },);

    if (error) {
        console.log(error);

    }

    if (isLoading) return <LoadingCard />
    if (isError) return <p>There was an error</p>
    if (!data) return <NullCard title="Total spend overtime" description="You have no fuel logs. Please add them to see metrics" />

console.log(data);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost per fill</CardTitle>
        <CardDescription>Cost per litre by date</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
     tickFormatter={(value) => format(new Date(value), "MMM d")}
  tickCount={6}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="cost"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
