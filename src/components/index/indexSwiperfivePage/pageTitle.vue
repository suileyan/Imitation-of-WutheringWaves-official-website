<template>
  <div class="absolute top-20 left-1/2 translate-x-[-50%] z-2 w-4/9" ref="titleRef">
    <img src="@/assets/images/indexPage5/page-title.png" alt="" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { gsap } from 'gsap'

const titleRef = ref(null)

const star = () => {
  gsap.fromTo(
    titleRef.value,
    { opacity: 0, translateY: '-60%' },
    { delay: 0.5, opacity: 1, translateY: '0%', duration: 0.5, ease: 'power2.inOut' },
  )
}

defineExpose({ star })
</script>

<style lang="scss" scoped></style>
