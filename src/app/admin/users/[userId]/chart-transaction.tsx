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
import { HiArrowTrendingUp } from "react-icons/hi2";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import Select from "react-select";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function ChartTransaction() {
  const userToken = useAtomValue(userTokenAtom);
  const params = useParams();

  const [selectedOption, setSelectedOption] = useState<string>("last30Days");

  const selectOptions = [
    { value: "last30Days", label: "30 hari terakhir" },
    { value: "last12Months", label: "12 Bulan Terakhir" },
  ];

  const getChartTrx = useQuery({
    queryKey: ["chart-trx"],
    queryFn: () =>
      axiosIn
        .get(`${apiUrl}/users/chart/transaction/${params.userId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => res.data)
        .catch((err) => err.response.data),
  });

  const chartConfig = {
    desktop: {
      label: "Web",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
    other: {
      label: "All",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  if (getChartTrx.isLoading) return <div>Loading...</div>;
  if (getChartTrx.isError) return <div>Error: {getChartTrx.error.message}</div>;

  return (
    <Card>
      <CardHeader>
        <div className="inline-flex justify-between">
          <div>
            <CardTitle>
              {selectedOption == "last12Months"
                ? "Transaksi 12 Bulan Terakhir"
                : "Transaksi 30 Hari Terakhir"}
            </CardTitle>
            <CardDescription className="mt-1">
              Showing total transaksi{" "}
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
                ? getChartTrx.data.data.last12Months
                : getChartTrx.data.data.last30Days
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
              dataKey="all"
              type="linear"
              fill="var(--color-other)"
              fillOpacity={0.1}
              stroke="var(--color-other)"
              stackId="a"
            />
            <Area
              dataKey="mobile"
              type="linear"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="web"
              type="linear"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
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
