export enum IStorageUserKeys {
  taskList = 'taskList',
}

export interface ITaskItem {
  id: string;
  complete: boolean;
  edit: boolean;
  label: string;
}

class TaskStorage {
  getTaskList(): ITaskItem[] {
    return JSON.parse(localStorage.getItem(IStorageUserKeys.taskList) ?? '[]');
  }
  setTaskList(taskList: ITaskItem[]) {
    localStorage.setItem(IStorageUserKeys.taskList, JSON.stringify(taskList));
  }
}

export const taskStorage = new TaskStorage();
