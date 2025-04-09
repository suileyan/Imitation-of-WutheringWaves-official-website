<!-- ParentComponent.vue -->
<template>
  <PageTitle ref="pageTitleRef" />
  <PageContent ref="pageContentRef" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import PageTitle from '@/components/index/indexSwiperThreePage/pageTitle.vue'
import PageContent from '@/components/index/indexSwiperThreePage/pageContent.vue'
const pageContentRef = ref<InstanceType<typeof PageContent> | null>(null)
const pageTitleRef = ref<InstanceType<typeof PageTitle> | null>(null)
const star = () => {
  console.log(3)
  pageContentRef.value?.star()
  pageTitleRef.value?.star()
}

defineExpose({ star })
</script>
