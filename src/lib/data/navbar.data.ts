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
        title: "My Transactions",
        url: "/transactions/all",
      },
      {
        id: 4,
        title: "Check Transactions by ID",
        url: "/transactions/check",
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
  {
    id: 9,
    title: "My Account",
    url: "/my-account",
    isHaveChild: false,
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
