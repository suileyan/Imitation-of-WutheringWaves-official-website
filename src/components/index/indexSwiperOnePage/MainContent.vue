<!-- MainContent.vue -->
<template>
  <div
    class="slide-content w-full h-auto flex flex-col items-center justify-center absolute left-0 bottom-30"
    ref="MainContentRef"
  >
    <TitleSection @play="playTheCgVideo" />
    <DownloadSection ref="DownloadSectionRef" />
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, ref } from 'vue'
import { gsap } from 'gsap'
import TitleSection from './TitleSection.vue'
import DownloadSection from './DownloadSection.vue'
import type { StarComponent } from '@/types/types'

// 添加props声明
defineProps<{
  active?: boolean
  loading?: boolean
}>()

const emit = defineEmits(['play'])

const MainContentRef = ref()
const DownloadSectionRef = ref<StarComponent>()

const playTheCgVideo = () => {
  emit('play')
}

const star = () => {
  if (DownloadSectionRef.value?.star) {
    DownloadSectionRef.value.star()
  }
  gsap.fromTo(
    [MainContentRef.value],
    { opacity: 0, translateY: '10%' },
    { delay: 0.9, duration: 0.5, opacity: 1, translateY: '0%' },
  )
}

defineExpose({ star })
</script>
