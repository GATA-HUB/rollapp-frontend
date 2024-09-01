export interface BaseCollection {
  nfts: any[];
  image: string;
  collection: string;
  creator: string;
  desc: string;
  quantity: number;
  minted: number;
  royalties: string;
  endingDate: number;
  price: number;
  token: string;
  address?: string;
}
export interface StakedCollection extends BaseCollection {
  staked: number;
  reward: number;
  token: string;
  poolIndex: number;
}