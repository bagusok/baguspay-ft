import { Badge } from "@/components/ui/badge";
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
      <h2 className="text-lg font-bold">History Transaksi</h2>

      <Table className="mt-4" suppressHydrationWarning>
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
    </section>
  );
}
