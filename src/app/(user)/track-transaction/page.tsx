import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
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

export default function MyTransaction() {
  return (
    <section>
      <h2 className="text-xl font-bold text-center">Lacak Transaksi</h2>
      <form action="" className="w-full flex flex-col items-center gap-4 mt-8">
        <Input className="h-12 md:max-w-[40rem]" />
        <Button>Lacak</Button>
      </form>

      <Table className="mt-8">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Trx ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Paid Status</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead className="text-right">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="">INV001</TableCell>
            <TableCell className="">900 DM - Mobile Legends</TableCell>
            <TableCell className="">Rp.100.000</TableCell>
            <TableCell>
              <Badge className="bg-green-500">Paid</Badge>
            </TableCell>
            <TableCell>
              <Badge className="bg-orange-500">Processing</Badge>
            </TableCell>
            <TableCell className="text-right">22-02-2024</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
}
