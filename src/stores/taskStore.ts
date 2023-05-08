import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';
import { v4 as uuid } from 'uuid';

import { ITaskItem, taskStorage } from '@/storage/taskStorage';
import { ITask, taskService } from '@/services/taskService';

export default defineStore('tasks', () => {
  const isLoading = ref(false);

  const taskList = ref<ITaskItem[]>([]);
  const taskLists = reactive({
    all: computed(() => taskList.value),
    current: computed(() => taskList.value.filter((item) => !item.complete)),
    completed: computed(() => taskList.value.filter((item) => item.complete)),
  });
  const taskListOverview = reactive([
    { name: 'All', length: computed(() => taskLists.all.length) },
    { name: 'Current', length: computed(() => taskLists.current.length) },
    {
      name: 'Completed',
      length: computed(() => taskLists.completed.length),
    },
  ]);

  const hasTaskLocal = () => {
    const tasks = taskStorage.getTaskList();

    if (!tasks.length) return false;

    return true;
  };
  const getTasks = async () => {
    if (hasTaskLocal()) {
      taskList.value = taskStorage.getTaskList();
      return;
    }

    isLoading.value = true;

    try {
      const response = await taskService.getTodos();

      if (!response.data) return;

      const data: ITask[] = response.data.splice(0, 10);

      taskList.value = data.map((item) => ({
        id: uuid(),
        complete: false,
        edit: false,
        label: item.title,
      }));

      taskStorage.setTaskList(taskList.value);
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  };
  const addTask = (value: string) => {
    taskList.value.push({
      id: uuid(),
      complete: false,
      edit: false,
      label: value,
    });
  };
  const getIndex = (taskId: string) => {
    return taskList.value.findIndex((task) => task.id === taskId);
  };
  const deleteTask = (taskId: string) => {
    const taskIndex = getIndex(taskId);
    taskList.value.splice(taskIndex, 1);
    taskStorage.setTaskList(taskList.value);
  };
  const toggleEdit = (taskId: string) => {
    const taskIndex = getIndex(taskId);
    taskList.value[taskIndex].edit = !taskList.value[taskIndex].edit;
  };
  const editTask = (taskId: string, value: string) => {
    const taskIndex = getIndex(taskId);
    taskList.value[taskIndex].label = value;
    taskStorage.setTaskList(taskList.value);
  };
  const toggleComplete = (taskId: string) => {
    const taskIndex = getIndex(taskId);
    taskList.value[taskIndex].complete = !taskList.value[taskIndex].complete;
    taskStorage.setTaskList(taskList.value);
  };

  return {
    isLoading,
    taskList,
    taskLists,
    taskListOverview,
    getTasks,
    addTask,
    deleteTask,
    toggleEdit,
    editTask,
    toggleComplete,
  };
});
