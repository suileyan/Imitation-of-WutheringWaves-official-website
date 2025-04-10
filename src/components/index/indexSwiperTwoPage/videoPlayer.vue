<template>
  <div class="absolute w-full h-full mt-28">
    <div class="video-role-box w-full h-full mt-28 relative" :data-index="index">
      <div class="video-border absolute w-full h-full inset-0 z-6">
        <img src="@/assets/images/video-border.png" alt="视频边框" />
      </div>
      <div class="video-container absolute top-[47%] left-1/2">
        <video
          class="video-content"
          :src="videoSrc || undefined"
          preload="metadata"
          autoplay
          loop
          playsinline
          muted
          v-show="isLoaded"
        ></video>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps<{
  videoSrc: string | null
  index: number
}>()

const isLoaded = ref(false)

onMounted(() => {
  if (props.videoSrc) {
    const video = document.createElement('video')
    video.src = props.videoSrc
    video.preload = 'metadata'
    video.load()
    video.addEventListener('loadeddata', () => {
      isLoaded.value = true
    })
  }
})

watch(
  () => props.videoSrc,
  (newSrc) => {
    if (newSrc) {
      isLoaded.value = false
      const video = document.createElement('video')
      video.src = newSrc
      video.preload = 'metadata'
      video.load()
      video.addEventListener('loadeddata', () => {
        isLoaded.value = true
      })
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
