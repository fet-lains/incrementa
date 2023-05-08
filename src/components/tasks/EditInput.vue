<script setup lang="ts">
  import { ref, onMounted } from 'vue';

  const editInput = ref<HTMLInputElement | null>(null);

  defineEmits<{ (event: 'toggle-edit'): void }>();

  onMounted(() => {
    editInput.value?.focus();
  });
</script>

<template>
  <input ref="editInput" class="input" type="text" />
</template>

<style scoped>
  .input {
    flex: 1;
    font-size: 20px;
    font-weight: 700;
    border: 0;
    margin-left: 12px;
  }
</style>
