import { rspc } from "@/context/rspc";

export default function Home() {
  return (
    <div className="flex gap-4 ">
      <div className="w-1/2  flex flex-col gap-4">
        <div className="h-36 border rounded shadow p-2 flex items-center justify-center">
          <div className="flex gap-4 items-center">
            <img
              src="/ubuntu.png"
              alt="Ubuntu Desktop Logo"
              className="h-24 w-24"
            />
            <Ubuntu />
          </div>
        </div>
        <div className="">Updates</div>
      </div>
      <div className="w-1/2 ">Services</div>
    </div>
  );
}

// This will collect information about the distro
// The data will be like this
// DISTRIB_ID=Ubuntu
// DISTRIB_RELEASE=22.04
// DISTRIB_CODENAME=jammy
// DISTRIB_DESCRIPTION="Ubuntu 22.04.3 LTS"
function Ubuntu() {
  const { data, isLoading, error } = rspc.useQuery(["get_distro"]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const info = data.split("\n");
  const release = info[2].replace("DISTRIB_CODENAME=", "");
  const distro = info[3].replace('DISTRIB_DESCRIPTION="', "").replace('"', "");

  return (
    <div className="flex flex-col">
      <span className="text-purple-800 font-semibold">{release}</span>
      <span className="font-bold text-2xl">{distro}</span>
    </div>
  );
}
