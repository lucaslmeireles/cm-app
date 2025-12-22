export type Metric = {
  id?: string;
  name: string;
  type: "HardSkill" | "SoftSkill";
  weight: number;
  score?: number
};
