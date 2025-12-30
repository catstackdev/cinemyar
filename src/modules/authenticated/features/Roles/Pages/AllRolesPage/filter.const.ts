import type { FilterGroup } from "@/components/ui/Params/ParamFilterDropdown/ParamFilterDropdown.types";
import { entityOptions } from "@/consts/entity.const";
import { OrderOptions } from "@/consts/order.const";

export const filters: FilterGroup[] = [
  {
    name: "entity",
    title: "Entity",
    options: [{ label: "All", value: undefined }, ...entityOptions],
  },
  {
    name: "sortBy",
    title: "Sort By",
    options: [
      { label: "Default", value: undefined },
      { label: "displayName", value: "displayName" },
      { label: "Created At", value: "createdAt" },
      { label: "Updated At", value: "updatedAt" },
    ],
  },
  {
    name: "orderBy",
    title: "Order By",
    notShowChip: true,
    options: OrderOptions,
  },
];
