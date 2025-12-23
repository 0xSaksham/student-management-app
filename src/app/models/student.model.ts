export interface Student {
  id: number;
  name: string;
  major: string;
  gpa: number;
  status: 'Active' | 'Probation' | 'Graduated';
  attendance: number;
}
