export type Employee = {
  id: string;
  register?: string;
  identifiant?: string
  phone: string;
  phone2?: string;
  email?: string;
  address?: string;
  name: string;
  birthday: string | Date;
  entry_date: string | Date;
  job_id: string;
  score: number;
  profile_pic: string;
  tenant_id: number;
  created_At: string;
  updated_At: string;
  department?: [
    {
      name: string;
      id: string;
      tenant_id: number;
    },
  ];
  job?: {
    name: string;
    type: string;
  };
  courses?: [
    {
      name: string;
      level: number;
      department: {
        name: string;
      };
      due_date: string;
      employees: [
        {
          name: string;
          profle_pic: string;
        },
      ];
    },
  ];
  my_manager: [
    {
      manager: {
        employee: Employee;
      };
      manager_id: string;
    },
  ];
  assessments?: [
    {
      id: string;
      employee_id: string;
      manager_id: string;
      createdAt: string;
      lastUpdatedAt: string;
      employee: Employee;
      metrics: [
        {
          score: number;
          metric: {
            name: string;
            type: string;
            weight: number;
          };
        },
      ];
    },
    manager: {
      employee: Employee;
    },
  ],
  disc: {
    id: string,
    employee_id: string;
    D: string,
    I: string,
    S: string,
    C: string
  },
  manager?: {
      user_id: string
      employee_id: string
  }
};
