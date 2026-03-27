"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

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
import { format } from "date-fns";
import { MonthlySpend, TopVehicle, TotalSpendBreakdown } from "@/lib/validation/types";
import { convertToMoney } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

const date = new Date();
const currentMonth = format(date, "LLLL");
date.setMonth(date.getMonth() - 5);
const sixMonthPrevious = format(date, "LLLL")

type Props = {
  chartData: MonthlySpend[],
  topVehicle: TopVehicle,
  spendBreakdown: TotalSpendBreakdown

}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig

export function SpendChart({ chartData, topVehicle, spendBreakdown }: Props) {

  const { make, model, licence_plate_number, total_spend } = topVehicle;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Total Spend</CardTitle>
        <CardDescription>{sixMonthPrevious} - {currentMonth} {date.getFullYear()}
          <div className="mt-3 space-y-1 text-white">
            <h2 className="font-semibold">Breakdown:</h2>
            <div className="flex gap-5">
              <p>Yearly: {convertToMoney(spendBreakdown.yearly_spend)}</p>
              <p>Monthly: {convertToMoney(spendBreakdown.monthly_spend)}</p>
              <div className="flex gap-1.5 items-center">

                <p>Change: {spendBreakdown.monthly_change_percent}%</p>
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>


          </div>

        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="spend" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar className="fill-primary" dataKey="spend" radius={4}>
              <LabelList
                dataKey="month"
                position="insideLeft"
                offset={8}
                className="fill-white"
                fontSize={12}
              />
              <LabelList
                dataKey="desktop"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div>
          <p>Highest costing vehicle:</p>
          <p>{make} {model} - {licence_plate_number}</p>
          <p>Total spend: {convertToMoney(total_spend)}</p>
        </div>
      </CardFooter>
    </Card>
  )
}
