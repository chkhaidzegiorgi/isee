export interface Patient {
  id?: number;
  firstname: string;
  lastname: string;
  id_number: string;
  birthday: Date;
  address: string;
  disease: string;
  branch: string;
  created_at: Date;
  updated_at: Date;
  updated_by: string;
}
