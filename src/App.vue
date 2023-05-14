<script setup lang="ts">
  import { computed, onMounted, onUpdated } from 'vue';
  import { isDesktop } from '@/composables/isDesktop';

  import HeroSection from '@/components/HeroSection.vue';
  import AddTask from './components/tasks/AddTask.vue';
  import TabNav from '@/components/tabs/TabNav.vue';
  import TaskItem from '@/components/tasks/TaskItem.vue';
  import TasksToggler from '@/components/tasks/TasksToggler.vue';

  import store from '@/stores/taskStore';

  const taskStore = store();

  const tasksInView = computed(() => {
    switch (taskStore.currentView) {
      case 'Current':
        return taskStore.taskList.filter((item) => !item.complete);

      case 'Completed':
        return taskStore.taskList.filter((item) => item.complete);

      default:
        return taskStore.taskList;
    }
  });

  const checkButtonText = computed(() => {
    const areChecked = taskStore.areAllTasksComplete;

    return areChecked ? 'Uncheck all' : 'Check all';
  });

  const setWindowHeight = (): void => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  onMounted(() => {
    setWindowHeight();

    taskStore.getActiveTab();
    taskStore.getTasks();
  });

  onUpdated(() => {
    if (!isDesktop()) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  });
</script>

<template>
  <main class="main-wrapper">
    <HeroSection />

    <AddTask @add-task="taskStore.addTask" />

    <div class="tasks">
      <TabNav
        :currentView="taskStore.currentView"
        :tasksList="taskStore.taskListOverview"
        @update-view="taskStore.setActiveTab" />

      <ul class="task-list">
        <TransitionGroup name="appear">
          <TaskItem
            v-for="taskItem in tasksInView"
            :key="taskItem.id"
            :taskItem="taskItem" />
        </TransitionGroup>
      </ul>

      <p class="tasks__text" v-if="!taskStore.taskList.length">
        Add a new task to start planning!
      </p>

      <div class="tasks__toggler" v-if="tasksInView.length">
        <TasksToggler @toggle-tasks="taskStore.toggleAll">
          {{ checkButtonText }}
        </TasksToggler>
      </div>
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
    padding: 50px 15px 100px;
    margin: 0 auto;
  }

  .tasks {
    position: relative;
    margin-top: 10px;

    &__text {
      margin-top: 15px;
      font-size: 1.3rem;
      font-weight: 500;
      color: @text-secondary;
    }

    &__toggler {
      text-align: right;
      margin-top: 15px;
    }
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
    animation: appear @anim-slow reverse;
  }
  .appear-move {
    transition: transform @anim-slow;
  }
  @keyframes appear {
    0% {
      transform: translateY(-20px) rotateX(-180deg);
    }
    100% {
      transform: translateY(0) rotateX(0deg);
    }
  }

  @media @small-min {
    .main-wrapper {
      padding-top: 100px;
    }
  }
  @media @medium-min {
    .tasks {
      &__toggler {
        position: sticky;
        bottom: 0;
        right: 0;
        background-color: @background;
        padding: 15px 0;
        z-index: 10;
      }
    }
  }
</style>
