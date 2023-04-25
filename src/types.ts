export type GroupTask = {
  name: string;
  tasks: Task[];
};
export type Task = {
  checked: boolean;
  description: string;
  value: number;
};
export type ErrorType = {
  errorMsg: string;
};
