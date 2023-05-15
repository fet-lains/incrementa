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
        :placeholder="$t('forms.task_placeholder')" />

      <button type="button" class="add-task__clear" @click.prevent="clearInput">
        <IconClear class="add-task__clear-icon" v-show="addTaskValue" />
      </button>
    </div>

    <button type="button" class="add-task__button" @click.prevent="addTask">
      + {{ $t('forms.add_task_button') }}
    </button>
  </div>
</template>

<style lang="less" scoped>
  .add-task {
    left: 0;
    right: 0;
    display: grid;
    grid-template-columns: 1fr 100px;
    align-items: stretch;
    background-color: @background;
    padding: 15px 0;
    z-index: 10;

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

  @media @medium-min {
    .add-task {
      position: sticky;
      top: 0;
      margin-top: 25px;

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        height: 2px;
        background-color: @background;
      }
    }
  }
  @media @medium-max {
    .add-task {
      position: fixed;
      bottom: 0;
      padding: 15px 15px 30px;
    }
  }
</style>
