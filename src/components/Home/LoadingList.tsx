import { Skeleton } from "../ui/skeleton";

export default function LoadingList({ size }: { size: number }) {
  return (
    <div className="">
      {new Array(size).fill(0).map((_, idx) => {
        return (
          <Skeleton key={idx} className="h-8 xl:h-12 w-24 xl:w-36 my-4 " />
        );
      })}
    </div>
  );
}
