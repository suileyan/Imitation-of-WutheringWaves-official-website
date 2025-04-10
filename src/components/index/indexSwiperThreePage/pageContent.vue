<template>
  <div class="flex justify-center items-center mt-30 w-8/12" ref="avatarContainer">
    <div class="avatar-container" @mouseenter="currentHover = 1" @mouseleave="currentHover = 0">
      <img :src="currentHover === 1 ? avatar1_hover : avatar1" alt="" />
    </div>
    <div class="avatar-container" @mouseenter="currentHover = 2" @mouseleave="currentHover = 0">
      <img :src="currentHover === 2 ? avatar2_hover : avatar2" alt="" />
    </div>
    <div class="avatar-container" @mouseenter="currentHover = 3" @mouseleave="currentHover = 0">
      <img :src="currentHover === 3 ? avatar3_hover : avatar3" alt="" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { gsap } from 'gsap'

const currentHover = ref(0)
const avatarContainer = ref(null)

const avatar1 = new URL('@/assets/images/indexPage3/avatar-1.png', import.meta.url).href
const avatar2 = new URL('@/assets/images/indexPage3/avatar-2.png', import.meta.url).href
const avatar3 = new URL('@/assets/images/indexPage3/avatar-3.png', import.meta.url).href
const avatar1_hover = new URL('@/assets/images/indexPage3/avatar-1-active.png', import.meta.url)
  .href
const avatar2_hover = new URL('@/assets/images/indexPage3/avatar-2-active.png', import.meta.url)
  .href
const avatar3_hover = new URL('@/assets/images/indexPage3/avatar-3-active.png', import.meta.url)
  .href

const star = () => {
  gsap.fromTo(
    avatarContainer.value,
    {
      opacity: 0,
      translateY: '10%',
      duration: 0.5,
    },
    {
      delay: 0.5,
      opacity: 1,
      translateY: '0%',
      duration: 0.8,
    },
  )
}

defineExpose({ star })
</script>

<style lang="scss" scoped>
.avatar-container {
  cursor: pointer;
  transition: all 0.3s ease;

  img {
    width: 100%;
    height: auto;
  }
}
</style>
