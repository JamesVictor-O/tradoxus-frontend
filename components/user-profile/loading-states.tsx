import { Skeleton } from "@/components/ui/skeleton"

export function ProfileSidebarSkeleton() {
  return (
    <div className="bg-[#2A2F38] rounded-lg p-6 flex flex-col items-center">
      <div className="space-y-2 mb-6 text-center w-full">
        <Skeleton className="h-6 w-32 mx-auto" />
        <Skeleton className="h-4 w-48 mx-auto" />
      </div>

      <Skeleton className="w-24 h-24 rounded-full mb-4" />
      <Skeleton className="h-5 w-32 mb-1" />
      <Skeleton className="h-4 w-24 mb-2" />

      <div className="flex gap-2 mt-2">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-28 rounded-full" />
      </div>

      <div className="w-full my-6">
        <div className="flex justify-between mb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-10" />
        </div>
        <Skeleton className="h-2 w-full" />
      </div>

      <div className="grid grid-cols-2 w-full gap-4 mb-6">
        <Skeleton className="h-24 rounded-lg" />
        <Skeleton className="h-24 rounded-lg" />
      </div>

      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  )
}

export function LearningPathSkeleton() {
  return (
    <div className="bg-[#2A2F38] rounded-lg p-6">
      <div className="mb-6">
        <Skeleton className="h-6 w-48 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-28" />
        </div>
        <Skeleton className="h-2 w-full" />
      </div>

      <div className="space-y-4 mb-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 w-full rounded-lg" />
        ))}
      </div>

      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  )
}

export function StudyTimeSkeleton() {
  return (
    <div className="bg-[#2A2F38] rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-6 w-32" />
      </div>

      <div className="mb-4">
        <Skeleton className="h-8 w-32 mb-1" />
        <Skeleton className="h-4 w-40" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16 ml-auto" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-10 ml-auto" />
      </div>
    </div>
  )
}

export function CertificationsSkeleton() {
  return (
    <div className="bg-[#2A2F38] rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-6 w-32" />
      </div>

      <div className="space-y-4 mb-4">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div>
              <Skeleton className="h-4 w-32 mb-1" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>

      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  )
}

