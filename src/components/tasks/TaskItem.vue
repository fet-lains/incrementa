<script setup lang="ts">
  import IconCheckCircle from '@/components/icons/IconCheckCircle.vue';
  import IconCircle from '@/components/icons/IconCircle.vue';
  import IconDelete from '@/components/icons/IconDelete.vue';
  import IconEdit from '@/components/icons/IconEdit.vue';
  import EditInput from '@/components/tasks/EditInput.vue';

  import { ITaskItem } from '@/storage/taskStorage';
  import store from '@/stores/taskStore';

  interface Props {
    tasksInView: ITaskItem[];
  }
  defineProps<Props>();

  const taskStore = store();
</script>

<template>
  <li v-for="taskItem in tasksInView" :key="taskItem.id" class="task-item">
    <label :for="taskItem.id" class="task-item__checkbox-wrapper">
      <IconCheckCircle v-show="taskItem.complete" />
      <IconCircle v-show="!taskItem.complete" />

      <input
        type="checkbox"
        :id="taskItem.id"
        :checked="taskItem.complete"
        @input="taskStore.toggleComplete(taskItem.id)"
        class="task-item__checkbox" />
    </label>

    <EditInput
      v-if="taskItem.edit"
      :value="taskItem.label"
      @input="taskStore.editTask(taskItem.id, $event.target.value)"
      @keyup.enter="taskStore.toggleEdit(taskItem.id)" />

    <p
      v-else
      class="task-item__text"
      :class="taskItem.complete ? 'is-complete' : ''">
      {{ taskItem.label }}
    </p>

    <div class="task-item__cta">
      <button
        v-show="!taskItem.complete"
        type="button"
        class="task-item__cta-button"
        @click.prevent="taskStore.toggleEdit(taskItem.id)">
        <IconEdit class="task-item__cta-icon" />
        <span class="sr-only">Edit</span>
      </button>
      <button
        type="button"
        class="task-item__cta-button"
        @click.prevent="taskStore.deleteTask(taskItem.id)">
        <IconDelete class="task-item__cta-icon" />
        <span class="sr-only">Delete</span>
      </button>
    </div>
  </li>
</template>

<style lang="less" scoped>
  .task-item {
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid @wild-sand;
    box-shadow: 2px 2px 8px 0 @alto;
    transition: border-color @anim-slow;

    &__checkbox-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    &__checkbox {
      position: absolute;
      left: -3px;
      bottom: 2px;
      opacity: 0;
    }

    &__text {
      flex: 1;
      font-size: 20px;
      font-weight: 700;
      border: 0;
      margin-left: 12px;
    }

    &__text.is-complete {
      text-decoration: line-through;
      color: @dove-gray;
    }

    &__cta {
      display: flex;
      column-gap: 16px;
    }

    &__cta-button {
      opacity: 0;
      transition: opacity @anim-fast;
    }

    &__cta-icon {
      fill: @mine-shaft;
      transition: fill @anim-fast;
    }
  }

  @media @hover {
    .task-item:hover {
      border-color: @blue;

      .task-item__cta-button {
        opacity: 1;
      }
    }

    .task-item__cta-button:hover .task-item__cta-icon {
      fill: @blue;
    }
  }
</style>
