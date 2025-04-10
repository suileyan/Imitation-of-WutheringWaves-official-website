<template>
  <div class="w-full h-full absolute left-0 flex items-center justify-center" ref="swiperContainer">
    <div
      class="prev-btn cursor-pointer flex items-center justify-center w-10 h-10 rounded-full mx-5 z-10 transition-all duration-300 ease-in-out"
      @click="slidePrev"
    >
      <img src="@/assets/images/indexPage6/page-prev.png" alt="" />
    </div>
    <swiper
      :modules="[Autoplay]"
      :autoplay="{ delay: 2000, disableOnInteraction: false }"
      :loop="true"
      :slides-per-view="1.8"
      :space-between="-100"
      :centered-slides="true"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      class="w-[70%] flex items-center justify-center"
    >
      <swiper-slide v-for="(image, index) in images" :key="index">
        <div class="content flex items-center justify-center w-full h-full">
          <img :src="image" class="swiper-image w-full h-full object-contain" alt="Gallery image" />
        </div>
      </swiper-slide>
    </swiper>
    <div
      class="next-btn cursor-pointer flex items-center justify-center w-10 h-10 rounded-full mx-5 z-10 transition-all duration-300 ease-in-out"
      @click="slideNext"
    >
      <img src="@/assets/images/indexPage6/page-next.png" alt="" />
    </div>
    <div
      class="progress-bar absolute top-[80%] left-[50%] translate-x-[-50%] flex justify-center gap-2.5"
    >
      <div
        v-for="(_, index) in images"
        :key="index"
        class="progress-bar-inner w-5 h-5 cursor-pointer transition-all duration-300 ease-in-out bg-contain bg-center"
        :class="{ active: activeIndex === index }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper/types'
import { ref } from 'vue'
import { gsap } from 'gsap'
import 'swiper/css'
import 'swiper/css/effect-coverflow'

const swiperInstance = ref<SwiperType | null>(null)
const swiperContainer = ref<HTMLElement | null>(null)
const activeIndex = ref(0)

const onSwiper = (swiper: SwiperType) => {
  swiperInstance.value = swiper
}

const onSlideChange = () => {
  if (swiperInstance.value) {
    const realIndex = swiperInstance.value.realIndex
    activeIndex.value = realIndex
  }
}

const slidePrev = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slidePrev()
  }
}

const slideNext = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slideNext()
  }
}

const images = [
  new URL('@/assets/images/indexPage6/1.jpg', import.meta.url).href,
  new URL('@/assets/images/indexPage6/2.jpg', import.meta.url).href,
  new URL('@/assets/images/indexPage6/3.jpg', import.meta.url).href,
  new URL('@/assets/images/indexPage6/4.jpg', import.meta.url).href,
  new URL('@/assets/images/indexPage6/5.jpg', import.meta.url).href,
]

const star = () => {
  if (swiperContainer.value) {
    gsap.fromTo(
      swiperContainer.value,
      {
        opacity: 0,
        ease: 'power2.inOut',
      },
      {
        delay: 0.5,
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut',
      },
    )
  }
}

defineExpose({ star })
</script>

<style lang="scss" scoped>
.swiper {
  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    transform: scale(0.8);
    filter: brightness(0.5) saturate(0.8);
    opacity: 0.8;
    z-index: 1;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 12px 24px -6px rgba(0, 0, 0, 0.3);

    &-active {
      transform: scale(1);
      filter: brightness(1) saturate(1);
      opacity: 1;
      z-index: 3;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
    }

    &-prev {
      transform: scale(0.8);
      filter: brightness(0.7) saturate(0.9);
      z-index: 2;
    }
  }
}

/* 前进/后退按钮悬停效果 */
.prev-btn,
.next-btn {
  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
}

/* 进度条样式 */
.progress-bar-inner {
  background-image: url('@/assets/images/indexPage6/inner.png');

  &.active {
    background-image: url('@/assets/images/indexPage6/active.png');
  }
}
</style>
