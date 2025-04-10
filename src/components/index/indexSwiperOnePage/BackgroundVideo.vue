<template>
  <template v-if="onePageBgposter">
    <video :poster="onePageBgposter" autoplay loop muted playsinline class="background-video">
      <source :src="onePageBgMp4" type="video/mp4" />
    </video>
  </template>
  <div class="w-full bg-black absolute top-0 line-shadow"></div>
</template>

<script lang="ts" setup>
const onePageBgMp4 = 'https://suileyan.oss-cn-guangzhou.aliyuncs.com/bg-video.mp4'
const onePageBgposter = new URL('@/assets/images/indexPage1/bg-poster.png', import.meta.url).href
</script>

<style scoped lang="scss">
.background-video {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  min-height: 100%;

  width: auto;
  height: auto;
  z-index: 0;
  transform: translate(-50%, -50%);
  object-fit: cover;
}

.line-shadow {
  box-shadow: 0px 0px 100px 90px #000;
}
</style>
