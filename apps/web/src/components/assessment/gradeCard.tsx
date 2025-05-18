import { Card, CardContent, CardDescription, CardHeader } from "@/repo/ui/components/ui/card"


type GradeCardProps = {
  grade: number
}

export default function GradeCard({ grade = 5 }: GradeCardProps) {
  const clampedGrade = Math.max(1, Math.min(5, grade))
  const percentage = ((clampedGrade - 1) / 4) * 100

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardDescription>
          Nosso sistema de notas vai de 1.0 (péssimo) até 5.0 (ótimo).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          1.0-2.9: Abaixo da média, 3.0-3.9: Média, 4.0-4.5: Bom, 4.6-5.0: Execelente
        </p>
        <div className="h-4 w-full rounded-full bg-secondary">
          <div className="h-full rounded-full bg-gradient-to-r from-red-500  via-yellow-500 to-green-500" style={{ width: `${percentage}%` }} />
        </div>
        <div className="mt-2 flex justify-between text-xs">
          <span>1.0</span>
          <span>2.0</span>
          <span>3.0</span>
          <span>4.0</span>
          <span>5.0</span>
        </div>
      </CardContent>
    </Card>
  )
}