type AbsenceStatsProps = {
  absences: {
    data: {
      count: number;
      justifi: {
        _count: number;
      };
      no_justifi: {
        _count: number;
      };
    };
  };
};

export const AbsenceStats = ({ absences }: AbsenceStatsProps) => {
  return (
    <>
      <p className="text-lg">Quantidade de faltas</p>
      <div className="flex flex-row space-x-6 align-bottom w-4/5 pb-4">
        <p className="text-2xl">{absences.data.count}</p>
        <p>
          {absences.data.justifi._count} <small>Justificadas</small>
        </p>
        <p>
          {absences.data.no_justifi._count} <small>Não justificadas</small>
        </p>
      </div>
    </>
  );
};
