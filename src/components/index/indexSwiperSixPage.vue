<!-- ParentComponent.vue -->
<template>
  <PageBg />
  <PageTitle ref="pageTitleRef" />
  <PageContent ref="pageContentRef" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import PageTitle from '@/components/index/indexSwiperSixPage/pageTitle.vue'
import PageContent from '@/components/index/indexSwiperSixPage/pageContent.vue'
import PageBg from '@/components/index/indexSwiperSixPage/pageBg.vue'

// 添加props声明
defineProps<{
  active?: boolean
  loading?: boolean
}>()

const pageContentRef = ref<InstanceType<typeof PageContent> | null>(null)
const pageTitleRef = ref<InstanceType<typeof PageTitle> | null>(null)
const star = () => {
  pageContentRef.value?.star()
  pageTitleRef.value?.star()
}

defineExpose({ star })
</script>
