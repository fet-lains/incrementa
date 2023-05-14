<script setup lang="ts">
  defineEmits<{ (event: 'toggle-tasks'): void }>();
</script>

<template>
  <button
    type="button"
    class="tasks-toggler"
    @click.prevent="$emit('toggle-tasks')">
    <slot />
  </button>
</template>

<style lang="less" scoped>
  .tasks-toggler {
    display: inline-block;
    font-size: 0.9rem;
    font-weight: 500;
    text-align: right;
    color: @theme-color;
    transition: color @anim-slow;

    @media @hover {
      &:hover {
        color: @theme-color-hover;
      }
    }
  }

  @media @medium-min {
    .tasks-toggler {
      font-size: 1rem;
    }
  }
</style>
