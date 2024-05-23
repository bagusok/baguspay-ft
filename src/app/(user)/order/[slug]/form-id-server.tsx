"use client";

import { Label } from "@/components/ui/label";
import { Data } from "./service-response.type";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

export default function FormIdServer({
  data,
  value,
  setValue,
}: {
  data: Data;
  value: string;
  setValue: Function;
}) {
  const [mergeValue, setMergeValue] = useState<string[]>([]);

  useMemo(() => {
    setValue(() => mergeValue.join(",").replaceAll(",", ":"));
    console.log(mergeValue, value);
  }, [mergeValue]);

  return (
    <>
      <div
        id="split"
        className={cn("w-full grid gap-2 mb-2", {
          "grid-cols-1": !data.isInputFieldTwo,
          "grid-cols-2": data.isInputFieldTwo,
        })}
      >
        <div
          id="form-group"
          className={cn({
            hidden: !data.isInputFieldOne,
          })}
        >
          <Label htmlFor="input1">{data.inputFieldOneLabel}</Label>
          {data.inputFieldOneType == "SELECT" ? (
            <Select
              name="input1"
              onValueChange={(value) =>
                setMergeValue((prev) => [value, prev[1] ?? ""])
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={data.inputFieldOneLabel} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {JSON.parse(data.inputFieldOneOption).map(
                    (
                      item: {
                        label: string;
                        value: string;
                      },
                      index: number
                    ) => (
                      <SelectItem key={item.value + index} value={item.value}>
                        {item.label}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <Input
              name="input1"
              type={data.inputFieldOneType.toLowerCase()}
              placeholder={data.inputFieldOneLabel}
              required
              onInput={(e) =>
                setMergeValue((prev) => [e.currentTarget?.value, prev[1] ?? ""])
              }
            ></Input>
          )}
        </div>
        <div
          id="form-group"
          className={cn({
            hidden: !data.isInputFieldTwo,
          })}
        >
          <Label htmlFor="input2">{data.inputFieldTwoLabel}</Label>
          {data.inputFieldTwoType == "SELECT" ? (
            <Select
              name="input2"
              onValueChange={(value) =>
                setMergeValue((prev) => [prev[0] ?? "", value])
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={data.inputFieldTwoLabel} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {JSON.parse(data.inputFieldTwoOption).map(
                    (
                      item: {
                        label: string;
                        value: string;
                      },
                      index: number
                    ) => (
                      <SelectItem key={item.value + index} value={item.value}>
                        {item.label}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <Input
              name="input2"
              type={data.inputFieldTwoType.toLowerCase()}
              placeholder={data.inputFieldTwoLabel}
              required={data.isInputFieldTwo}
              onInput={(e) =>
                setMergeValue((prev) => [prev[0], e.currentTarget?.value])
              }
            ></Input>
          )}
        </div>
      </div>
      <Label className="text-muted-foreground  text-xs">
        Temukan ID dan Server Anda di dalam game pada menu Profile
      </Label>
    </>
  );
}
