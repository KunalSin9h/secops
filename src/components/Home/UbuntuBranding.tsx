import { rspc } from "@/context/rspc";
import React, {useContext} from 'react';
import {DistroContext} from "../context/Distro.jsx";

// This will collect information about the distro
// The data will be like this
// DISTRIB_ID=Ubuntu
// DISTRIB_RELEASE=22.04
// DISTRIB_CODENAME=jammy
// DISTRIB_DESCRIPTION="Ubuntu 22.04.3 LTS"
export default function Ubuntu() {
const distrocontext = useContext(DistroContext);
  const { data, isLoading, error } = rspc.useQuery(["get_distro"]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const info = data.split("\n");
  const release = info[2].replace(/PRETTY_NAME=("|')(.*?)\1|DISTRIB_CODENAME=("|')(.*?)\3/g, "$2$4");
  const distro_name = info[3].replace('DISTRIB_DESCRIPTION="', "").replace('"', "").replace("ID=", "");
  distrocontext.setDistro(distro_name);


  return (
    <div className="flex flex-col">
      <span className="text-purple-800 font-semibold">{release}</span>
      <span className="font-bold text-md xl:text-xl">{distro_name}</span>
    </div>
  );
}

