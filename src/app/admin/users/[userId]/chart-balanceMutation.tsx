"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { axiosIn } from "@/lib/axios";
import { apiUrl } from "@/lib/constant";
import { userTokenAtom } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import Select from "react-select";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function ChartBalanceMutation() {
  const userToken = useAtomValue(userTokenAtom);
  const params = useParams();

  const [selectedOption, setSelectedOption] = useState<string>("last30Days");

  const selectOptions = [
    { value: "last30Days", label: "30 hari terakhir" },
    { value: "last12Months", label: "12 Bulan Terakhir" },
  ];

  const getChartMutation = useQuery({
    queryKey: ["chart-balance-mutation"],
    queryFn: () =>
      axiosIn
        .get(`${apiUrl}/users/chart/balance-mutation/${params.userId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => res.data)
        .catch((err) => err.response.data),
  });

  const chartConfig = {
    desktop: {
      label: "IN",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "OUT",
      color: "hsl(var(--chart-2))",
    },
    other: {
      label: "All",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  if (getChartMutation.isLoading) return <div>Loading...</div>;
  if (getChartMutation.isError)
    return <div>Error: {getChartMutation.error.message}</div>;

  return (
    <Card>
      <CardHeader>
        <div className="inline-flex justify-between">
          <div>
            <CardTitle>
              {selectedOption == "last12Months"
                ? "Mutasi Saldo 12 Bulan Terakhir"
                : "Mutasi Saldo 30 Hari Terakhir"}
            </CardTitle>
            <CardDescription className="mt-1">
              Showing Mutasi Saldo{" "}
              {selectedOption == "last12Months"
                ? "12 bulan terakhir"
                : "30 hari terakhir"}
            </CardDescription>
          </div>
          <Select
            options={selectOptions}
            defaultValue={selectOptions[0]}
            // @ts-ignore
            onChange={(e) => setSelectedOption(e.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={
              selectedOption == "last12Months"
                ? getChartMutation.data.data.last12Months
                : getChartMutation.data.data.last30Days
            }
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={selectedOption == "last12Months" ? "month" : "day"}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={
                selectedOption == "last12Months"
                  ? (value) => value.slice(0, 3)
                  : (value) => value.slice(8, 10)
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />

            <Area
              dataKey="in"
              type="linear"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />

            <Area
              dataKey="out"
              type="linear"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this Day{" "}
              <HiArrowTrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              12 Agustus 2021
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  );
}
