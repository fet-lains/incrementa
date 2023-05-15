<script setup lang="ts">
  import IconLogo from '@/components/icons/IconLogo.vue';
  import user_store from '@/stores/userStore';

  const userStore = user_store();
</script>

<template>
  <header class="header">
    <div class="header__logo">
      <IconLogo />
    </div>

    <button
      type="button"
      class="header__language"
      @click.prevent="userStore.setLocale">
      {{ userStore.locale }}
    </button>
  </header>
</template>

<style lang="less" scoped>
  .header {
    max-width: 630px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    border-bottom: 1px solid @dove-gray;
    margin: 0 auto;

    &__logo {
      flex: 0 0 50px;
    }

    &__language {
      font-size: 1.2rem;
      font-weight: 500;
      text-transform: uppercase;
      color: @text-dark;
      transition: color @anim-slow;

      @media @hover {
        &:hover {
          color: @text-primary;
        }
      }
    }
  }
</style>
