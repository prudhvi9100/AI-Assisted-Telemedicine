import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <Skeleton className="h-10 w-full max-w-md" />
        <div className="flex gap-2 w-full sm:w-auto">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <Card className="border-border">
        <CardContent className="p-0">
          <div className="space-y-0">
            <div className="h-12 border-b flex items-center px-4 gap-4">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/6" />
              <Skeleton className="h-4 w-1/6" />
              <Skeleton className="h-4 w-1/6" />
            </div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 border-b flex items-center px-4 gap-4">
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-5 w-1/6" />
                <Skeleton className="h-5 w-1/6" />
                <Skeleton className="h-4 w-1/6" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
