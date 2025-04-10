<!-- TitleSection.vue -->
<template>
  <div class="relative tite-image w-[530px]">
    <img
      class="w-full h-full"
      src="@/assets/images/indexPage1/main-title-img.png"
      alt="main-title-img"
    />
    <div
      class="absolute top-4/10 right-10 w-16 h-16 hover:cursor-pointer play_btn"
      @mouseenter="gsapOpacity($event.target as HTMLElement, 0.7)"
      @mouseleave="gsapOpacity($event.target as HTMLElement, 1)"
      @click="$emit('play')"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { gsap } from 'gsap'

const gsapOpacity = (dom: HTMLElement, opacityNub: number) => {
  gsap.to(dom, { ease: 'power1.in', duration: 0.3, opacity: opacityNub })
}
</script>

<style scoped lang="scss">
.play_btn {
  background-image: url('@/assets/images/indexPage1/btn-play.png');
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
