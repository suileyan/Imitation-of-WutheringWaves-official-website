<!-- TopBar.vue -->
<template>
  <div class="logo w-28.5 h-19 absolute top-11 left-23 z-10" ref="logoRef"></div>
  <div class="top-bar w-50 absolute top-11 right-16" ref="topBarRef">
    <a :href="counter.officialWebsite" target="_blank" class="w-full h-full block">
      <img
        src="@/assets/images/indexPage1/btn-enter.png"
        class="w-full h-full block"
        alt="进入官网"
      />
    </a>
  </div>
</template>
<script lang="ts" setup>
import { useCounterStore } from '@/stores/counter'
import { ref } from 'vue'
import { gsap } from 'gsap'

// 添加props声明
defineProps<{
  active?: boolean
  loading?: boolean
}>()

const counter = useCounterStore()

const logoRef = ref()
const topBarRef = ref()

const star = () => {
  gsap.fromTo(
    [logoRef.value, topBarRef.value],
    { translateY: '-100%' },
    { delay: 0.5, duration: 0.5, translateY: '0%' },
  )
}

defineExpose({ star })
</script>

<style scoped lang="scss">
.logo {
  background-image: url('@/assets/images/indexPage1/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
