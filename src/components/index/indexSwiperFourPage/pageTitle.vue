<template>
  <div class="absolute w-1/7 top-20 right-22 z-2" ref="titleRef">
    <img class="h-[50px]" src="@/assets/images/indexPage4/page-title.png" alt="" />
  </div>
  <div class="absolute w-full top-35 right-30 flex z-2" ref="lineRef">
    <img class="h-[2px] mt-1 mr-[-2rem]" src="@/assets/images/title-bg-3.png" alt="" />
    <img
      style="transform: rotateY(180deg)"
      class="h-7"
      src="@/assets/images/title-bg-1.png"
      alt=""
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineExpose } from 'vue'
import { gsap } from 'gsap'
const titleRef = ref()
const lineRef = ref()
const star = () => {
  gsap.fromTo(
    titleRef.value,
    { opacity: 0, translateY: -100 },
    { delay: 0.8, opacity: 1, translateY: 0, duration: 1 },
  )
  gsap.fromTo(
    lineRef.value,
    { opacity: 0, translateY: -100 },
    { delay: 0.5, opacity: 1, translateY: 0, duration: 1 },
  )
}
defineExpose({ star })
</script>
<style lang="scss" scoped></style>
