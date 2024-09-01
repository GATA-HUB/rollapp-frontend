import {BaseCollection, StakedCollection} from "@/app/types/nft";

export const store: {
  BaseCollections: BaseCollection[];
  ActiveIncentivizedCollections: StakedCollection[];
  totalReward: number,
  userStaked: StakedCollection[]
} = {
  ActiveIncentivizedCollections: [],
  BaseCollections: [],
  totalReward: 0,
  userStaked: []
};