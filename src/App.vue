<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';

  import HeroSection from '@/components/HeroSection.vue';
  import TabNav from '@/components/tabs/TabNav.vue';
  import TaskItem from '@/components/tasks/TaskItem.vue';

  import store from '@/stores/taskStore';

  const currentView = ref('All');
  const newTaskInput = ref('');
  const taskStore = store();

  const tasksInView = computed(() => {
    switch (currentView.value) {
      case 'Current':
        return taskStore.taskList.filter((item) => !item.complete);

      case 'Completed':
        return taskStore.taskList.filter((item) => item.complete);

      default:
        return taskStore.taskList;
    }
  });

  const setView = (viewLabel: string) => {
    currentView.value = viewLabel;
  };

  const addTask = () => {
    taskStore.addTask(newTaskInput.value);

    newTaskInput.value = '';
  };

  const setWindowHeight = (): void => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  onMounted(() => {
    setWindowHeight();
    taskStore.getTasks();
  });
</script>

<template>
  <main class="main-wrapper">
    <HeroSection />

    <div class="new-task">
      <input
        type="text"
        placeholder="Type a new todo"
        class="new-task__input"
        v-model="newTaskInput"
        @keyup.enter="addTask" />
      <button type="button" class="new-task__button" @click.prevent="addTask">
        + Add
      </button>
    </div>

    <TabNav
      :currentView="currentView"
      :tasksList="taskStore.taskListOverview"
      @update-view="setView" />

    <ul class="task-list">
      <TaskItem :tasksInView="tasksInView" />
    </ul>
  </main>
</template>

<style lang="less" scoped>
  html {
    background-color: @alabaster;
  }

  body {
    min-width: 320px;
    height: calc(var(--vh, 1vh) * 100);
    font-family: @font-primary;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    overflow-wrap: break-word;
    color: @black;
    background-color: @alabaster;
    overflow: hidden;
  }

  .main-wrapper {
    max-width: 630px;
    padding: 100px 15px 100px;
    margin: 0 auto;
  }

  .new-task {
    display: flex;

    &__input {
      flex: 1;
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: 1px;
      color: @mine-shaft;
      padding: 16px;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      border: 1px solid @wild-sand;
      box-shadow: 1px 1px 4px 0 @silver;
      transition: border-color @anim-slow;

      &::placeholder {
        color: @dusty-gray;
      }
    }

    &__button {
      font-size: 1rem;
      font-weight: 900;
      color: @white;
      background-color: @blue;
      padding: 18px 24px;
      border: 0;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      transition: background-color @anim-slow;
    }
  }

  .task-list {
    display: grid;
    gap: 16px;
    padding: 0;
  }

  @media @hover {
    .new-task__input:hover {
      border-color: @blue;
    }

    .new-task__button:hover {
      background-color: @dark-blue;
    }
  }
</style>
