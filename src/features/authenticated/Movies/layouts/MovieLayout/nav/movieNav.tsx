import { VideoIcon, CodeIcon, BarChartIcon } from "@radix-ui/react-icons";
import type { TabItemHorizontal } from "@/components/ui/TabsHorizontal";

export const movieNavSections: TabItemHorizontal[] = [
  {
    id: "list",
    name: "Movies List",
    path: "/authenticated/movies/list",
    icon: <VideoIcon className="w-4 h-4" />,
  },
  {
    id: "encoding",
    name: "Encoding Queue",
    path: "/authenticated/movies/encoding",
    icon: <CodeIcon className="w-4 h-4" />,
  },
  {
    id: "analytics",
    name: "Analytics",
    path: "/authenticated/movies/analytics",
    icon: <BarChartIcon className="w-4 h-4" />,
    badge: "new",
  },
];
