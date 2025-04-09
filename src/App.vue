<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(true)
const routeTitle = ref('加载中...')

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

watch(
  () => router.currentRoute.value,
  (to) => {
    updateDocumentTitle(to.meta?.title)
  },
  { immediate: true },
)

async function initializeApp() {
  await new Promise((resolve) => setTimeout(resolve, 1000))
}

function updateDocumentTitle(title?: string) {
  const appName = 'Wuthering Waves'
  const finalTitle = title ? `${title} - ${appName}` : appName

  routeTitle.value = isLoading.value ? finalTitle : finalTitle
  document.title = routeTitle.value
}
</script>

<template>
  <div class="app-container">
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

<style scoped></style>
