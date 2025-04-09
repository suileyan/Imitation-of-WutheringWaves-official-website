<template>
  <div
    class="custom-pagination w-80 absolute right-20 top-[25%] flex flex-col items-center gap-2 text-white z-6"
    ref="paginationRef"
  >
    <div
      @click="prevPage"
      class="cursor-pointer"
      :style="[{ transform: 'rotate(90deg)' }, currentPage > 0 ? {} : { opacity: '0' }]"
    >
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAoCAMAAADaOGodAAAAdVBMVEUAAADatn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn1E6rWeAAAAJnRSTlMALPgQ5EkKB5wgF+rWtzw30Y1TMcino5SEc21aGu7h3cCuiX1C8UxRQygAAADySURBVDjLfZPrDoIwDIVlw4EgNxVEkZtg3/8RDXRhxu3QXyxfvtCtp4edUjtsSjG7U4ZQNBB5gM0+IRi8aamTi3k5QfgUKxIPG70S1s5XmzUts7uyLzAyii+2domZJZGFZEWwk6OvO/FsLSTdSQC1+Ii1JIKaeJo7qT8t3zp53YiKX40K00m5nJe/X3MNS7nBbjnX6/BqwbTbMrO+fcPf2VnLtYaeTzSayWt60/NVqRmYkT+NM8CFlivpwmnPtM+ccshUTHwG7zg4QylLpi3HBCUlVC4agWiCUON1sCsoAOSaY7iCHAYMD0HFaw8q5OGDkl8JoCf4pncImQAAAABJRU5ErkJggg=="
        alt=""
      />
    </div>
    <div class="overflow-hidden h-[450px] relative w-full">
      <div
        class="transition-transform duration-300 ease-in-out flex flex-col items-end gap-2 absolute left-0 w-full"
        :style="paginationTranslateStyle"
      >
        <div
          v-for="(item, index) in totalPages"
          :key="index"
          @click="goToPage(index)"
          :class="[
            'h-[10%] pagination-item relative overflow-hidden cursor-pointer w-[80%] text-center flex items-end justify-center',
            currentPage === index ? 'active' : '',
          ]"
        >
          <img class="w-[300%]" :src="item.controller.image" alt="" />
          <div
            class="nav-name-box absolute h-[30%] flex items-baseline justify-center left-2 bottom-4"
          >
            <div class="left flex items-baseline">
              <img class="self-baseline" src="@/assets/images/indexPage2/nav-name-l.png" alt="" />
            </div>
            <div class="name flex items-center flex-col w-fit">
              <p class="text-xl self-baseline w-full">{{ item.role.zh_cn }}</p>
              <span class="w-fit text-base">{{ item.role.en_us }}</span>
            </div>
            <div class="right flex items-baseline">
              <img class="self-baseline" src="@/assets/images/indexPage2/nav-name-l.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      @click="nextPage"
      class="cursor-pointer"
      :style="[
        { transform: 'rotate(90deg)' },
        currentPage < totalPages.length - 1 ? {} : { opacity: '0' },
      ]"
    >
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAoCAMAAADaOGodAAAAe1BMVEUAAADatn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn3atn0pmttRAAAAKHRSTlMABML2HPsV79wj6X55brOmnHNoXVM2EAyijohYTT8qCNDJvJUu1dJIdLiitQAAAPZJREFUOMudlNsSgiAQhhUVLMs8Zpl5rnj/J8xccMbZhYv2ypmPD39ZF6dyLBU9LbD2HmZ4kvLuWqBkvgGmcilh2DqTa92uFLxegIZ06lysNKjJXAcGcj9T1I0CkCNSLkOQh5ai1Q2ol5LyQwBmB4r6TMlnSnZPgU0uQyz7fMuVyL3MmZTJtrIQO3ldnKNcIL9/TxN6LzRqbUumE6cq8bGBfZalsav2HJV20f3tnvpEm6PSCvSV3aQ1jtj8MmrO2QMWY43HgESOtY9KMvo4yV0fGdbaHthAdCrz9N9lTBKW5nFIKvMgFbYR/Gd46yC3XBiNYy5uYV9NOSk8tUOOKQAAAABJRU5ErkJggg=="
        alt=""
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { gsap } from 'gsap'

const paginationRef = ref()
interface PageItem {
  controller: {
    image: string
  }
  role: {
    zh_cn: string
    en_us: string
  }
}

const props = defineProps<{
  totalPages: PageItem[]
  currentPage: number
  maxVisible: number
}>()

const emit = defineEmits<{
  (e: 'prevPage'): void
  (e: 'nextPage'): void
  (e: 'goToPage', index: number): void
}>()

const prevPage = () => {
  emit('prevPage')
}

const nextPage = () => {
  emit('nextPage')
}

const goToPage = (index: number) => {
  emit('goToPage', index)
}

const paginationTranslateStyle = computed(() => {
  const itemHeight = 12
  const totalItems = props.totalPages.length
  let offset = props.currentPage - Math.floor(props.maxVisible / 3)
  if (offset < 0) offset = 0
  if (offset > totalItems - props.maxVisible) offset = totalItems - props.maxVisible
  return { transform: `translateY(-${offset * itemHeight}%)` }
})

const star = () => {
  if (paginationRef.value) {
    gsap.fromTo(
      paginationRef.value,
      { opacity: 0, scale: '2', translateX: '20%' },
      { opacity: 1, scale: '1', translateX: '0%', duration: 0.7, ease: 'power2.inOut' },
    )
  }
}

defineExpose({
  star,
})
</script>

<style lang="scss" scoped>
.custom-pagination div {
  transition: all 0.2s;
}

.pagination-item {
  height: 10%;
  border-radius: 20px 0 20px 0;
  border-top: 1px solid #696660;
  border-left: 1px solid #696660;
  border-right: 3px solid #696660;
  border-bottom: 3px solid #696660;
  background-image: url('@/assets/images/indexPage2/nav-bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  transform: scale(0.9);
  position: relative;
  transition: translateY 1s ease;
  box-shadow: inset 0 0 20px 0px #000;
  > img {
    transform: scale(2);
    margin-top: 0.5rem;
    margin-left: 3.5rem;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    box-shadow: 0 0 50px 35px #00000050;
  }
  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url('@/assets/images/role-border.png');
    background-repeat: no-repeat;
    background-size: contain;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 6;
  }
}

/* 选中状态 */
.active {
  width: 100%;
  height: 12%;
  background-image: url('@/assets/images/indexPage2/nav-bg-hv.png');
}
.active::before {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url('@/assets/images/role-border.png');
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 1;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 6;
}

/* 鼠标移入时，应用 active 效果（包括尺寸、背景、放大、边框淡入） */
.pagination-item:hover:not(.active) {
  width: 100%;
  height: 12%;
  background-image: url('@/assets/images/indexPage2/nav-bg-hv.png');
  z-index: 5;
}
.pagination-item:hover:not(.active)::before {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url('@/assets/images/role-border.png');
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 1;
  pointer-events: none;
  transition:
    opacity,
    width 1s ease;
  z-index: 6;
}
</style>
