<template>
  <div
    ref="Mask"
    class="w-full h-full absolute inset-0 z-[-1] opacity-0 overflow-hidden flex items-center justify-center Mask"
    @click="VideoController('pause')"
  >
    <div
      class="close absolute w-4 h-4 top-[25%] right-[20%] hover:cursor-pointer"
      @click="VideoController('pause')"
    ></div>
    <video ref="CgVideo" class="w-1/2" controls>
      <source :src="CgMP4" type="video/mp4" />
    </video>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineExpose } from 'vue'
import { gsap } from 'gsap'
const CgMP4 = '/videos/cg_zh.mp4'
const CgVideo = ref<HTMLVideoElement | null>(null)
const Mask = ref<HTMLVideoElement | null>(null)
const VideoController = (control: string) => {
  if (!CgVideo.value) return
  if (control === 'play') {
    showVideo('show')
    CgVideo.value.play()
  } else if (control === 'pause') {
    showVideo()
    CgVideo.value.pause()
    CgVideo.value.currentTime = 0
  }
}

const showVideo = (is: string = 'else') => {
  if (!Mask.value) return
  if (is === 'show') gsap.to(Mask.value, { duration: 0.5, zIndex: 11, opacity: 1 })
  else gsap.to(Mask.value, { duration: 0.5, zIndex: -1, opacity: 0 })
}
defineExpose({ VideoController })
</script>

<style scoped>
.Mask {
  background-color: #00000095;
}
.close {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAWAgMAAABS7T+rAAAACVBMVEUAAAC0rJy0rJx5Je5uAAAAA3RSTlMAgMBakZ4lAAAAR0lEQVQI1y2OuQ0AIAwDTcEGNGyTEWD/ZTiiQ8SO7HypJMABR2VBs39WCxgE2VdaB7C+icW71bQJSdESG2x3mKNd5FqP8KQHTd4HpYI3kyYAAAAASUVORK5CYII=)
    no-repeat center;
}
</style>
