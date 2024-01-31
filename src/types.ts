export interface CryptoDataType {
  p: number;
  pair: string;
}

export interface CurrencyDataProps {
  currentTab: string;
  urlPair: string;
  socketUrl: string;
}

export interface ForexDataType {
  p: string;
  a: number;
}

export interface ListProps {
  currentTab: string;
  data: DataType[];
}

export interface TabProps {
  name: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
  currentTab: string;
}

export type DataType = CryptoDataType | ForexDataType;
