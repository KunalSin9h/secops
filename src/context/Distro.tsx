import { createContext, useState } from "react";

export interface DistroCtxValue {
  distro: string;
  setDistro: React.Dispatch<React.SetStateAction<string>>;
}

interface Props {
  children: React.ReactNode;
}

export const DistroContext = createContext<DistroCtxValue | null>(null);

export const DistroProvider = (props: Props) => {
  const [distro, setDistro] = useState("Ubuntu");

  return (
    <DistroContext.Provider value={{ distro, setDistro }}>
      {props.children}
    </DistroContext.Provider>
  );
};
