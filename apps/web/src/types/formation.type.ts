export enum CourseType {
  Bachelor = "Bachelor",
  Master = "Master",
  MBA = "MBA",
  Doctorate = "Doctorate",
  Technical = "Technical",
  Specialization = "Specialization",
  Postgraduate = "Postgraduate",
  Extension = "Extension",
  Training = "Training",
  Other = "Others",
}

export type FormationType = {
  id?: string;
  name: string;
  employee_id: string;
  type: CourseType;
};
