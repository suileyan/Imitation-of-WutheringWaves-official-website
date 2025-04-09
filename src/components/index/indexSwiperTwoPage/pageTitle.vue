<template>
  <div class="absolute w-1/7 top-25 left-22 z-2" ref="titleRef">
    <img src="@/assets/images/indexPage2/page-title.png" alt="" />
  </div>
  <div class="absolute w-full top-37 left-22 flex z-2" ref="lineRef">
    <img class="h-7" src="@/assets/images/title-bg-1.png" alt="" />
    <img class="h-[2px] mt-1 ml-[-2rem]" src="@/assets/images/title-bg-2.png" alt="" />
  </div>
</template>

<script lang="ts" setup>
import { defineExpose, ref } from 'vue'
import { gsap } from 'gsap'

const titleRef = ref<HTMLElement>()
const lineRef = ref<HTMLElement>()
const star = () => {
  console.log('标题组件 star 方法被调用')
  if (titleRef.value) {
    gsap.fromTo(
      titleRef.value,
      { opacity: 0, translateX: '-100%' },
      {
        delay: 0.5,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
        translateX: '0%',
      },
    )
    if (lineRef.value) {
      gsap.fromTo(
        lineRef.value,
        { opacity: 0, translateX: '-100%' },
        { delay: 0.7, opacity: 1, translateX: '0%', duration: 0.5, ease: 'power2.inOut' },
      )
    }
  }
}

// 导出 star 方法
defineExpose({
  star,
})
</script>
