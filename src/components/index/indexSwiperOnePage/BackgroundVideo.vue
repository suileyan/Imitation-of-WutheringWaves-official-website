<template>
  <template v-if="onePageBgposter">
    <video
      :poster="shouldLoad ? onePageBgposter : ''"
      autoplay
      loop
      muted
      playsinline
      class="background-video"
      ref="videoEl"
    >
      <source :src="shouldLoad ? onePageBgMp4 : ''" type="video/mp4" />
    </video>
  </template>
  <div class="w-full bg-black absolute top-0 line-shadow"></div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps<{
  active?: boolean
  loading?: boolean
}>()
const videoEl = ref<HTMLVideoElement | null>(null)

const onePageBgMp4 = new URL('@/assets/video/one-swiper-bg-video.mp4', import.meta.url).href
const onePageBgposter = new URL('@/assets/images/indexPage1/bg-poster.png', import.meta.url).href

// 计算是否应该加载视频
const shouldLoad = computed(() => {
  return props.active || props.loading
})

// 监听active变化
watch(
  () => props.active,
  (isActive) => {
    if (isActive && videoEl.value) {
      // 当组件被激活时，确保视频播放
      videoEl.value.play().catch((err) => {
        console.warn('Video autoplay failed:', err)
      })
    } else if (!isActive && videoEl.value) {
      // 当组件不活跃时，暂停视频
      videoEl.value.pause()
    }
  },
)

onMounted(() => {
  // 只有当shouldLoad为true时才尝试播放视频
  if (shouldLoad.value && videoEl.value) {
    videoEl.value.play().catch((err) => {
      console.warn('Video autoplay failed on mount:', err)
    })
  }
})
</script>

<style scoped lang="scss">
.background-video {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: 0;
  transform: translate(-50%, -50%);
  object-fit: cover;
}

.line-shadow {
  box-shadow: 0px 0px 100px 90px #000;
}
</style>
