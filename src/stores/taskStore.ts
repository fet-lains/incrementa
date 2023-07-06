import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';
import { v4 as uuid } from 'uuid';

import { ITaskItem, taskStorage } from '@/storage/taskStorage';
import { capitalize, isDesktop, trimString } from '@/composables/helpers';

export default defineStore('tasks', () => {
  const isLoading = ref(false);

  const currentView = ref('All');
  const getActiveTab = () => {
    const activeTab = taskStorage.getActiveTab();

    if (!activeTab) return;

    currentView.value = activeTab;
  };
  const setActiveTab = (activeTab: string) => {
    currentView.value = activeTab;

    taskStorage.setActiveTab(activeTab);
  };

  const taskList = ref<ITaskItem[]>([]);
  const taskLists = reactive({
    all: computed(() => taskList.value),
    current: computed(() => taskList.value.filter((item) => !item.complete)),
    completed: computed(() => taskList.value.filter((item) => item.complete)),
  });
  const taskListOverview = reactive([
    {
      name: 'All',
      length: computed(() => taskLists.all.length),
    },
    {
      name: 'Current',
      length: computed(() => taskLists.current.length),
    },
    {
      name: 'Completed',
      length: computed(() => taskLists.completed.length),
    },
  ]);
  const areAllTasksComplete = computed(() => {
    return taskList.value.every((task) => task.complete);
  });

  const hasTasksLocal = () => {
    const tasks = taskStorage.getTaskList();

    if (!tasks.length) return false;

    return true;
  };
  const getTasks = async () => {
    isLoading.value = true;

    if (hasTasksLocal()) {
      taskList.value = taskStorage.getTaskList();
      return;
    }

    isLoading.value = false;
  };

  const newTask = ref('');
  const addTask = (value: string) => {
    newTask.value = trimString(value);

    if (!newTask) return;

    newTask.value = capitalize(newTask.value);

    const task: ITaskItem = {
      id: uuid(),
      complete: false,
      edit: false,
      label: newTask.value,
    };

    if (isDesktop()) {
      taskList.value.unshift(task);
    } else {
      taskList.value.push(task);
    }

    taskStorage.setTaskList(taskList.value);
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
    const task = trimString(value);

    if (!task) return;

    const taskIndex = getIndex(taskId);
    taskList.value[taskIndex].label = task;
    taskList.value[taskIndex].edit = false;

    taskStorage.setTaskList(taskList.value);
  };
  const toggleComplete = (taskId: string) => {
    const taskIndex = getIndex(taskId);
    taskList.value[taskIndex].complete = !taskList.value[taskIndex].complete;

    taskStorage.setTaskList(taskList.value);
  };
  const toggleAll = () => {
    if (areAllTasksComplete.value) {
      taskList.value.forEach((task) => (task.complete = false));
    } else {
      taskList.value.forEach((task) => (task.complete = true));
    }
  };

  return {
    isLoading,
    currentView,
    getActiveTab,
    setActiveTab,
    taskList,
    taskLists,
    taskListOverview,
    areAllTasksComplete,
    getTasks,
    addTask,
    deleteTask,
    toggleEdit,
    editTask,
    toggleComplete,
    toggleAll,
  };
});
