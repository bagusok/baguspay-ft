"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function ModalAdvanceFilter({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}) {
  const pathname = usePathname();
  const searchparams = useSearchParams();
  const router = useRouter();

  const [depositStatusSelected, setdepositStatusSelected] =
    useState<string>("");
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const handleApplyFilter = () => {
    const params = new URLSearchParams(searchparams.toString());
    if (depositStatusSelected) {
      params.set("depositStatus", depositStatusSelected);
    } else {
      params.delete("depositStatus");
    }

    if (date?.from) {
      params.set("from", format(date.from, "yyyy-MM-dd"));
    } else {
      params.delete("from");
    }

    if (date?.to) {
      params.set("to", format(date.to, "yyyy-MM-dd"));
    } else {
      params.delete("to");
    }

    router.replace(`${pathname}?${params.toString()}`);
    setOpenModal(false);
  };

  if (!openModal) return null;

  return (
    <section id="create-service-group">
      <div
        className="fixed z-50 top-0 right-0 left-0 bottom-0 bg-black/60 inline-flex justify-center p-8 overflow-y-auto"
        onClick={() => setOpenModal(false)}
      >
        <div
          className="md:w-2/3 w-full rounded-lg bg-white h-fit px-5 pb-5 pt-3 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-center font-semibold">Advance Filter</h2>
          <div className="mt-4">
            <h4 className="text-sm">Paid Status</h4>
            <div className="inline-flex gap-3 mt-2">
              <Button
                variant={
                  depositStatusSelected == "PENDING" ? "default" : "outline"
                }
                className="text-xs"
                onClick={() => setdepositStatusSelected("PENDING")}
              >
                PENDING
              </Button>
              <Button
                variant={
                  depositStatusSelected == "PROCESS" ? "default" : "outline"
                }
                className="text-xs"
                onClick={() => setdepositStatusSelected("PROCESS")}
              >
                PROCESS
              </Button>
              <Button
                variant={
                  depositStatusSelected == "SUCCESS" ? "default" : "outline"
                }
                className="text-xs"
                onClick={() => setdepositStatusSelected("SUCCESS")}
              >
                SUCCESS
              </Button>
              <Button
                variant={
                  depositStatusSelected == "EXPIRED" ? "default" : "outline"
                }
                className="text-xs"
                onClick={() => setdepositStatusSelected("EXPIRED")}
              >
                EXPIRED
              </Button>
              <Button
                variant={
                  depositStatusSelected == "CANCELED" ? "default" : "outline"
                }
                className="text-xs"
                onClick={() => setdepositStatusSelected("CANCELED")}
              >
                CANCELED
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-sm">Range Date</h4>
            <div className="grid gap-2 mt-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-[300px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="w-full inline-flex justify-end gap-3 mt-7">
            <Button
              variant="outline"
              onClick={() => {
                setdepositStatusSelected("");
                setDate(undefined);
              }}
            >
              Reset
            </Button>
            <Button variant="default" onClick={() => handleApplyFilter()}>
              Apply
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
