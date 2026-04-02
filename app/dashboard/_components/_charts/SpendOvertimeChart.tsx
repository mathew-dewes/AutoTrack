"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query"
import LoadingCard from "@/components/web/LoadingCard"
import NullCard from "@/components/web/NullCard"
import { spendChartData } from "@/lib/validation/types"


async function fetchSpendData():Promise<spendChartData[]>{
    const res = await fetch(`/api/dashboard/spend`);
    if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized. Please log in.");
        throw new Error(`Failed to spend data: ${res.statusText}`);
    }



    return res.json();
}


export const description = "An interactive area chart"


const chartConfig = {
  fuel_cost: {
    label: "Fuel",
    color: "var(--chart-1)",
  },
  repair_cost: {
    label: "Repairs",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function SpendOvertimeChart() {
  const [timeRange, setTimeRange] = React.useState("90d");

      const { data, error, isLoading, isError } =
        useQuery({
            queryKey: [`spend`],
            queryFn: () => fetchSpendData(),
            staleTime: 1000 * 30,
        },);

    if (error) {
        console.log(error);

    }

    if (isLoading) return <LoadingCard />
    if (isError) return <p>There was an error</p>
    if (!data) return <NullCard title="Fleet Summary" description="You have no fuel logs. Please add them to see metrics" />


  const filteredData = data.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date()
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="pt-0 md:col-span-2">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Total spend overtime - Fuel vs Repair cost</CardTitle>
          <CardDescription>
            Showing total spend for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-40 rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-62.5 w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillFuel" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-fuel_cost)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-fuel_cost)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillRepair" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-repair_cost)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-repair_cost)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
            
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="fuel_cost"
              type="natural"
              fill="url(#fillFuel)"
              stroke="var(--color-fuel_cost)"
              stackId="a"
            />
            <Area
              dataKey="repair_cost"
              type="natural"
              fill="url(#fillRepair)"
              stroke="var(--color-repair_cost)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
