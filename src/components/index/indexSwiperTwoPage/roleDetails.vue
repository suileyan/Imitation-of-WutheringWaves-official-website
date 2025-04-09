<template>
  <div class="details absolute top-3/12 left-1/12">
    <div class="role-name flex" ref="detailsRef">
      <div class="attr w-15">
        <template v-if="item.details.attribute === '湮灭'">
          <img src="@/assets/images/attr/ym.png" alt="湮灭" />
        </template>
        <template v-else-if="item.details.attribute === '衍射'">
          <img src="@/assets/images/attr/ys.png" alt="衍射" />
        </template>
        <template v-else-if="item.details.attribute === '导电'">
          <img src="@/assets/images/attr/dd.png" alt="导电" />
        </template>
        <template v-else-if="item.details.attribute === '冷凝'">
          <img src="@/assets/images/attr/ln.png" alt="冷凝" />
        </template>
        <template v-else-if="item.details.attribute === '热熔'">
          <img src="@/assets/images/attr/rr.png" alt="热熔" />
        </template>
        <template v-else-if="item.details.attribute === '气动'">
          <img src="@/assets/images/attr/qd.png" alt="气动" />
        </template>
      </div>
      <div class="name text-5xl font-bold ml-4 mr-4" style="color: #dab67d">
        <span>{{ item.role.zh_cn }}</span>
      </div>
      <div class="quality">
        <template v-if="item.details.quality === 5">
          <img src="@/assets/images/indexPage2/rate-5.png" alt="5星" />
        </template>
        <template v-else-if="item.details.quality === 4">
          <img src="@/assets/images/indexPage2/rate-4.png" alt="4星" />
        </template>
      </div>
    </div>
    <div class="attr-voice-box mt-8 w-60" ref="attrVoiceBoxRef">
      <div class="voice-box text-lg font-bold flex justify-around items-center">
        <span>中文CV: {{ item.details.CV.zh_cn }}</span>
        <div
          class="btn-voice flex items-center justify-between w-6"
          @click.stop.prevent="$emit('playAudio', item.details.dub)"
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
    <div class="introduce w-130 text-base text-left mt-8" ref="introduceRef">
      {{ item.details.introduce }}
    </div>

    <!-- 视频部分：存在 PV 时进行懒加载 -->
    <template v-if="item.details.PV != null">
      <div
        class="video-role-box w-120 h-[21.25rem] mt-28 relative"
        :data-index="index"
        ref="videoRoleBoxRef"
      >
        <div class="video-border absolute w-full h-full inset-0 z-6">
          <img src="@/assets/images/video-border.png" alt="视频边框" />
        </div>
        <div class="video-container absolute top-[47%] left-1/2">
          <video
            class="video-content"
            :src="item.details.PV"
            preload="metadata"
            autoplay
            loop
            playsinline
            muted
            v-show="isLoaded"
          ></video>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { gsap } from 'gsap'

const props = defineProps<{
  item: {
    role: {
      zh_cn: string
      en_us: string
    }
    details: {
      attribute: string
      quality: number
      CV: {
        zh_cn: string
      }
      dub: string
      introduce: string
      PV: string | null
    }
  }
  index: number
}>()
const detailsRef = ref()
const attrVoiceBoxRef = ref()
const introduceRef = ref()
const videoRoleBoxRef = ref()
const isLoaded = ref(false)

const star = () => {
  if (detailsRef.value) {
    gsap.fromTo(
      detailsRef.value,
      { opacity: 0, translateX: '-20%' },
      { opacity: 1, translateX: '0%', duration: 1, ease: 'power2.inOut' },
    )
  }
  if (attrVoiceBoxRef.value) {
    gsap.fromTo(
      attrVoiceBoxRef.value,
      { opacity: 0, translateX: '-20%' },
      { delay: 0.5, opacity: 1, translateX: '0%', duration: 1, ease: 'power2.inOut' },
    )
  }
  if (introduceRef.value) {
    gsap.fromTo(
      introduceRef.value,
      { opacity: 0, translateX: '-20%' },
      { delay: 0.7, opacity: 1, translateX: '0%', duration: 1, ease: 'power2.inOut' },
    )
  }
  if (videoRoleBoxRef.value) {
    gsap.fromTo(
      videoRoleBoxRef.value,
      { opacity: 0, translateY: '20%' },
      { delay: 0.9, opacity: 1, translateY: '0%', duration: 1, ease: 'power2.inOut' },
    )
  }
}

defineExpose({
  star,
})

onMounted(() => {
  if (props.item.details.PV) {
    const video = document.createElement('video')
    video.src = props.item.details.PV
    video.preload = 'metadata'
    video.load()
    video.addEventListener('loadeddata', () => {
      isLoaded.value = true
    })
  }
})

watch(
  () => props.item.details.PV,
  (newSrc) => {
    if (newSrc) {
      isLoaded.value = false
      const video = document.createElement('video')
      video.src = newSrc
      video.preload = 'metadata'
      video.load()
      video.addEventListener('loadeddata', () => {
        isLoaded.value = true
      })
    }
  },
)

defineEmits<{
  (e: 'playAudio', path: string): void
}>()
</script>

<style lang="scss" scoped>
.voice-box {
  border-radius: 50px;
  border: solid 1px #b3ab9b;
  .btn-voice {
    span {
      background-color: #caad7b;
      &:nth-child(1) {
        width: 1px;
        height: 1px;
      }
      &:nth-child(5) {
        width: 1px;
        height: 1px;
      }
      &:nth-child(2) {
        width: 1px;
        height: 0.5rem;
      }
      &:nth-child(4) {
        width: 1px;
        height: 0.5rem;
      }
      &:nth-child(3) {
        width: 1px;
        height: 1rem;
      }
    }
  }
}

.video-container {
  width: 98%;
  height: 18.4rem;
  transform: translate(-50%, -50%);
  .video-content {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1.35rem;
  }
}
</style>
