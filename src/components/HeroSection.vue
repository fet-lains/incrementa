<template>
  <section class="hero">
    <h1 class="hero__title">Incrementa</h1>

    <h2 class="hero__subtitle">
      Your daily dose of progress
      <br />
      <hr />

      A planner app by
      <a href="https://github.com/sharaputo" class="hero__link" target="_blank">
        Fedor Sharaputo
      </a>
    </h2>
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

    &__link {
      color: @theme-color;
      transition: color @anim-slow;

      @media @hover {
        &:hover {
          color: @theme-color-hover;
        }
      }
    }

    hr {
      display: block;
      height: 1px;
      width: 216px;
      background: @text-secondary;
      margin: 5px 0;
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
    }
  }
</style>
