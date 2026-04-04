"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { useQuery } from "@tanstack/react-query"
import LoadingCard from "@/components/web/LoadingCard"
import NullCard from "@/components/web/NullCard"
import { format } from "date-fns"

export const description = "A stacked bar chart with a legend"


const chartConfig = {
  fuel: {
    label: "Fuel cost",
    color: "var(--chart-1)",
  },
  repair: {
    label: "Repair cost",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;


async function fetchMonthlyCost(vehicle_id: string){
    const res = await fetch(`/api/vehicles/${vehicle_id}/analytics/monthly-cost`);
    if (!res.ok) {
  if (res.status === 401) throw new Error("Unauthorized. Please log in.");
  throw new Error(`Failed to fetch fuel logs: ${res.statusText}`);
}


  
  return res.json();
}

export function MonthlyCostBreakdown({vehicle_id}:
  {vehicle_id: string}
) {

          const { data, error, isLoading, isError } =
        useQuery({
            queryKey: [`vehicle-${vehicle_id}-analytics-monthly-cost`],
            queryFn: () => fetchMonthlyCost(vehicle_id),
            staleTime: 1000 * 30,
        },);

    if (error) {
        console.log(error);

    }

    if (isLoading) return <LoadingCard />
    if (isError) return <p>There was an error</p>
    if (!data) return <NullCard title="Total spend overtime" description="You have no fuel logs. Please add them to see metrics" />

const month = new Date().setMonth(new Date().getMonth() - 6);
const startMonth = format(month, "MMMM");
const endMonth = format(new Date(), "MMMM")



  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly cost breakdown</CardTitle>
        <CardDescription>{startMonth} - {endMonth} {new Date().getFullYear()}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="fuel"
              stackId="a"
              fill="var(--color-fuel)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="repair"
              stackId="a"
              fill="var(--color-repair)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
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
