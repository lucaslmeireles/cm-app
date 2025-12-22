import { Card, CardHeader, CardTitle, CardContent } from "@/repo/ui/components/ui/card";

export default function ErrorMessage({ message } : {message: string} ) {
    return (
      <div className="container mx-auto py-6">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{message}</p>
          </CardContent>
        </Card>
      </div>
    )
}