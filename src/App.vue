<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(true)
const routeTitle = ref('加载中...')

// 初始化应用状态
onMounted(async () => {
  try {
    await initializeApp()
  } catch (error) {
    console.error('应用初始化失败:', error)
    router.replace('/error?code=500')
  } finally {
    isLoading.value = false
  }
})

// 监听路由变化更新标题
watch(
  () => router.currentRoute.value,
  (to) => {
    updateDocumentTitle(to.meta?.title)
  },
  { immediate: true },
)

// 示例初始化函数
async function initializeApp() {
  // 模拟异步初始化
  await new Promise((resolve) => setTimeout(resolve, 1000))
}

// 标题更新函数
function updateDocumentTitle(title?: string) {
  const appName = 'Wuthering Waves'
  const finalTitle = title ? `${title} - ${appName}` : appName

  // 加载状态下显示加载提示
  routeTitle.value = isLoading.value ? finalTitle : finalTitle
  document.title = routeTitle.value
}
</script>

<template>
  <div class="app-container">
    <!-- 全局加载状态
    <div v-if="isLoading" class="loading-overlay">
      <div class="loader"></div>
      <div class="loading-text">{{ routeTitle }}</div>
    </div> -->

    <!-- 主内容区 -->
    <main class="app-main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <keep-alive
            :include="
              router.currentRoute.value.meta?.keepAlive
                ? [String(router.currentRoute.value.name)]
                : []
            "
          >
            <component
              :is="Component"
              :key="router.currentRoute.value.fullPath"
              v-if="!isLoading"
            />
          </keep-alive>
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style scoped>
/* .loading-text {
  margin-top: 1rem;

  color: #3498db;
  font-weight: 500;
}

.loading-overlay {
  z-index: 9999;
  background: rgba(255, 255, 255, 0.95);
}

.fade-enter-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 768px) {
  .app-main {
    padding: 10px;
  }
} */
</style>
