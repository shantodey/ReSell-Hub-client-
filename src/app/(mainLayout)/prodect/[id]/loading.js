import { Card, Skeleton } from "@heroui/react";

export default function ProductDetailsSkeleton() {
  const thumbnailPlaceholders = Array.from({ length: 3 });

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-10 select-none">

      <div className="flex flex-col gap-4">

        <Skeleton className="rounded-2xl">
          <div className="w-full h-100 bg-slate-200 rounded-2xl" />
        </Skeleton>
        <div className="flex gap-3 overflow-x-auto py-2">
          {thumbnailPlaceholders.map((_, index) => (
            <Skeleton key={index} className="rounded-xl flex-shrink-0">
              <div className="w-20 h-20 bg-slate-200 rounded-xl" />
            </Skeleton>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <div>
          <div className="flex gap-2 mb-3">
            <Skeleton className="rounded-full">
              <div className="px-3 py-1 w-20 h-6 bg-slate-200 rounded-full" />
            </Skeleton>
            <Skeleton className="rounded-full">
              <div className="px-3 py-1 w-32 h-6 bg-slate-200 rounded-full" />
            </Skeleton>
          </div>
          <div className="space-y-2 mb-2">
            <Skeleton className="w-11/12 h-8 rounded-lg" />
            <Skeleton className="w-3/4 h-8 rounded-lg" />
          </div>

          <Skeleton className="w-1/3 h-5 rounded-md mb-4" />
          <hr className="my-4 border-slate-100" />
          <Card className="bg-slate-50 p-4 rounded-xl mb-6 border border-slate-100" shadow="none">
            <div className="flex justify-between items-center mb-2">
              <Skeleton className="w-16 h-4 rounded" />
              <Skeleton className="w-20 h-5 rounded" />
            </div>
            <div className="flex justify-between items-center">
              <Skeleton className="w-24 h-5 rounded" />
              <Skeleton className="w-32 h-8 rounded-lg" />
            </div>
          </Card>

          <div className="flex items-center gap-4 mb-8">
            <Skeleton className="w-16 h-5 rounded" />
            <Skeleton className="rounded-lg">
              <div className="w-32 h-10 bg-slate-200 rounded-lg" />
            </Skeleton>
          </div>
        </div>

        <div className="mt-auto">
          <Card className="bg-blue-50/20 border border-blue-100/50 p-4 rounded-xl mb-6 space-y-2" shadow="none">
            <Skeleton className="w-1/3 h-4 rounded" />
            <Skeleton className="w-1/2 h-4 rounded" />
            <Skeleton className="w-2/5 h-4 rounded" />
          </Card>

          <Skeleton className="rounded-xl">
            <div className="w-full h-12 bg-slate-200 rounded-xl" />
          </Skeleton>
        </div>
      </div>


      <div className="col-span-full mt-6 space-y-3">
        <Skeleton className="w-48 h-6 rounded border-b pb-2" />
        <div className="space-y-2">
          <Skeleton className="w-full h-4 rounded" />
          <Skeleton className="w-full h-4 rounded" />
          <Skeleton className="w-11/12 h-4 rounded" />
          <Skeleton className="w-4/5 h-4 rounded" />
        </div>
      </div>

    </div>
  );
}