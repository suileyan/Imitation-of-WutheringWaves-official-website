<!-- ParentComponent.vue -->
<template>
  <BackgroundVideo :active="active" :loading="loading" />
  <TopBar ref="TopBarRef" :active="active" :loading="loading" />
  <MainContent ref="MainContentRef" @play="playTheCgVideo" :active="active" :loading="loading" />
  <AgeTip ref="AgeTipRef" :active="active" :loading="loading" />
  <SocialMediaLinks ref="SocialMediaLinksRef" :active="active" :loading="loading" />
  <VersionVideo ref="VersionVideoRef" :active="active" :loading="loading" />
</template>

<script lang="ts" setup>
import { ref, defineExpose } from 'vue'
import type { StarComponent } from '@/types/types'
import BackgroundVideo from '@/components/index/indexSwiperOnePage/BackgroundVideo.vue'
import TopBar from '@/components/index/indexSwiperOnePage/TopBar.vue'
import MainContent from '@/components/index/indexSwiperOnePage/MainContent.vue'
import AgeTip from '@/components/index/indexSwiperOnePage/AgeTip.vue'
import SocialMediaLinks from '@/components/index/indexSwiperOnePage/SociaMediaLinks.vue'
import VersionVideo from '@/components/index/indexSwiperOnePage/VersionVideo.vue'

defineProps<{
  active?: boolean
  loading?: boolean
}>()

const TopBarRef = ref<StarComponent | InstanceType<typeof TopBar> | null>(null)
const MainContentRef = ref<InstanceType<typeof MainContent> | null>(null)
const AgeTipRef = ref<InstanceType<typeof AgeTip> | null>(null)
const SocialMediaLinksRef = ref<InstanceType<typeof SocialMediaLinks> | null>(null)
const VersionVideoRef = ref<InstanceType<typeof VersionVideo> | null>(null)

const playTheCgVideo = () => {
  if (VersionVideoRef.value) VersionVideoRef.value.VideoController('play')
}

//gsap
const star = () => {
  if (TopBarRef.value) TopBarRef.value.star()
  if (MainContentRef.value) MainContentRef.value.star()
}

defineExpose({ star })
</script>
