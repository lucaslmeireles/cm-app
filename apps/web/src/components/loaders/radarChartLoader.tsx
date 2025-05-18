import { Skeleton } from "@/repo/ui/components/ui/skeleton"
import { Card, CardHeader, CardTitle, CardContent } from "@/repo/ui/components/ui/card"


export default function RadarChartLoader() {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">
            <Skeleton className="h-6 w-40 mx-auto" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mx-auto aspect-square max-h-[700px] min-h-[500px] w-full relative">
            <Skeleton className="absolute inset-0 rounded-full" />
            {[...Array(6)].map((_, index) => (
              <Skeleton
                key={index}
                className="absolute h-1 w-1/2 left-1/2 top-1/2 origin-left"
                style={{
                  transform: `rotate(${index * 60}deg)`,
                }}
              />
            ))}
            {[...Array(6)].map((_, index) => (
              <Skeleton
                key={index}
                className="absolute h-3 w-3 rounded-full"
                style={{
                  top: `${50 + 40 * Math.sin(index * Math.PI / 3)}%`,
                  left: `${50 + 40 * Math.cos(index * Math.PI / 3)}%`,
                }}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }