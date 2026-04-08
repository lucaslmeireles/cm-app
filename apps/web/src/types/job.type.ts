import { Metric } from "./metric.type";

export type Job = {
  id: string;
  name: string;
  type: "BlueColor" | "WhiteColor";
  tenant_id: number;
  department: [
    {
      id: string;
      name: string;
      tenant_id: number;
    },
  ];
  employees: [
    {
      name: string;
      my_manager?: {
        manager: {
          employee: {
            name: string;
          };
        };
      };
      profile_pic: string;
    },
  ];
  metrics: Metric[];
  org: {
    name: string;
  };
  _count?: number;
};
