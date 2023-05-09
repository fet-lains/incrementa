<script lang="ts" setup>
  import TabNavItem from '@/components/tabs/TabNavItem.vue';

  interface ITasksItem {
    name: string;
    length: number;
  }
  interface Props {
    currentView: string;
    tasksList: ITasksItem[];
  }

  withDefaults(defineProps<Props>(), {
    currentView: 'All',
  });
  defineEmits<{
    (event: 'update-view', tabName: string): void;
  }>();
</script>

<template>
  <nav>
    <ul class="tab-nav-wrapper">
      <TabNavItem
        v-for="(taskList, i) in tasksList"
        :key="`${i}-${taskList.name}`"
        :listLength="taskList.length"
        :listName="taskList.name"
        :isActive="currentView === taskList.name"
        @tab-click="$emit('update-view', taskList.name)" />
    </ul>
  </nav>
</template>

<style scoped>
  .tab-nav-wrapper {
    display: flex;
    column-gap: 30px;
  }
</style>
