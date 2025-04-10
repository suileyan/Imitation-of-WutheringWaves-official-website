<!-- ParentComponent.vue -->
<template>
  <BackgroundVideo />
  <TopBar ref="TopBarRef" />
  <MainContent ref="MainContentRef" @play="playTheCgVideo" />
  <AgeTip ref="AgeTipRef" />
  <SocialMediaLinks ref="SocialMediaLinksRef" />
  <VersionVideo ref="VersionVideoRef" />
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
