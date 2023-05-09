<script setup lang="ts">
  import { ref } from 'vue';

  import IconCheckCircle from '@/components/icons/IconCheckCircle.vue';
  import IconCircle from '@/components/icons/IconCircle.vue';
  import IconDelete from '@/components/icons/IconDelete.vue';
  import IconEdit from '@/components/icons/IconEdit.vue';
  import IconSave from '@/components/icons/IconSave.vue';
  import BaseInput from '@/components/base/BaseInput.vue';

  import { ITaskItem } from '@/storage/taskStorage';
  import store from '@/stores/taskStore';

  interface Props {
    taskItem: ITaskItem;
  }
  const props = defineProps<Props>();

  const taskStore = store();
  const editTaskValue = ref(props.taskItem.label);
</script>

<template>
  <li class="task-item">
    <label :for="taskItem.id" class="task-item__checkbox-wrapper">
      <IconCheckCircle class="task-item__check" v-show="taskItem.complete" />
      <IconCircle class="task-item__circle" v-show="!taskItem.complete" />

      <input
        type="checkbox"
        :id="taskItem.id"
        :checked="taskItem.complete"
        @input="taskStore.toggleComplete(taskItem.id)"
        class="task-item__checkbox" />
    </label>

    <BaseInput
      v-if="taskItem.edit"
      v-model="editTaskValue"
      :placeholder="'Edit the task'"
      :isFocused="true"
      @keyup.enter="taskStore.editTask(taskItem.id, editTaskValue)"
      @blur="taskStore.editTask(taskItem.id, editTaskValue)" />

    <div class="task-item__text-wrapper" v-else>
      <p
        class="task-item__text"
        :class="taskItem.complete ? 'is-complete' : ''">
        {{ taskItem.label }}
      </p>
    </div>

    <div class="task-item__cta">
      <button
        v-show="!taskItem.complete && !taskItem.edit"
        type="button"
        class="task-item__cta-button"
        @click.prevent="taskStore.toggleEdit(taskItem.id)">
        <IconEdit class="task-item__cta-icon" />
        <span class="sr-only">Edit</span>
      </button>
      <button
        v-show="taskItem.edit"
        type="button"
        class="task-item__cta-button"
        @click.prevent="taskStore.editTask(taskItem.id, editTaskValue)">
        <IconSave class="task-item__cta-icon" />
        <span class="sr-only">Save</span>
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
    height: 60px;
    display: grid;
    grid-template-columns: 25px 1fr 54px;
    align-items: center;
    gap: 12px;
    padding: 0 20px;
    border-radius: 8px;
    border: 1px solid @border;
    transition: border-color @anim-slow;

    &__checkbox-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    &__check,
    &__circle {
      width: 100%;
    }

    &__check {
      fill: @theme-color;
    }

    &__circle {
      fill: @background;
      stroke: @theme-color;
    }

    &__checkbox {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
    }

    &__text-wrapper {
      overflow: hidden;
    }

    &__text {
      font-size: 1rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      white-space: pre-wrap;
      cursor: default;
    }

    &__text.is-complete {
      text-decoration: line-through;
      color: @text-dark;
    }

    &__cta {
      display: flex;
      justify-content: flex-end;
      column-gap: 16px;
    }

    &__cta-button {
      flex: 0 0 20px;
      opacity: 0;
      transition: opacity @anim-fast;
    }

    &__cta-icon {
      width: 100%;
      fill: @text-primary;
      transition: fill @anim-fast;
    }
  }

  @media @hover {
    .task-item:hover {
      border-color: @theme-color;

      .task-item__cta-button {
        opacity: 1;
      }
    }

    .task-item__cta-button:hover .task-item__cta-icon {
      fill: @theme-color;
    }
  }

  @media @medium-max {
    .task-item {
      &__cta-button {
        opacity: 1;
      }
    }
  }

  @media @small-min {
    .task-item {
      &__text {
        font-size: 1.2rem;
      }
    }
  }
</style>
