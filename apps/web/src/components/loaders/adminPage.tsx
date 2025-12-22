import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/repo/ui/components/ui/card";
import { BarChart, Briefcase, Building2, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/repo/ui/components/ui/tabs";
import { Skeleton } from "@/repo/ui/components/ui/skeleton";

export function AdminPageLoader() {
    return (
        <main className="container mx-auto px-4 py-8">
    <Card className="border-none shadow-none">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-9 w-64 mb-2" />
            <Skeleton className="h-6 w-96" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Skeleton className="h-5 w-24" />
                    {index === 0 && <Briefcase className="h-4 w-4 text-muted-foreground" />}
                    {index === 1 && <Users className="h-4 w-4 text-muted-foreground" />}
                    {index === 2 && <BarChart className="h-4 w-4 text-muted-foreground" />}
                    {index === 3 && <Building2 className="h-4 w-4 text-muted-foreground" />}
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-16 mb-1" />
                    <Skeleton className="h-4 w-32" />
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[...Array(3)].map((_, index) => (
                    <Skeleton key={index} className="h-4 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="departments">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48 mb-2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[...Array(5)].map((_, index) => (
                    <Skeleton key={index} className="h-4 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="metrics">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48 mb-2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[...Array(5)].map((_, index) => (
                    <Skeleton key={index} className="h-4 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  </main>
    )
}