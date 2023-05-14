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
  <nav class="tab-nav">
    <ul class="tab-nav__list">
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

<style lang="less" scoped>
  .tab-nav {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    background-color: @background;
    padding: 15px 0;
    z-index: 10;

    &__list {
      display: flex;
      align-items: center;
      column-gap: 30px;
    }
  }

  @media @medium-min {
    .tab-nav {
      top: 90px;
    }
  }
</style>
