import { Skeleton } from "@/repo/ui/components/ui/skeleton"
import { Card, CardHeader, CardTitle, CardContent } from "@/repo/ui/components/ui/card"
import { Button } from "@/repo/ui/components/ui/button"
import { SquareArrowOutUpRight } from "lucide-react"

export default function EmployeeProfileLoading() {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="flex flex-row justify-between">
          <div className="flex flex-row gap-2 place-items-center">
            <Skeleton className="w-[90px] h-[90px] rounded-full" />
            <div className="flex flex-col">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-24 mt-2" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
          <div>
            <Button variant="ringHover" className="gap-2" disabled>
              Ver faltas <SquareArrowOutUpRight/>
            </Button>
          </div>
        </CardTitle>
        <CardContent className="p-2">
          <Skeleton className="h-12 w-32" />
        </CardContent>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 space-x-2">
        <div className="flex w-full justify-between space-x-4">
          <div className="gap-3 flex flex-col w-3/5">
            {/* Placeholder cards for FormationCard, AssessmentsCard, MyManagerCard, and AbsenceCard */}
            {[...Array(4)].map((_, index) => (
              <Card key={index}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="w-2/5 h-3/5 gap-4 flex flex-col items-center">
            <Card className="w-4/5">
              <CardHeader className="flex flex-col gap-3">
                <Skeleton className="h-6 w-3/4" />
                {[...Array(5)].map((_, index) => (
                  <Skeleton key={index} className="h-4 w-full" />
                ))}
              </CardHeader>
            </Card>
            
            <Card className="w-4/5">
              <CardContent className="p-6">
                <Skeleton className="h-[200px] w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}