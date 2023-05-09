<script setup lang="ts">
  import { ref } from 'vue';
  import BaseInput from '@/components/base/BaseInput.vue';
  import IconClear from '@/components/icons/IconClear.vue';

  const emit = defineEmits<{ (event: 'add-task', value: string): void }>();

  const addTaskValue = ref('');
  const clearInput = () => {
    addTaskValue.value = '';
  };
  const addTask = () => {
    emit('add-task', addTaskValue.value);

    clearInput();
  };
</script>

<template>
  <div class="add-task">
    <div class="add-task__input">
      <BaseInput
        v-model="addTaskValue"
        @keyup.enter="addTask"
        :placeholder="'Type a new todo'" />

      <button type="button" class="add-task__clear" @click.prevent="clearInput">
        <IconClear class="add-task__clear-icon" v-show="addTaskValue" />
      </button>
    </div>

    <button type="button" class="add-task__button" @click.prevent="addTask">
      + Add
    </button>
  </div>
</template>

<style lang="less" scoped>
  .add-task {
    display: grid;
    grid-template-columns: 1fr 100px;
    align-items: stretch;

    &__input {
      display: grid;
      grid-template-columns: 1fr 30px;
      align-items: center;
      gap: 16px;
      flex: 1;
      padding: 0 20px;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      border: 1px solid @border;
      transition: border-color @anim-slow;

      &:focus-within {
        border-color: @theme-color;
      }
    }

    &__clear-icon {
      width: 100%;
      fill: @text-secondary;
      transition: fill @anim-slow;
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
    .add-task {
      &__input:hover {
        border-color: @theme-color;
      }
      &__clear:hover .add-task__clear-icon {
        fill: @theme-color;
      }
      &__button:hover {
        background-color: @theme-color-hover;
      }
    }
  }

  @media @small-min {
    .add-task {
      &__button {
        font-size: 1.2rem;
      }
    }
  }

  @media @medium-max {
    .add-task {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: @background;
      padding: 15px;
      z-index: 10;
    }
  }
</style>
