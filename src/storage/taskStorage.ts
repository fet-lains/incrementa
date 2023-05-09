export enum IStorageTasksKeys {
  activeTab = 'activeTab',
  taskList = 'taskList',
}

export interface ITaskItem {
  id: string;
  complete: boolean;
  edit: boolean;
  label: string;
}

class TaskStorage {
  getActiveTab(): string {
    return JSON.parse(
      localStorage.getItem(IStorageTasksKeys.activeTab) ?? 'All',
    );
  }
  setActiveTab(activeTab: string) {
    localStorage.setItem(
      IStorageTasksKeys.activeTab,
      JSON.stringify(activeTab),
    );
  }
  getTaskList(): ITaskItem[] {
    return JSON.parse(localStorage.getItem(IStorageTasksKeys.taskList) ?? '[]');
  }
  setTaskList(taskList: ITaskItem[]) {
    localStorage.setItem(IStorageTasksKeys.taskList, JSON.stringify(taskList));
  }
}

export const taskStorage = new TaskStorage();
