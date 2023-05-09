<script lang="ts" setup>
  import { computed } from 'vue';

  interface Props {
    isActive: boolean;
    listName: string;
    listLength: number;
  }

  const props = defineProps<Props>();
  defineEmits<{ (event: 'tab-click', tabName: string): void }>();

  const tabActiveClass = computed(() => {
    return props.isActive ? 'is-active' : '';
  });
</script>

<template>
  <li :class="['tab', tabActiveClass]">
    <button class="tab__button" @click.prevent="$emit('tab-click', listName)">
      {{ listName }} ({{ listLength }})
    </button>
  </li>
</template>

<style lang="less" scoped>
  .tab {
    padding-bottom: 2px;

    &__button {
      font-size: 0.9rem;
      font-weight: 500;
      color: @text-dark;
      transition: color @anim-slow;
    }

    &.is-active {
      border-bottom: 3px solid @theme-color;
    }

    &.is-active .tab__button {
      color: @text-primary;
    }
  }

  @media @hover {
    .tab:not(.is-active):hover .tab__button {
      color: @text-primary;
    }
  }

  @media @small-min {
    .tab {
      &__button {
        font-size: 1rem;
      }
    }
  }
</style>
