<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';

  import HeroSection from '@/components/HeroSection.vue';
  import AddTask from './components/tasks/AddTask.vue';
  import TabNav from '@/components/tabs/TabNav.vue';
  import TaskItem from '@/components/tasks/TaskItem.vue';

  import store from '@/stores/taskStore';

  const currentView = ref('All');
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

  const addTask = (value: string) => {
    taskStore.addTask(value);
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

    <AddTask @add-task="addTask" />

    <div class="tasks">
      <TabNav
        :currentView="currentView"
        :tasksList="taskStore.taskListOverview"
        @update-view="setView" />

      <ul class="task-list">
        <TransitionGroup name="appear">
          <TaskItem
            v-for="taskItem in tasksInView"
            :key="taskItem.id"
            :taskItem="taskItem" />
        </TransitionGroup>
      </ul>
    </div>
  </main>
</template>

<style lang="less">
  html {
    background-color: @background;
  }

  body {
    min-width: 320px;
    height: calc(var(--vh, 1vh) * 100);
    font-family: @font-primary;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.2;
    overflow-wrap: break-word;
    color: @text-primary;
    background-color: @background;
    overflow-x: hidden;
  }

  .main-wrapper {
    max-width: 630px;
    display: grid;
    gap: 30px;
    padding: 50px 15px 100px;
    margin: 0 auto;
  }

  .tasks {
    display: grid;
    gap: 20px;
  }

  .task-list {
    display: grid;
    gap: 16px;
    padding: 0;
  }

  .appear-enter-active {
    animation: appear @anim-slow;
  }
  .appear-leave-active {
    position: absolute;
    animation: appear @anim-slow reverse;
  }
  .appear-move {
    transition: transform @anim-slow;
  }
  @keyframes appear {
    0% {
      opacity: 0;
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media @small-min {
    .main-wrapper {
      gap: 40px;
      padding-top: 100px;
    }
  }
</style>
