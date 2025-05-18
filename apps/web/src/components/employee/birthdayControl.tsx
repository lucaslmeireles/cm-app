import { Button } from "@/repo/ui/components/ui/button";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/repo/ui/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/repo/ui/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/repo/ui/components/ui/calendar";
import { cn } from "@/repo/ui/lib/utils";
import { useTranslations } from "next-intl";
export const BirthdayControl = ({field}) => {
  const t = useTranslations("Employee.Add");
    const [open, setOpen] = useState(false);
    return (
      <FormItem className="flex flex-col">
        <FormLabel>{t("birthday")}</FormLabel>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] pl-3 text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value ? (
                  format(field.value, "PPP", { locale: ptBR })
                ) : (
                  <span>{t("pick_date")}</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={(e) => {
                field.onChange(e);
                setOpen((prev) => !prev);
              }}
              disabled={(date) =>
                date > new Date() ||
                date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <FormDescription></FormDescription>
        <FormMessage />
      </FormItem>
    );
}