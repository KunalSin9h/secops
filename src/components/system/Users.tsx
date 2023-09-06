import { rspc } from "@/context/rspc";

export default function Users() {
  const { data, isLoading, error } = rspc.useQuery(["get_all_users"]);

  if (error) {
    console.log(error);
    return <h1>Error</h1>;
  }

  if (isLoading) return null;
  return <h1>{data}</h1>;
}
