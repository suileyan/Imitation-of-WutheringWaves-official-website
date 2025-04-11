<template>
  <div class="lazy-image-container" :style="{ width, height }">
    <img
      v-if="shouldLoad"
      :src="src"
      :alt="alt"
      :class="[imageClass, { loaded: isLoaded }]"
      @load="onImageLoaded"
      @error="onImageError"
    />
    <div v-else class="placeholder" :class="placeholderClass"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps<{
  src: string
  alt?: string
  width?: string
  height?: string
  active?: boolean
  loading?: boolean
  imageClass?: string | string[]
  placeholderClass?: string | string[]
}>()

const isLoaded = ref(false)
const hasError = ref(false)

// 计算是否应该加载图片
const shouldLoad = computed(() => {
  return props.active || props.loading || isLoaded.value
})

// 图片加载完成事件
const onImageLoaded = () => {
  isLoaded.value = true
}

// 图片加载错误事件
const onImageError = () => {
  hasError.value = true
}

// 预加载图片函数
const preloadImage = () => {
  if (!props.src || isLoaded.value) return

  const img = new Image()
  img.onload = () => {
    isLoaded.value = true
  }
  img.onerror = () => {
    hasError.value = true
  }
  img.src = props.src
}

onMounted(() => {
  // 只有当应该加载图片时才预加载
  if (shouldLoad.value && !isLoaded.value) {
    preloadImage()
  }
})

// 监听shouldLoad变化
watch(shouldLoad, (newValue) => {
  if (newValue && !isLoaded.value) {
    preloadImage()
  }
})

// 监听src变化
watch(
  () => props.src,
  () => {
    isLoaded.value = false
    hasError.value = false
    if (shouldLoad.value) {
      preloadImage()
    }
  },
)
</script>

<style scoped>
.lazy-image-container {
  position: relative;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.1);
}

.lazy-image-container img {
  opacity: 0;
  transition: opacity 0.3s ease;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lazy-image-container img.loaded {
  opacity: 1;
}

.placeholder {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
}
</style>
