<template>
  <div class="absolute w-full h-full mt-28">
    <div class="video-role-box w-full h-full mt-28 relative" :data-index="index">
      <div class="video-border absolute w-full h-full inset-0 z-6">
        <LazyImage
          src="@/assets/images/video-border.png"
          alt="视频边框"
          :active="active"
          :loading="loading"
          width="100%"
          height="100%"
        />
      </div>
      <div class="video-container absolute top-[47%] left-1/2">
        <video
          class="video-content"
          preload="metadata"
          autoplay
          loop
          playsinline
          muted
          v-show="isLoaded"
          ref="videoEl"
        >
          <source :src="shouldLoad ? videoSrc || undefined : ''" type="video/mp4" />
        </video>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue'
import LazyImage from '@/components/common/LazyImage.vue'

const props = defineProps<{
  videoSrc: string | null
  index: number
  active?: boolean
  loading?: boolean
}>()

const isLoaded = ref(false)
const videoEl = ref<HTMLVideoElement | null>(null)

// 计算是否应该加载视频
const shouldLoad = computed(() => {
  return props.active || props.loading
})

// 加载视频函数
const loadVideo = () => {
  if (!props.videoSrc) return

  isLoaded.value = false
  const video = document.createElement('video')
  video.src = props.videoSrc
  video.preload = 'metadata'
  video.load()
  video.addEventListener('loadeddata', () => {
    isLoaded.value = true

    if (props.active && videoEl.value) {
      videoEl.value.play().catch((err) => {
        console.warn('Video autoplay failed:', err)
      })
    }
  })
}

onMounted(() => {
  // 只有当应该加载视频时才加载
  if (shouldLoad.value) {
    loadVideo()
  }
})

// 监听shouldLoad变化
watch(shouldLoad, (newValue) => {
  if (newValue && !isLoaded.value) {
    loadVideo()
  }
})

// 监听videoSrc变化
watch(
  () => props.videoSrc,
  (newSrc) => {
    if (newSrc && shouldLoad.value) {
      loadVideo()
    }
  },
)

// 监听active变化
watch(
  () => props.active,
  (isActive) => {
    if (isActive && videoEl.value) {
      // 当组件被激活时，尝试播放视频
      videoEl.value.play().catch((err) => {
        console.warn('Video play on active failed:', err)
      })
    } else if (!isActive && videoEl.value) {
      // 当组件不活跃时，暂停视频以节省资源
      videoEl.value.pause()
    }
  },
)
</script>

<style lang="scss" scoped>
.video-container {
  width: 98%;
  height: 18.4rem;
  transform: translate(-50%, -50%);
  .video-content {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1.35rem;
  }
}
</style>
