<!-- ParentComponent.vue -->
<template>
  <PageTitle ref="pageTitleRef" />
  <PageContent ref="pageContentRef" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import PageTitle from '@/components/index/indexSwiperfivePage/pageTitle.vue'
import PageContent from '@/components/index/indexSwiperfivePage/pageContent.vue'

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
