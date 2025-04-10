<template>
  <div class="bg" ref="bgRef">
    <img src="@/assets/images/indexPage4/fuludelisi.png" alt="" />
  </div>
  <div class="video absolute top-25 right-60 w-120 h-[21.25rem] scale-120" ref="videoRef">
    <videoPlayer :videoSrc="fldlsVideoSrc" :index="0" />
  </div>
  <div class="text absolute top-[70%] left-0 w-80 text-4xl font-black p-4" ref="textRef">
    芙露德莉斯
  </div>
</template>

<script lang="ts" setup>
import videoPlayer from '@/components/index/indexSwiperTwoPage/videoPlayer.vue'
import { ref, defineExpose } from 'vue'
import { gsap } from 'gsap'
const fldlsVideoSrc = '/videos/compressPV/fuludelisi.mp4'
const bgRef = ref()
const textRef = ref()
const videoRef = ref()
const star = () => {
  gsap.fromTo(
    textRef.value,
    { opacity: 0, translateX: '-100%' },
    { delay: 0.8, opacity: 1, translateX: 0, duration: 1, ease: 'power1.inOut' },
  )
  gsap.fromTo(bgRef.value, { opacity: 0 }, { delay: 1, opacity: 1, duration: 2 })
  gsap.fromTo(
    videoRef.value,
    { opacity: 0, translateX: 100 },
    { delay: 0.8, opacity: 1, translateX: 0, duration: 1 },
  )
}
defineExpose({ star })
</script>

<style lang="scss" scoped>
.text {
  color: #dab67d;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 70%;
    height: 100%;
    border: 2px solid transparent;
    border-right: 0;
    border-left: 0;
    border-image: linear-gradient(to left, #dab67d, #373127) 1;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 70%;
    width: 30%;
    height: 100%;
    border: 2px solid #dab67d;
    border-left: 0;
    border-radius: 0 0 4rem;
  }
}
</style>
