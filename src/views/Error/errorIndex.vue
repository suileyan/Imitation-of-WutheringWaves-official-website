<template>
  <div class="error-page">
    <h1>404</h1>
    <p>Oops! The page you're looking for doesn't exist.</p>
    <div class="animation">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
    </div>
    <a href="/" class="home-link">Go to Home</a>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
  text-align: center;
  color: #333;

  h1 {
    font-size: 10rem;
    margin: 0;
  }

  p {
    font-size: 1.5rem;
    margin: 0.5rem 0 2rem;
  }

  .animation {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;

    .circle {
      width: 1rem;
      height: 1rem;
      margin: 0 0.5rem;
      background-color: #333;
      border-radius: 50%;
      animation: bounce 1s infinite alternate;
    }

    .circle:nth-child(2) {
      animation-delay: 0.2s;
    }

    .circle:nth-child(3) {
      animation-delay: 0.4s;
    }
  }

  .home-link {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #333;
    color: #fff;
    text-decoration: none;
    border-radius: 0.25rem;
    transition: background-color 0.3s;

    &:hover {
      background-color: #555;
    }
  }
}

@keyframes bounce {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-1rem);
  }
}
</style>
