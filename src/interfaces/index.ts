export interface Variant {
  id: string;
  name: string;
  title: string;
  usage: boolean;
  values: VariantValue[];
}

export interface VariantOptions {
  id: string;
  name: string;
  title: string;
  usage: boolean;
}

export interface VariantValue {
  id: string;
  title: string;
}

export interface VariantPrice {
  id: string;
  variant: VariantOptionsAndPrices;
}

export interface VariantOptionsAndPrices {
  options: VariantOption[];
  price: number | string;
  stock: number | string;
}

export interface VariantOption {
  id: string;
  name: string;
  title: string;
}
