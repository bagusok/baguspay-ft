"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useCallback } from "react";
import Dropzone from "@/components/ui/dropzone";

export default function ServiceDetailPage() {
  const onDropImageBanner = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);
  const onDropImageIcon = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);

  return (
    <>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="">
          <div>
            <Label>Banner Image</Label>
            <Dropzone onDrop={onDropImageBanner} />
          </div>
          <div className="mt-3 w-24">
            <Label>Icon Image</Label>
            <Dropzone onDrop={onDropImageIcon} />
          </div>
        </div>
        <div className="">
          <form action="" className="flex flex-col gap-2 w-full">
            <div className="w-full">
              <Label>Title</Label>
              <Input placeholder="Free Fire" className="w-full" />
            </div>
            <div className="w-full">
              <Label>Slug</Label>
              <Input placeholder="Free Fire" className="w-full" />
            </div>
            <div className="w-full">
              <Label>Publisher Game</Label>
              <Input placeholder="Garena" className="w-full" />
            </div>
            <div className="w-full">
              <Label>Description</Label>
              <Textarea placeholder="Lorem ipsum dolor sit amet."></Textarea>
            </div>
            <div className="mt-2"></div>
            <Label className="text-center">Seo Setting</Label>
            <div className="w-full">
              <Label>Meta Title</Label>
              <Input placeholder="Free Fire" className="w-full" />
            </div>
            <div className="w-full">
              <Label>Meta Description</Label>
              <Textarea placeholder="Lorem ipsum dolor sit amet."></Textarea>
            </div>
          </form>
        </div>
      </div>

      <div id="tabs-group" className="flex flex-row gap-3 flex-wrap mt-5">
        <Button className="text-xs font-medium">Diamonds</Button>
        <Button className="text-xs font-medium " variant="secondary">
          Weekly Pass
        </Button>
        <Button className="text-xs font-medium " variant="outline">
          + Tambah Group
        </Button>
      </div>

      <div id="products" className="mt-3 ">
        <div className="inline-flex justify-end w-full">
          <Button className="text-xs font-medium " variant="default">
            + Tambah Product
          </Button>
        </div>

        <Table className="mt-4">
          <TableCaption>List Products</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Price From Provider</TableHead>
              <TableHead>Fees</TableHead>
              <TableHead>Profit</TableHead>
              <TableHead>Is Available</TableHead>
              <TableHead className="text-right">Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="">ML-123</TableCell>
              <TableCell className="">900 DM - Mobile Legends</TableCell>
              <TableCell className="">100.000</TableCell>
              <TableCell className="">95.000</TableCell>
              <TableCell className="">1% + 50 </TableCell>
              <TableCell className="">4000 </TableCell>
              <TableCell>
                <Badge className="bg-green-500">Available</Badge>
              </TableCell>
              <TableCell className="text-right">22-02-2024</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Pagination className="mt-5">
          <PaginationContent>
            <PaginationPrevious href="#" />
            <PaginationLink href="#">1</PaginationLink>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
            <PaginationLink href="#">3</PaginationLink>
            <PaginationEllipsis />
            <PaginationNext href="#" />
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
