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
      :mousewheel="{ releaseOnEdges: true, sensitivity: 1, thresholdDelta: 50, thresholdTime: 100 }"
      :allow-touch-move="false"
      :lazy="{ loadPrevNext: true, loadPrevNextAmount: 1 }"
      :speed="1000"
      spaceBetween="1"
      @slideChange="onSlideChange"
      @progress="onProgress"
      @beforeSlideChange="onBeforeSlideChange"
      ref="swiperRef"
    >
      <swiper-slide
        v-for="(component, index) in components"
        :key="index"
        class="relative flex items-center justify-center min-w-[1024px]"
        :data-swiper-autoplay="5000"
      >
        <component
          :is="component"
          :ref="
            (el) => {
              if (el) pageRefs[index] = el as unknown as StarComponent | null
            }
          "
          :active="activeIndex === index"
          :loading="loadingSlides[index]"
        />
      </swiper-slide>
    </swiper>
    <div class="footer h-[100px] w-full bg-red-500">1</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, watch } from 'vue'
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
const activeIndex = ref(0)
const loadingSlides = reactive<boolean[]>([])

const components = [
  IndexSwiperOnePage,
  IndexSwiperTwoPage,
  IndexSwiperThreePage,
  IndexSwiperFourPage,
  IndexSwiperFivePage,
  IndexSwiperSixPage,
]

// 初始化 pageRefs 和 loadingSlides 数组
for (let i = 0; i < components.length; i++) {
  pageRefs.value.push(null)
  loadingSlides.push(i <= 1) // 只预加载第一个和第二个组件
}

const onSlideChange = (swiper: SwiperType) => {
  activeIndex.value = swiper.realIndex

  // 触发当前组件的 star 方法
  const currentComponent = pageRefs.value[swiper.realIndex]
  if (currentComponent) {
    currentComponent.star()
  }

  // 更新加载状态
  updateLoadingStates(swiper.realIndex)
}

const onProgress = (swiper: SwiperType) => {
  // 根据滑动进度更新加载状态
  const currentIndex = swiper.realIndex
  const progress = swiper.progress

  // 在滑动过程中可以触发额外的资源预加载
  if (progress > 0.5 && currentIndex < components.length - 1) {
    loadingSlides[currentIndex + 1] = true
  }
}

const onBeforeSlideChange = (swiper: SwiperType) => {
  // 提前知道要滑动到哪个页面，并预先更新加载状态
  const nextIndex = swiper.activeIndex
  console.log('即将滑动到页面:', nextIndex)

  // 先将即将显示的页面标记为加载状态
  if (nextIndex >= 0 && nextIndex < loadingSlides.length) {
    loadingSlides[nextIndex] = true

    // 如果有下一页，也预加载
    if (nextIndex + 1 < loadingSlides.length) {
      loadingSlides[nextIndex + 1] = true
    }
  }
}

const updateLoadingStates = (currentIndex: number) => {
  // 重置所有加载状态
  components.forEach((_, index) => {
    // 确保只有当前页及其相邻页(前一页和后一页)才会被标记为加载状态
    loadingSlides[index] =
      index === currentIndex || index === currentIndex - 1 || index === currentIndex + 1
  })

  // 打印当前加载状态，帮助调试
  console.log(
    '当前加载状态:',
    loadingSlides.map((state, i) => `Slide ${i}: ${state ? '加载中' : '未加载'}`).join(', '),
  )
}

onMounted(() => {
  if (divergeRef.value) gsap.to(divergeRef.value, { duration: 100, rotate: 360, repeat: -1 })

  // 初始化第一个组件为活跃状态
  activeIndex.value = 0
  updateLoadingStates(0)
})

// 监听活跃索引变化，实时更新组件状态
watch(activeIndex, (newIndex) => {
  updateLoadingStates(newIndex)
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
