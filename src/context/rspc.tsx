import { ReactElement, JSXElementConstructor } from "react";
import { QueryClient } from "@tanstack/react-query";
import { createClient } from "@rspc/client";
import { TauriTransport } from "@rspc/tauri";
import { createReactQueryHooks } from "@rspc/react";
import type { Procedures } from "../ts/bindings";

/**
 * Synchronous RSPC Client
 * This Will be use like
 *
 * # Example
 *
 * ```ts
 * await client.query(["version", "parameters"]);
 * ```
 *
 * To use this import int the file and use in place
 * which are not react component, like event handlers
 */
export const client = createClient<Procedures>({
  transport: new TauriTransport(),
});

const queryClient = new QueryClient();

/**
 * Asynchronous RSPC client
 * This is a react query for calling function,
 * it must be called inside a React Component.
 *
 * # Example
 *
 * ```ts
 * const { data, isLoading, error } = rspc.useQuery(["version", "parameters"]);
 * ```
 */
export const rspc = createReactQueryHooks<Procedures>();

export default function RspcProvider(props: {
  children:
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>
    | undefined;
}) {
  return (
    <rspc.Provider client={client} queryClient={queryClient}>
      {props.children}
    </rspc.Provider>
  );
}
