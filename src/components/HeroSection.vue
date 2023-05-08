<template>
  <section class="hero">
    <h1 class="hero__title">Keepcode TODOs</h1>

    <h2 class="hero__subtitle">
      A todo app by

      <a href="https://github.com/sharaputo" target="_blank">Sharaputo</a>
    </h2>
  </section>
</template>

<style lang="less" scoped>
  .hero {
    padding: 0 0 30px;
    &__title {
      font-size: 44px;
      letter-spacing: 1.84px;
      color: @mine-shaft;
    }

    &__subtitle {
      font-size: 1rem;
      color: @dove-gray;
      letter-spacing: 0.67px;
      margin: 30px 0 0;
    }
  }
</style>
