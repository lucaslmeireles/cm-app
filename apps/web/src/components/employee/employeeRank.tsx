import { fetchRank } from "@/fetch/org/fetchRank";
import { calculateColor } from "@/helpers/calculateColor";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/repo/ui/components/ui/card";
import { Employee } from "@/types/employee.type";
import { getTranslations } from "next-intl/server";

export const EmployeeRank = async () => {
  const t = await getTranslations("Dashboard.rank")
  const rank: Employee[] = await fetchRank();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
        <CardContent className="px-3">
          <div className="mt-3 flex flex-col">
            {/* #TODO TYPE */}
            {rank.length > 0 &&
              rank.map((employee) => {
                const color = calculateColor(employee.score);
                return (
                  <div
                    key={employee.id}
                    className="mt-2 shadow-slate-200 shadow"
                  >
                    <div className="flex flex-row items-center">
                      <p className="font-bold text-2xl mx-2">
                        {rank.indexOf(employee) + 1}
                      </p>
                      <h3 className="font-medium mr-3">{employee.name}</h3>
                      <p
                        style={{
                          color: color,
                        }}
                      >
                        {employee.score}
                      </p>
                      <p>/100</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
