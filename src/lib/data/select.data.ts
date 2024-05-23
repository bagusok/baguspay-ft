export const dataServiceType = [
  { value: "GAME_DIRECT", label: "GAME DIRECT" },
  { value: "GAME_VOUCHER", label: "GAME VOUCHER" },
  { value: "TAGIHAN", label: "TAGIHAN" },
  { value: "PULSA", label: "PULSA" },
  { value: "PAKET_DATA", label: "PAKET DATA" },
  { value: "E_MONEY", label: "E MONEY" },
  { value: "AKUN_PREMIUM", label: "AKUN PREMIUM" },
  { value: "SMM", label: "SMM" },
  { value: "LAINNYA", label: "LAINNYA" },
];

export const dataInputIdType = [
  {
    value: "TEXT",
    label: "TEXT",
  },
  {
    value: "NUMBER",
    label: "NUMBER",
  },
  {
    value: "SELECT",
    label: "SELECT",
  },
];

export const dataRegion = [
  {
    value: "INDONESIA",
    label: "INDONESIA",
  },
  {
    value: "GLOBAL",
    label: "GLOBAL",
  },
];

export const dataPaymentProvider: IDataSelectType[] = [
  {
    label: "PAY DISINI",
    value: "PAYDISINI",
  },
  {
    label: "DUITKU",
    value: "DUITKU",
  },
  {
    label: "TOKOPAY",
    value: "TOKOPAY",
  },
  {
    label: "FLIP BUSSINES",
    value: "FLIP",
  },
];

export const dataPaymentMethodType = [
  {
    label: "Tranfer Bank",
    value: "TRANSFER_BANK",
  },
  {
    label: "Transfer Ewallet",
    value: "TRANSFER_EWALLET",
  },
  {
    label: "Transfer Pulsa",
    value: "TRANSFER_PULSA",
  },
  {
    label: "Direct Ewallet",
    value: "DIRECT_EWALLET",
  },
  {
    label: "Virtual Account",
    value: "VIRTUAL_ACCOUNT",
  },
  {
    label: "Retail Outlet",
    value: "RETAIL_OUTLET",
  },
  {
    label: "Cedit Card",
    value: "CREDIT_CARD",
  },
  {
    label: "Link Payment",
    value: "LINK_PAYMENT",
  },
  {
    label: "QR Code",
    value: "QR_CODE",
  },
  {
    label: "OTHER",
    value: "OTHER",
  },
];

export interface IDataSelectType {
  value: string;
  label: string;
}
