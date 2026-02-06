import type { HydraItem } from "./item";
import type { HydraView } from "./view";

export interface HydraCollection<T extends HydraItem = HydraItem> {
  "@context": string;
  "@id": string;
  "@type": string;
  totalItems: number;
  member: T[];
  view?: HydraView;
}

export function getCollectionMembers<T extends HydraItem>(collection: HydraCollection<T>): T[] {
  return collection.member;
}
