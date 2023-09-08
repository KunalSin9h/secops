import { rspc } from "@/context/rspc";
import User from "../user";

export default function UserInfo() {
  const { data, isLoading, error } = rspc.useQuery(["get_current_user"]);

  if (error) {
    console.log(error);
    return <h1>Error</h1>;
  }

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <User name={data} />
    </div>
  );
}
