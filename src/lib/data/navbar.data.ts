const navbarItems: INavbarItem[] = [
  {
    id: 1,
    title: "Home",
    url: "/",
    isHaveChild: false,
  },
  {
    id: 2,
    title: "Transactions",
    url: "/transactions",
    isHaveChild: true,
    child: [
      {
        id: 3,
        title: "History Transaksi",
        url: "/transaction/history",
      },
      {
        id: 4,
        title: "Check Transaksi",
        url: "/transaction/track",
      },
    ],
  },
  {
    id: 5,
    title: "Tools",
    url: "/tools",
    isHaveChild: true,
    child: [
      {
        id: 6,
        title: "Hitung Winrate",
        url: "/tools/winrate",
      },
      {
        id: 7,
        title: "HP Magic Wheels",
        url: "/tools/hp-magic-wheels",
      },
      {
        id: 8,
        title: "HP Zodiac",
        url: "/tools/hp-zodiac",
      },
    ],
  },
];

export default navbarItems;

export interface INavbarItem {
  id: number;
  title: string;
  url: string;
  isHaveChild?: boolean;
  child?: INavbarChild[];
}

export interface INavbarChild extends INavbarItem {}

export const sidebarAdmin: INavbarItem[] = [
  {
    id: 1,
    title: "Dashboard",
    url: "/admin",
    isHaveChild: false,
  },
  {
    id: 2,
    title: "Services",
    url: "/admin/services",
    isHaveChild: true,
    child: [
      {
        id: 3,
        title: "List Services",
        url: "/admin/services",
      },
      {
        id: 4,
        title: "List Service Group",
        url: "/admin/services/group",
      },
      {
        id: 4,
        title: "List Product Group",
        url: "/admin/services/product-group",
      },
      {
        id: 3,
        title: "List Products",
        url: "/admin/services/products",
      },
    ],
  },
  {
    id: 5,
    title: "Payments",
    url: "/admin/payments",
    isHaveChild: true,
    child: [
      {
        id: 6,
        title: "List Payment Method",
        url: "/admin/payments",
      },
      {
        id: 7,
        title: "Deposit Method",
        url: "/admin/payments/deposit-method",
      },
      {
        id: 8,
        title: "Deposit History",
        url: "/admin/payments/deposit-history",
      },
    ],
  },
  {
    id: 9,
    title: "Transactions",
    url: "/admin/transactions",
    isHaveChild: false,
    child: [],
  },
  {
    id: 5,
    title: "Manage Users",
    url: "/admin/users",
    isHaveChild: false,
    child: [],
  },
  {
    id: 5,
    title: "Web Settings",
    url: "/admin/web-settings",
    isHaveChild: true,
    child: [
      {
        id: 6,
        title: "Front Banner",
        url: "/admin/web-settings/front-banner",
      },
      {
        id: 7,
        title: "Meta SEO",
        url: "/admin/web-settings/meta-seo",
      },
      {
        id: 8,
        title: "Additionals",
        url: "/admin/payments/additionals",
      },
    ],
  },
];
