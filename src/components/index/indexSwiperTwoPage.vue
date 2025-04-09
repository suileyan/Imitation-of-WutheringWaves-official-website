<template>
  <Title ref="titleRef" />

  <div class="relative w-full h-full overflow-hidden">
    <div
      class="absolute w-full h-full flex items-center justify-center min-w-[1024px] z-4 transition-opacity duration-1000"
      :class="{ 'opacity-0': isTransitioning, 'opacity-100': !isTransitioning }"
    >
      <!-- 阵营图片 -->
      <div class="camp absolute w-85 top-25 left-30 opacity-60" ref="campRef">
        <template v-if="totalPages[currentPage].details.camp === '黎那汐塔'">
          <img src="@/assets/images/camp/linaxita.png" alt="黎那汐塔" />
        </template>
        <template v-else-if="totalPages[currentPage].details.camp === '黑海岸'">
          <img src="@/assets/images/camp/hha.png" alt="黑海岸" />
        </template>
        <template v-else-if="totalPages[currentPage].details.camp === '瑝珑'">
          <img src="@/assets/images/camp/hl.png" alt="瑝珑" />
        </template>
      </div>

      <!-- 角色详情 -->
      <role-details
        v-if="!isTransitioning"
        :item="totalPages[currentPage]"
        :index="currentPage"
        @playAudio="playdub"
        ref="roleDetailsRef"
      />

      <!-- 角色立绘 -->
      <div class="spine-player w-full h-full">
        <img :src="totalPages[currentPage].details.tachie" alt="" />
      </div>
    </div>
  </div>

  <!-- 自定义分页器 -->
  <custom-pagination
    :totalPages="totalPages"
    :currentPage="currentPage"
    :maxVisible="maxVisible"
    @prevPage="prevPage"
    @nextPage="nextPage"
    @goToPage="goToPage"
    ref="paginationRef"
  />
</template>

<script lang="ts" setup>
import Title from '@/components/index/indexSwiperTwoPage/pageTitle.vue'
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { totalPages } from '@/assets/data/role'
import RoleDetails from './indexSwiperTwoPage/roleDetails.vue'
import CustomPagination from './indexSwiperTwoPage/CustomPagination.vue'

const currentPage = ref(0)
const isInitialized = ref(false)
const currentAudio = ref<HTMLAudioElement | null>(null)
const maxVisible = 4
const isTransitioning = ref(false)
const campRef = ref()
// 添加组件引用
const roleDetailsRef = ref()
const paginationRef = ref()
const titleRef = ref()
// 添加 star 方法
const star = () => {
  roleDetailsRef.value?.star()
  paginationRef.value?.star()
  titleRef.value?.star()
  if (campRef.value) {
    gsap.fromTo(
      campRef.value,
      { opacity: 0, translateX: '-20%' },
      { opacity: 1, translateX: '0%', duration: 1, ease: 'power2.inOut' },
    )
  }
}

// 导出 star 方法
defineExpose({
  star,
})

onMounted(() => {
  console.log('roleDetailsRef:', roleDetailsRef.value)
  isInitialized.value = true
})

// 音频播放
const playdub = (audioPath: string) => {
  console.log('播放音频:', audioPath)

  // 停止当前播放的音频
  if (currentAudio.value) {
    console.log('停止当前音频')
    currentAudio.value.pause()
    currentAudio.value.currentTime = 0
    currentAudio.value = null
  }

  if (!audioPath) {
    console.warn('音频路径不存在')
    return
  }

  // 创建新的音频实例
  currentAudio.value = new Audio(audioPath)

  // 添加加载事件监听
  currentAudio.value.addEventListener('loadeddata', () => {
    console.log('音频加载完成:', audioPath)
  })

  // 添加错误处理
  currentAudio.value.addEventListener('error', (e) => {
    console.error('音频加载失败:', e)
    currentAudio.value = null
  })

  // 播放音频
  currentAudio.value.play().catch((err) => {
    console.error('音频播放失败:', err)
    currentAudio.value = null
  })

  // 播放结束后清理
  currentAudio.value.addEventListener('ended', () => {
    console.log('音频播放结束')
    currentAudio.value = null
  })
}

// 页面切换时停止音频
const stopAudio = () => {
  if (currentAudio.value) {
    currentAudio.value.pause()
    currentAudio.value.currentTime = 0
    currentAudio.value = null
  }
}

// 更新页面切换函数
const goToPage = (index: number) => {
  if (index === currentPage.value) return // 如果目标页面与当前页面相同，则不进行切换
  isTransitioning.value = true
  setTimeout(() => {
    currentPage.value = index
    isTransitioning.value = false
  }, 500)
  console.log('切换', index)

  // 使用 setTimeout 延迟停止音频
  setTimeout(() => {
    stopAudio()
  }, 50)
}

const prevPage = () => {
  if (currentPage.value > 0) {
    const newIndex = currentPage.value - 1
    if (newIndex === currentPage.value) return // 如果目标页面与当前页面相同，则不进行切换
    isTransitioning.value = true
    setTimeout(() => {
      currentPage.value = newIndex
      isTransitioning.value = false
    }, 500)

    // 使用 setTimeout 延迟停止音频
    setTimeout(() => {
      stopAudio()
    }, 50)
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.length - 1) {
    const newIndex = currentPage.value + 1
    if (newIndex === currentPage.value) return // 如果目标页面与当前页面相同，则不进行切换
    isTransitioning.value = true
    setTimeout(() => {
      currentPage.value = newIndex
      isTransitioning.value = false
    }, 500)

    // 使用 setTimeout 延迟停止音频
    setTimeout(() => {
      stopAudio()
    }, 50)
  }
}
</script>

<style lang="scss" scoped>
.spine-player {
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
}
</style>
