import { Skeleton } from "../ui/skeleton";

export default function LoadingList({ size }: { size: number }) {
  return (
    <div className="">
      {new Array(size).fill(0).map((_, idx) => {
        return <Skeleton key={idx} className="h-8 xl:h-10 w-22 xl:w-32 my-4" />;
      })}
    </div>
  );
}
