<template>
  <pageTitle ref="pageTitleRef" />
  <pageContent ref="pageContentRef" />
</template>

<script lang="ts" setup>
import pageTitle from '@/components/index/indexSwiperFourPage/pageTitle.vue'
import pageContent from '@/components/index/indexSwiperFourPage/pageContent.vue'
import { ref, defineExpose } from 'vue'
const pageTitleRef = ref()
const pageContentRef = ref()
const star = () => {
  if (pageTitleRef.value) pageTitleRef.value.star()
  if (pageContentRef.value) pageContentRef.value.star()
}
defineExpose({ star })
</script>
