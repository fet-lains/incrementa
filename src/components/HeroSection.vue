<template>
  <section class="hero">
    <h1 class="hero__title">Incrementa</h1>

    <h2 class="hero__subtitle">Your daily dose of progress</h2>

    <div class="hero__author">
      A planner app by
      <a href="https://github.com/sharaputo" class="hero__link" target="_blank">
        Fedor Sharaputo
      </a>
    </div>
  </section>
</template>

<style lang="less" scoped>
  .hero {
    &__title {
      font-size: 2rem;
      font-weight: 500;
      color: @text-primary;
    }

    &__subtitle {
      font-size: 0.9rem;
      font-weight: 400;
      color: @text-secondary;
      margin-top: 20px;
    }

    &__author {
      font-size: 0.9rem;
      color: @text-secondary;
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
        font-size: 1.2rem;
        margin-top: 30px;
      }

      &__author {
        font-size: 1.2rem;
      }
    }
  }
</style>
