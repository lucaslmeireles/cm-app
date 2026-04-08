import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";

export const calculateTendency = (score: number) => {
  if (score > 80) {
    return (
      <div className="flex flex-row">
        <p>Grower</p>
        <ArrowUp size={14} />
      </div>
    );
  }
  if (score > 60) {
    return (
      <div className="flex flex-row">
        <p>Stay</p>
        <ArrowRight size={14} />
      </div>
    );
  } else {
    return (
      <div className="flex flex-row">
        <p>Resign</p>
        <ArrowDown size={14} />
      </div>
    );
  }
};
