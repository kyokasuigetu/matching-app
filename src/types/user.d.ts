export interface User {
  id: string;
  name: string | null;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}
