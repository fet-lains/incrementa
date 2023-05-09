<script setup lang="ts">
  import { ref } from 'vue';
  import BaseInput from '@/components/base/BaseInput.vue';

  const emit = defineEmits<{ (event: 'add-task', value: string): void }>();

  const addTaskValue = ref('');
  const addTask = () => {
    emit('add-task', addTaskValue.value);

    addTaskValue.value = '';
  };
</script>

<template>
  <div class="add-task">
    <div class="add-task__input">
      <BaseInput
        v-model="addTaskValue"
        @keyup.enter="addTask"
        :placeholder="'Type a new todo'" />
    </div>

    <button type="button" class="add-task__button" @click.prevent="addTask">
      + Add
    </button>
  </div>
</template>

<style lang="less" scoped>
  .add-task {
    display: flex;
    align-items: center;

    &__input {
      flex: 1;
      padding: 16px;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      border: 1px solid @border;
      transition: border-color @anim-slow;
    }

    &__button {
      font-size: 1rem;
      font-weight: 500;
      color: @text-primary;
      background-color: @theme-color;
      padding: 18px 24px;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      transition: background-color @anim-slow;
    }
  }

  @media @hover {
    .add-task__input:hover {
      border-color: @theme-color;
    }

    .add-task__button:hover {
      background-color: @theme-color-hover;
    }
  }

  @media @small-min {
    .add-task {
      &__button {
        font-size: 1.2rem;
      }
    }
  }
</style>
