<script setup lang="ts">
  import { ref, onMounted } from 'vue';

  interface Props {
    isFocused?: boolean;
    modelValue: string;
    placeholder: string;
    type?: 'text' | 'tel' | 'email' | 'password';
  }

  const props = withDefaults(defineProps<Props>(), {
    isFocused: false,
    type: 'text',
  });

  defineEmits<{
    (
      e: 'update:modelValue',
      value: HTMLInputElement['value'],
    ): HTMLInputElement['value'];
  }>();

  const input = ref<HTMLInputElement | null>(null);

  onMounted(() => {
    if (props.isFocused) input.value?.focus();
  });
</script>

<template>
  <input
    ref="input"
    class="base-input"
    :type="props.type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    " />
</template>

<style lang="less" scoped>
  .base-input {
    width: 100%;
    font-size: 1.2rem;
    font-weight: 400;
    color: @text-primary;

    &::placeholder {
      color: @placeholder;
    }
  }
</style>
