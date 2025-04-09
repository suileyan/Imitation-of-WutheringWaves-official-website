<!-- DownloadSection.vue -->
<template>
  <div
    class="order-box flex items-center justify-center flex-wrap gap-5 mt-[-2rem] z-2"
    ref="OrderBoxRef"
  >
    <div class="w-[200px] hover:cursor-pointer">
      <img class="w-full h-full" src="@/assets/images/indexPage1/download-btn.png" alt="下载游戏" />
    </div>
    <div
      class="relative w-[200px] hover:cursor-pointer"
      @mouseenter="cloudQrcodeToShow"
      @mouseleave="cloudQrcodeToShow"
    >
      <img class="w-full h-full" src="@/assets/images/indexPage1/cloud-game.png" alt="云·鸣潮" />
      <div
        ref="cloudGameQrcodeBox"
        class="cloud-game-qrcode-box opacity-0 absolute right-[-60%] top-[-70%]"
      >
        <img src="@/assets/images/indexPage1/cloud-game-qrcode.png" alt="云鸣潮下载二维码" />
        <div class="text-sm">扫码下载云·鸣潮</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { gsap } from 'gsap'

const cloudQrcodeShow = ref(false)
const cloudGameQrcodeBox = ref<HTMLElement | null>(null)
const OrderBoxRef = ref<HTMLElement | null>(null)

const cloudQrcodeToShow = () => {
  if (cloudGameQrcodeBox.value) {
    cloudQrcodeShow.value = !cloudQrcodeShow.value
    isCloudQrcodeToShow(cloudQrcodeShow.value, cloudGameQrcodeBox.value)
  }
}

const isCloudQrcodeToShow = (isShow: boolean, dom: HTMLElement) => {
  if (isShow) {
    gsap.to(dom, { ease: 'power1.in', duration: 0.5, opacity: 1, right: '-80%' })
  } else {
    gsap.to(dom, { ease: 'power1.out', duration: 0.5, opacity: 0, right: '-60%' })
  }
}

const star = () => {
  console.log('downloadSection')
  gsap.fromTo(
    OrderBoxRef.value,
    { opacity: 0, translateY: '10%' },
    { delay: 1.2, duration: 0.5, opacity: 1, translateY: '0%' },
  )
}

defineExpose({ star })
</script>
