<template>
  <div class="swiper-container">
    <div class="absolute w-full h-full">
      <div class="absolute w-0 h-full top-0 left-0 line"></div>
      <div class="absolute w-0 h-full top-0 right-0 line"></div>
      <div
        class="absolute indent-0 w-[100rem] h-[100rem] z-0 opacity-80 diverge"
        ref="divergeRef"
      ></div>
    </div>
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :autoplay="false"
      direction="vertical"
      :mousewheel="true"
      :allow-touch-move="false"
      :lazy="{ loadPrevNext: true }"
      :speed="1000"
      spaceBetween="1"
      @slideChange="onSlideChange"
      ref="swiperRef"
    >
      <swiper-slide
        v-for="(component, index) in components"
        :key="index"
        class="relative flex items-center justify-center min-w-[1024px]"
      >
        <component
          :is="component"
          :ref="
            (el) => {
              if (el) pageRefs[index] = el as unknown as StarComponent | null
            }
          "
        />
      </swiper-slide>
    </swiper>
    <div class="footer h-[100px] w-full bg-red-500">1</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperType } from 'swiper/types'
import { gsap } from 'gsap'
import type { StarComponent } from '@/types/types'
import { Autoplay, Pagination, Navigation, Scrollbar, Mousewheel } from 'swiper/modules'
import IndexSwiperOnePage from '@/components/index/indexSwiperOnePage.vue'
import IndexSwiperTwoPage from '@/components/index/indexSwiperTwoPage.vue'
import IndexSwiperThreePage from '@/components/index/indexSwiperThreePage.vue'
import IndexSwiperFourPage from '@/components/index/indexSwiperFourPage.vue'
import IndexSwiperFivePage from '@/components/index/indexSwiperfivePage.vue'
import IndexSwiperSixPage from '@/components/index/indexSwiperSixPage.vue'
const modules = [Autoplay, Pagination, Navigation, Scrollbar, Mousewheel]

const swiperRef = ref<SwiperType | null>(null)
const pageRefs = ref<Array<StarComponent | null>>([])
const divergeRef = ref<HTMLElement | null>(null)
const components = [
  IndexSwiperOnePage,
  IndexSwiperTwoPage,
  IndexSwiperThreePage,
  IndexSwiperFourPage,
  IndexSwiperFivePage,
  IndexSwiperSixPage,
]

for (let i = 0; i < components.length; i++) {
  pageRefs.value.push(null)
}

const onSlideChange = (swiper: SwiperType) => {
  const currentComponent = pageRefs.value[swiper.realIndex]
  if (currentComponent) {
    currentComponent.star()
  }
}

onMounted(() => {
  if (divergeRef.value) gsap.to(divergeRef.value, { duration: 100, rotate: 360, repeat: -1 })
})
</script>

<style scoped lang="scss">
.swiper-container {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  .line {
    box-shadow: 0px 0px 100px 70px #000;
  }
  .diverge {
    background-image: url('@/assets/images/light4.png');
    transform: translate(-50%, -50%);
    background-size: cover;
    background-repeat: no-repeat;
  }

  .swiper {
    height: 100%;
    background-image: url('@/assets/images/progress-bg.webp');
    background-size: cover;
    background-repeat: no-repeat;

    .swiper-slide {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 2rem;
      text-align: center;
      overflow: hidden;
    }
  }
}
</style>
