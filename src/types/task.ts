export interface TaskItem {
  id: number;
  title: string;
  description: string;
  state: string;
  createdAt?: Date;
}