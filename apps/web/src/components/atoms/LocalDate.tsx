import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const LocalDate = ({ children }: { children: string }) => {
  return (
    <p>
      {format(children, "PPP", {
        locale: ptBR,
      })}
    </p>
  );
};
