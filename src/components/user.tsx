import { useState } from "react";
import { client } from "@/context/rspc";

export default function User(props: { name: string }) {
  const [image, setImage] = useState("");

  client.query(["get_user_icon", props.name]).then(setImage).catch(console.log);

  return (
    <div className="flex items-center p-4 space-x-4 bg-red-200">
      <div>{image}</div>
      {/* <img
        className="rounded-full"
        src={`data:image/png;base64,${image}`}
        alt={`${props.name} icon`}
      /> */}
      <span>{props.name}</span>
    </div>
  );
}
