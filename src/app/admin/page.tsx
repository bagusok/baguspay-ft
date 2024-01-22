import { Label } from "@/components/ui/label";
import CustomChart from "./CustomChart";

export default function AdminDashboard() {
  return (
    <>
      <h2 className="mb-2">Transaksi Hari Ini</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3 rounded-lg bg-slate-100 dark:bg-card-foreground w-full shadow-sm flex flex-col gap-2">
          <h3 className="text-sm text-muted-foreground font-semibold">
            Total Transaksi
          </h3>
          <p className="text-2xl text-primary font-semibold">Rp. 100.000</p>
          <Label className="text-xs text-muted-foreground">10 Penjualan</Label>
        </div>
        <div className="p-3 rounded-lg bg-slate-100 dark:bg-card-foreground w-full shadow-sm flex flex-col gap-2">
          <h3 className="text-sm text-muted-foreground font-semibold">
            Transaksi Berhasil
          </h3>
          <p className="text-2xl text-primary font-semibold">Rp. 100.000</p>
          <Label className="text-xs text-muted-foreground">10 Penjualan</Label>
        </div>
        <div className="p-3 rounded-lg bg-slate-100 dark:bg-card-foreground w-full shadow-sm flex flex-col gap-2">
          <h3 className="text-sm text-muted-foreground font-semibold">
            Transaksi Pending
          </h3>
          <p className="text-2xl text-primary font-semibold">Rp. 100.000</p>
          <Label className="text-xs text-muted-foreground">10 Penjualan</Label>
        </div>
        <div className="p-3 rounded-lg bg-slate-100 dark:bg-card-foreground w-full shadow-sm flex flex-col gap-2">
          <h3 className="text-sm text-muted-foreground font-semibold">
            Transaksi Gagal/Expired
          </h3>
          <p className="text-2xl text-primary font-semibold">Rp. 100.000</p>
          <Label className="text-xs text-muted-foreground">10 Penjualan</Label>
        </div>
        <div className="p-3 rounded-lg bg-slate-100 dark:bg-card-foreground w-full shadow-sm flex flex-col gap-2">
          <h3 className="text-sm text-muted-foreground font-semibold">
            Refund Berhasil
          </h3>
          <p className="text-2xl text-primary font-semibold">Rp. 100.000</p>
          <Label className="text-xs text-muted-foreground">10 Penjualan</Label>
        </div>
        <div className="p-3 rounded-lg bg-slate-100 dark:bg-card-foreground w-full shadow-sm flex flex-col gap-2">
          <h3 className="text-sm text-muted-foreground font-semibold">
            Refund Pending
          </h3>
          <p className="text-2xl text-primary font-semibold">Rp. 100.000</p>
          <Label className="text-xs text-muted-foreground">10 Penjualan</Label>
        </div>
        <div className="p-3 rounded-lg bg-slate-100 dark:bg-card-foreground w-full shadow-sm flex flex-col gap-2">
          <h3 className="text-sm text-muted-foreground font-semibold">
            Keuntungan
          </h3>
          <p className="text-2xl text-primary font-semibold">Rp. 100.000</p>
          <Label className="text-xs text-muted-foreground">10 Penjualan</Label>
        </div>
        <div className="p-3 rounded-lg bg-slate-100 dark:bg-card-foreground w-full shadow-sm flex flex-col gap-2">
          <h3 className="text-sm text-muted-foreground font-semibold">
            Total Modal
          </h3>
          <p className="text-2xl text-primary font-semibold">Rp. 100.000</p>
          <Label className="text-xs text-muted-foreground">10 Penjualan</Label>
        </div>
      </div>

      <h2 className="mb-2 mt-5">Semua Transaksi</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3 rounded-lg bg-slate-100 dark:bg-card-foreground w-full shadow-sm flex flex-col gap-2">
          <h3 className="text-sm text-muted-foreground font-semibold">
            Total Transaksi
          </h3>
          <p className="text-2xl text-primary font-semibold">Rp. 100.000</p>
          <Label className="text-xs text-muted-foreground">10 Penjualan</Label>
        </div>
        <div className="p-3 rounded-lg bg-slate-100 dark:bg-card-foreground w-full shadow-sm flex flex-col gap-2">
          <h3 className="text-sm text-muted-foreground font-semibold">
            Transaksi Berhasil
          </h3>
          <p className="text-2xl text-primary font-semibold">Rp. 100.000</p>
          <Label className="text-xs text-muted-foreground">10 Penjualan</Label>
        </div>
        <div className="p-3 rounded-lg bg-slate-100 dark:bg-card-foreground w-full shadow-sm flex flex-col gap-2">
          <h3 className="text-sm text-muted-foreground font-semibold">
            Transaksi Pending
          </h3>
          <p className="text-2xl text-primary font-semibold">Rp. 100.000</p>
          <Label className="text-xs text-muted-foreground">10 Penjualan</Label>
        </div>
        <div className="p-3 rounded-lg bg-slate-100 dark:bg-card-foreground w-full shadow-sm flex flex-col gap-2">
          <h3 className="text-sm text-muted-foreground font-semibold">
            Transaksi Gagal/Expired
          </h3>
          <p className="text-2xl text-primary font-semibold">Rp. 100.000</p>
          <Label className="text-xs text-muted-foreground">10 Penjualan</Label>
        </div>
        <div className="p-3 rounded-lg bg-slate-100 dark:bg-card-foreground w-full shadow-sm flex flex-col gap-2">
          <h3 className="text-sm text-muted-foreground font-semibold">
            Refund Berhasil
          </h3>
          <p className="text-2xl text-primary font-semibold">Rp. 100.000</p>
          <Label className="text-xs text-muted-foreground">10 Penjualan</Label>
        </div>
        <div className="p-3 rounded-lg bg-slate-100 dark:bg-card-foreground w-full shadow-sm flex flex-col gap-2">
          <h3 className="text-sm text-muted-foreground font-semibold">
            Refund Pending
          </h3>
          <p className="text-2xl text-primary font-semibold">Rp. 100.000</p>
          <Label className="text-xs text-muted-foreground">10 Penjualan</Label>
        </div>
        <div className="p-3 rounded-lg bg-slate-100 dark:bg-card-foreground w-full shadow-sm flex flex-col gap-2">
          <h3 className="text-sm text-muted-foreground font-semibold">
            Keuntungan
          </h3>
          <p className="text-2xl text-primary font-semibold">Rp. 100.000</p>
          <Label className="text-xs text-muted-foreground">10 Penjualan</Label>
        </div>
        <div className="p-3 rounded-lg bg-slate-100 dark:bg-card-foreground w-full shadow-sm flex flex-col gap-2">
          <h3 className="text-sm text-muted-foreground font-semibold">
            Total Modal
          </h3>
          <p className="text-2xl text-primary font-semibold">Rp. 100.000</p>
          <Label className="text-xs text-muted-foreground">10 Penjualan</Label>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mt-5">
        {/* <CustomChart /> */}
        {/* <CustomChart /> */}
      </div>
    </>
  );
}
