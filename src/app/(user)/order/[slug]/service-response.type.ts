export interface ServiceResponse {
  statusCode: number;
  message: string;
  data?: Data;
}

export interface Data {
  id: string;
  name: string;
  slug: string;
  desc: string;
  imgLogo: string;
  imgBanner: string;
  type: string;
  publisher: string;
  isAvailable: boolean;
  inputFieldDescription: string;
  inputFieldHintImage: string;
  isInputFieldOne: boolean;
  inputFieldOneLabel: string;
  inputFieldOneType: string;
  inputFieldOneOption: string;
  isInputFieldTwo: boolean;
  inputFieldTwoLabel: string;
  inputFieldTwoType: string;
  inputFieldTwoOption: string;
  isInputFieldThree: boolean;
  inputFieldThreeLabel: string;
  inputFieldThreeType: string;
  inputFieldThreeOption: string;
  region: string;
  metaName: string;
  metaDesc: string;
  metaTags: string;
  createdAt: Date;
  updatedAt: Date;
  productGroup: ProductGroup[];
}

export interface ProductGroup {
  id: string;
  name: string;
  desc: string;
  imgLogo: null;
  region: string;
  servicesId: string;
  createdAt: Date;
  updatedAt: Date;
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  desc: string;
  cutOffStart: CutOff;
  cutOffEnd: CutOff;
  isAvailable: boolean;
  stock: number;
  createdAt: Date;
  imgLogo: null;
}

export enum CutOff {
  The0000 = "00:00",
}
