import { rspc } from "@/context/rspc";
import { Skeleton } from "../ui/skeleton";

export default function Users() {
  const { data, isLoading, error } = rspc.useQuery(["get_all_users"]);

  if (error) {
    console.log(error);
    return <h1>Error</h1>;
  }

  if (isLoading) return <Skeleton className="h-4 w-[50px]" />;

  return <h1>{data}</h1>;
}
