import { Skeleton } from "../ui/skeleton";
import { rspc } from "@/context/rspc";

export default function Version() {
  const { data, isLoading, error } = rspc.useQuery(["version"]);

  if (error) {
    console.error(error);
    return null;
  }

  if (isLoading) return <Skeleton className="h-8 w-[80px]" />;

  return <span>{data}</span>;
}
