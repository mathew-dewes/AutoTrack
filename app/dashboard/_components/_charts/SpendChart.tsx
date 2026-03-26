"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { format } from "date-fns";
import { MonthlySpend, TopVehicle } from "@/lib/validation/types";
import { convertToMoney } from "@/lib/utils";

const date = new Date();
const currentMonth = format(date, "LLLL");
date.setMonth(date.getMonth() - 5);
const sixMonthPrevious = format(date, "LLLL")

type Props = {
  chartData:MonthlySpend[],
  topVehicle:TopVehicle

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

export function SpendChart({chartData, topVehicle}:Props) {

  const {make, model, licence_plate, total_spend} = topVehicle;
  return (
    <Card>
      <CardHeader>
        <CardDescription className="text-white">{sixMonthPrevious} - {currentMonth} {date.getFullYear()}</CardDescription>
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
            <Bar className="fill-primary" dataKey="spend"  radius={4}>
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
        <p>{make} {model} - {licence_plate}</p>
        <p>Total spend: {convertToMoney(total_spend)}</p>
       </div>
      </CardFooter>
    </Card>
  )
}
