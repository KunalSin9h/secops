import { rspc } from "@/context/rspc";
import User from "../user";

export default function Users() {
  const { data, isLoading, error } = rspc.useQuery(["get_all_users"]);

  if (error) {
    console.log(error);
    return <h1>Error</h1>;
  }

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      {data.map((user: string, index: number) => {
        return <User key={index} name={user} />;
      })}
    </div>
  );
}
