export enum ToDoStatus {
  Open = "open",
  Done = "done",
}

export interface ToDoItemType {
  id: string;
  text: string;
  status: ToDoStatus;
  createDate: Date;
  editDate: Date;
  category?: string;
  deadLine?: string;
}
