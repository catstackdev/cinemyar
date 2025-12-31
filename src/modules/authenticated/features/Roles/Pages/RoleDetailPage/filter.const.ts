import type { FilterGroup } from "@/components/ui/Params/ParamFilterDropdown/ParamFilterDropdown.types";
import { OrderOptions } from "@/consts/order.const";

export const filters: FilterGroup[] = [
  {
    name: "sortBy",
    title: "Sort By",
    options: [
      { label: "Default", value: undefined },
      { label: "Username", value: "username" },
      { label: "Email", value: "email" },
      { label: "Assigned At", value: "createdAt" },
    ],
  },
  {
    name: "orderBy",
    title: "Order By",
    notShowChip: true,
    options: OrderOptions,
  },
];
