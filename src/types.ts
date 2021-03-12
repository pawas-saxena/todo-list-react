export type TaskType = {
  id: string;
  title: string;
  isCompleted: boolean;
  completedDate?: number; // unix timestamps
};
