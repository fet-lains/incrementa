<template>
  <section class="hero">
    <h1 class="hero__title">Keepcode TODOs</h1>

    <h2 class="hero__subtitle">
      A todo app by

      <a href="https://github.com/sharaputo" class="hero__link" target="_blank">
        Sharaputo
      </a>
    </h2>
  </section>
</template>

<style lang="less" scoped>
  .hero {
    padding: 0 0 30px;
    &__title {
      font-size: 2rem;
      font-weight: 500;
      color: @text-primary;
    }

    &__subtitle {
      font-size: 0.9rem;
      font-weight: 400;
      color: @text-secondary;
      margin: 20px 0 0;
    }

    &__link {
      color: @theme-color;
      transition: color @anim-slow;

      @media @hover {
        &:hover {
          color: @theme-color-hover;
        }
      }
    }
  }

  @media @small-min {
    .hero {
      &__title {
        font-size: 3rem;
      }

      &__subtitle {
        font-size: 1rem;
        margin-top: 30px;
      }
    }
  }
</style>
