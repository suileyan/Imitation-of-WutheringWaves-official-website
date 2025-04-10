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

const roleDetailsRef = ref()
const paginationRef = ref()
const titleRef = ref()

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

defineExpose({
  star,
})

onMounted(() => {
  isInitialized.value = true
})

const playdub = (audioPath: string) => {
  if (currentAudio.value) {
    currentAudio.value.pause()
    currentAudio.value.currentTime = 0
    currentAudio.value = null
  }

  if (!audioPath) {
    console.warn('音频路径不存在')
    return
  }

  currentAudio.value = new Audio(audioPath)

  currentAudio.value.addEventListener('error', (e) => {
    console.error('音频加载失败:', e)
    currentAudio.value = null
  })

  currentAudio.value.play().catch((err) => {
    console.error('音频播放失败:', err)
    currentAudio.value = null
  })

  currentAudio.value.addEventListener('ended', () => {
    currentAudio.value = null
  })
}

const stopAudio = () => {
  if (currentAudio.value) {
    currentAudio.value.pause()
    currentAudio.value.currentTime = 0
    currentAudio.value = null
  }
}

const goToPage = (index: number) => {
  if (index === currentPage.value) return
  isTransitioning.value = true
  setTimeout(() => {
    currentPage.value = index
    isTransitioning.value = false
  }, 500)

  setTimeout(() => {
    stopAudio()
  }, 50)
}

const prevPage = () => {
  if (currentPage.value > 0) {
    const newIndex = currentPage.value - 1
    if (newIndex === currentPage.value) return
    isTransitioning.value = true
    setTimeout(() => {
      currentPage.value = newIndex
      isTransitioning.value = false
    }, 500)

    setTimeout(() => {
      stopAudio()
    }, 50)
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.length - 1) {
    const newIndex = currentPage.value + 1
    if (newIndex === currentPage.value) return
    isTransitioning.value = true
    setTimeout(() => {
      currentPage.value = newIndex
      isTransitioning.value = false
    }, 500)

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
